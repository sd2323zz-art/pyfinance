"use client";

import { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import { LESSONS } from "@/data/lessons";
import Link from "next/link";

interface NoteEntry {
  lessonId: string;
  lessonTitle: string;
  day: string;
  content: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<NoteEntry[]>([]);

  useEffect(() => {
    const entries: NoteEntry[] = [];
    LESSONS.forEach((lesson) => {
      const key = `pyfinance-note-${lesson.id}`;
      const content = localStorage.getItem(key);
      if (content && content.trim()) {
        entries.push({
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          day: lesson.day,
          content,
        });
      }
    });
    setNotes(entries);
  }, []);

  return (
    <AppShell
      topbar={
        <div>
          <span className="text-lg font-bold">📝 我的筆記</span>
        </div>
      }
    >
      <div className="max-w-[900px] mx-auto px-12 py-10 max-lg:px-6">
        {notes.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-[#8896b3] text-lg mb-2">還沒有任何筆記</p>
            <p className="text-[#5a6a8a] text-sm mb-6">
              在各課程頁面點擊「📝 筆記」按鈕就可以開始寫筆記了
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-[#4f8fff] text-white rounded-lg hover:bg-[#6ba3ff] transition-all no-underline text-sm"
            >
              前往課程
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-[#8896b3] text-sm mb-6">
              共 {notes.length} 個章節有筆記
            </p>
            {notes.map((note) => (
              <div
                key={note.lessonId}
                className="border border-[#2a3550] rounded-xl overflow-hidden bg-[#1a2235]"
              >
                <div className="flex items-center justify-between px-5 py-3 bg-[#222d42] border-b border-[#2a3550]">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-[#4f8fff] bg-[#4f8fff]/15 px-2 py-0.5 rounded tracking-wider">
                      {note.day}
                    </span>
                    <span className="text-sm font-medium">{note.lessonTitle}</span>
                  </div>
                  <Link
                    href={`/lesson/${note.lessonId}`}
                    className="text-xs text-[#4f8fff] hover:underline no-underline"
                  >
                    前往課程 →
                  </Link>
                </div>
                <div className="px-5 py-4">
                  <pre className="text-sm text-[#8896b3] leading-relaxed whitespace-pre-wrap font-sans">
                    {note.content}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
