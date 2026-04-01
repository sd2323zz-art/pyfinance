"use client";

import { useRef, useState, useCallback, useEffect } from "react";

export type PyodideStatus = "idle" | "loading" | "ready" | "error";

interface PyodideInstance {
  runPython: (code: string) => unknown;
  runPythonAsync: (code: string) => Promise<unknown>;
  loadPackage: (pkg: string | string[]) => Promise<void>;
}

declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<PyodideInstance>;
  }
}

export function usePyodide() {
  const pyodideRef = useRef<PyodideInstance | null>(null);
  const [status, setStatus] = useState<PyodideStatus>("idle");
  const loadingRef = useRef(false);

  const load = useCallback(async () => {
    if (pyodideRef.current || loadingRef.current) return;
    loadingRef.current = true;
    setStatus("loading");
    try {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
      script.onload = async () => {
        try {
          const pyodide = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
          });
          pyodideRef.current = pyodide;
          setStatus("ready");
        } catch {
          setStatus("error");
        }
      };
      script.onerror = () => setStatus("error");
      document.head.appendChild(script);
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const runCode = useCallback(
    async (
      code: string
    ): Promise<{ output: string | null; error: string | null; hint: string | null }> => {
      if (!pyodideRef.current) {
        return { output: null, error: "Python 尚未載入完成，請稍候...", hint: null };
      }

      if (code.includes("___")) {
        return {
          output: null,
          error: null,
          hint: "程式碼裡還有 ___ 佔位符喔！請把 ___ 換成實際的值再執行。\n\n例如：\n  name = ___  →  name = \"王小明\"\n  age = ___   →  age = 30",
        };
      }

      try {
        // Check if pandas is needed and load it
        if (code.includes("import pandas") || code.includes("from pandas")) {
          await pyodideRef.current.loadPackage(["pandas"]);
        }
        if (code.includes("import numpy") || code.includes("from numpy")) {
          await pyodideRef.current.loadPackage(["numpy"]);
        }

        pyodideRef.current.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`);
        await pyodideRef.current.runPythonAsync(code);
        const stdout = pyodideRef.current.runPython(
          "sys.stdout.getvalue()"
        ) as string;
        const stderr = pyodideRef.current.runPython(
          "sys.stderr.getvalue()"
        ) as string;
        return {
          output: stdout || "(沒有輸出)",
          error: stderr || null,
          hint: null,
        };
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        let friendlyError = message;
        if (message.includes("SyntaxError")) {
          friendlyError +=
            "\n\n語法錯誤：通常是少了引號、括號、冒號，或是縮排不對。仔細檢查一下標點符號！";
        } else if (message.includes("NameError")) {
          friendlyError +=
            "\n\n名稱錯誤：這個變數還沒被定義。可能是拼錯字了，或是還沒給它一個值。";
        } else if (message.includes("TypeError")) {
          friendlyError +=
            "\n\n型態錯誤：你可能把不同型態的資料混在一起了，例如把數字和字串直接相加。";
        } else if (message.includes("IndentationError")) {
          friendlyError +=
            "\n\n縮排錯誤：Python 用空格來分辨程式的層級，if / for 裡面的程式碼要往右縮排 4 格。";
        }
        return { output: null, error: friendlyError, hint: null };
      }
    },
    []
  );

  return { status, runCode };
}
