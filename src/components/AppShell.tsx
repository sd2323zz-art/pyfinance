"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { PyodideStatus } from "@/lib/pyodide";

interface AppShellProps {
  children: React.ReactNode;
  pyodideStatus?: PyodideStatus;
  topbar?: React.ReactNode;
}

export default function AppShell({ children, pyodideStatus, topbar }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-bg text-t-primary font-sans overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="flex items-center justify-between px-8 py-4 border-b border-border bg-bg-sec gap-4 shrink-0 max-lg:px-4">
          <div className="flex items-center gap-3">
            <button
              className="hidden max-lg:block bg-transparent border border-border text-t-secondary text-lg px-2.5 py-1.5 rounded-md cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
            {topbar}
          </div>
          {pyodideStatus && (
            <span
              className={`text-[11px] px-3 py-1.5 rounded-full font-medium whitespace-nowrap ${
                pyodideStatus === "ready"
                  ? "bg-green/10 text-green"
                  : pyodideStatus === "loading"
                    ? "bg-gold/10 text-gold"
                    : pyodideStatus === "error"
                      ? "bg-red/10 text-red"
                      : ""
              }`}
            >
              {pyodideStatus === "loading"
                ? "⏳ Python 載入中..."
                : pyodideStatus === "ready"
                  ? "✓ Python 就緒"
                  : pyodideStatus === "error"
                    ? "✗ 載入失敗"
                    : ""}
            </span>
          )}
        </header>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
