"use client";

import { useState, useRef } from "react";

interface CodeEditorProps {
  code: string;
  onRun: (code: string) => void;
  isRunning: boolean;
  hint?: string;
}

export default function CodeEditor({ code: initialCode, onRun, isRunning, hint }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [showHint, setShowHint] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newCode = code.substring(0, start) + "    " + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const lineCount = code.split("\n").length;

  return (
    <div className="mobile-block-inset border border-border rounded-[10px] overflow-hidden my-4 bg-code">
      <div className="flex min-h-[120px]">
        <div className="code-linenums py-3.5 bg-black/20 min-w-[44px] text-right select-none shrink-0">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="font-mono text-xs text-t-muted leading-[1.7] px-2.5">
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          className="code-textarea flex-1 bg-transparent border-none outline-none text-t-primary font-mono text-[13px] leading-[1.7] p-3.5 pl-4 resize-none overflow-x-auto whitespace-nowrap"
          style={{ tabSize: 4 }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          rows={lineCount + 1}
        />
      </div>
      <div className="flex items-center justify-between px-3 py-2 border-t border-border bg-elevated">
        {hint ? (
          <button
            className="bg-transparent border border-border text-gold font-sans text-xs px-3.5 py-1.5 rounded-md cursor-pointer transition-all hover:bg-gold/10"
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? "隱藏提示" : "💡 提示"}
          </button>
        ) : (
          <div />
        )}
        <button
          className="bg-accent border-none text-white font-sans text-[13px] max-md:text-base font-semibold px-5 py-1.5 max-md:px-7 max-md:py-2.5 rounded-md cursor-pointer transition-all hover:bg-accent-hover hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          onClick={() => onRun(code)}
          disabled={isRunning}
        >
          {isRunning ? (
            <span className="animate-pulse">⏳ 執行中...</span>
          ) : (
            "▶ 執行"
          )}
        </button>
      </div>
      {showHint && (
        <div className="px-4 py-3 text-[13px] text-gold bg-gold/[0.08] border-t border-gold/15 leading-relaxed">
          {hint}
        </div>
      )}
    </div>
  );
}
