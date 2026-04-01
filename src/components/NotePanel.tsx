"use client";

import { useState, useEffect, useCallback } from "react";

interface NotePanelProps {
  lessonId: string;
}

export default function NotePanel({ lessonId }: NotePanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState("");

  const storageKey = `pyfinance-note-${lessonId}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setNote(saved);
  }, [storageKey]);

  const saveNote = useCallback(
    (value: string) => {
      setNote(value);
      if (value.trim()) {
        localStorage.setItem(storageKey, value);
      } else {
        localStorage.removeItem(storageKey);
      }
    },
    [storageKey]
  );

  return (
    <div className="my-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-elevated border border-border rounded-lg text-t-secondary text-sm cursor-pointer transition-all hover:border-accent hover:text-t-primary"
      >
        📝 筆記
        {note.trim() && (
          <span className="w-2 h-2 rounded-full bg-green" />
        )}
        <span className="text-xs text-t-muted ml-1">
          {isOpen ? "▲ 收合" : "▼ 展開"}
        </span>
      </button>
      {isOpen && (
        <div className="mt-3 border border-border rounded-lg overflow-hidden bg-card">
          <div className="px-4 py-2 text-xs text-t-muted bg-elevated border-b border-border">
            你的筆記（自動儲存到此裝置）
          </div>
          <textarea
            className="w-full bg-transparent border-none outline-none text-t-primary text-sm leading-relaxed p-4 resize-y min-h-[120px] font-sans"
            placeholder="在這裡寫下你的筆記..."
            value={note}
            onChange={(e) => saveNote(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
