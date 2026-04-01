"use client";

import { use, useState, useRef } from "react";
import { LESSONS } from "@/data/lessons";
import AppShell from "@/components/AppShell";
import CodeEditor from "@/components/CodeEditor";
import OutputPanel from "@/components/OutputPanel";
import QuizBlock from "@/components/QuizBlock";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import NotePanel from "@/components/NotePanel";
import { usePyodide } from "@/lib/pyodide";
import Link from "next/link";

interface OutputState {
  running: boolean;
  output: string | null;
  error: string | null;
  hint: string | null;
}

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const lesson = LESSONS.find((l) => l.id === id);
  const lessonIndex = LESSONS.findIndex((l) => l.id === id);
  const { status, runCode } = usePyodide();
  const [outputs, setOutputs] = useState<Record<string, OutputState>>({});
  const contentRef = useRef<HTMLDivElement>(null);

  if (!lesson) {
    return (
      <AppShell topbar={<span className="text-lg font-bold">找不到課程</span>}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-[#8896b3] text-lg mb-4">找不到這堂課</p>
            <Link href="/" className="text-[#4f8fff] hover:underline">
              回到課程總覽
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const prevLesson = lessonIndex > 0 ? LESSONS[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < LESSONS.length - 1 ? LESSONS[lessonIndex + 1] : null;

  const handleRun = async (code: string, exerciseId: string) => {
    setOutputs((prev) => ({
      ...prev,
      [exerciseId]: { running: true, output: null, error: null, hint: null },
    }));
    const result = await runCode(code);
    setOutputs((prev) => ({
      ...prev,
      [exerciseId]: { running: false, ...result },
    }));
  };

  let exerciseCounter = 0;

  return (
    <AppShell
      pyodideStatus={status}
      topbar={
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-[#4f8fff] bg-[#4f8fff]/15 px-2.5 py-1 rounded tracking-wider">
            {lesson.day}
          </span>
          <span className="text-lg font-bold max-md:text-[15px]">{lesson.title}</span>
        </div>
      }
    >
      <div
        className="max-w-[900px] mx-auto px-12 py-10 pb-32 max-lg:px-6"
        ref={contentRef}
      >
        {lesson.sections.map((section, sIdx) => {
          if (section.type === "content") {
            return (
              <div key={sIdx} className="mb-10">
                <MarkdownRenderer content={section.body} />
              </div>
            );
          }

          if (section.type === "code_display") {
            return (
              <div key={sIdx} className="mb-10">
                <div className="border border-[#2a3550] rounded-[10px] overflow-hidden my-5 bg-[#0d1321]">
                  <div className="px-4 py-2 bg-[#222d42] text-[11px] text-[#5a6a8a] flex items-center gap-2 border-b border-[#2a3550]">
                    <span>🐍</span> Python
                  </div>
                  <pre className="px-5 py-4 font-mono text-[13px] leading-[1.7] text-[#e8ecf4] overflow-x-auto">
                    {section.code}
                  </pre>
                  {section.note && (
                    <div className="px-4 py-2.5 text-xs text-[#5a6a8a] bg-[#222d42] border-t border-[#2a3550] italic">
                      {section.note}
                    </div>
                  )}
                </div>
              </div>
            );
          }

          if (section.type === "code_exercise") {
            const exId = `${lesson.id}-ex-${exerciseCounter++}`;
            const out = outputs[exId];
            return (
              <div key={sIdx} className="mb-10">
                <div className="text-xs font-bold text-[#34d399] tracking-[1.5px] uppercase mb-2.5 flex items-center gap-2">
                  <span>⌨️</span> 動手練習
                </div>
                <div className="text-[15px] text-[#e8ecf4] mb-4 leading-relaxed">
                  {section.instruction}
                </div>
                <CodeEditor
                  code={section.starterCode}
                  onRun={(code) => handleRun(code, exId)}
                  isRunning={out?.running ?? false}
                  hint={section.hint}
                />
                {out && !out.running && (
                  <OutputPanel
                    output={out.output}
                    error={out.error}
                    hint={out.hint}
                  />
                )}
              </div>
            );
          }

          if (section.type === "quiz") {
            return (
              <div key={sIdx} className="mb-10">
                <QuizBlock
                  question={section.question}
                  options={section.options}
                  explanation={section.explanation}
                />
              </div>
            );
          }

          return null;
        })}

        {/* Notes */}
        <NotePanel lessonId={lesson.id} />

        {/* Navigation */}
        <div className="flex justify-between pt-8 border-t border-[#2a3550] mt-10">
          {prevLesson ? (
            <Link
              href={`/lesson/${prevLesson.id}`}
              className="px-6 py-2.5 bg-[#222d42] border border-[#2a3550] text-[#e8ecf4] text-[13.5px] font-medium rounded-lg hover:border-[#4f8fff] hover:bg-[#4f8fff]/15 transition-all no-underline"
            >
              ← 上一課
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link
              href={`/lesson/${nextLesson.id}`}
              className="px-6 py-2.5 bg-[#4f8fff] border border-[#4f8fff] text-white text-[13.5px] font-medium rounded-lg hover:bg-[#6ba3ff] transition-all no-underline"
            >
              下一課 →
            </Link>
          ) : (
            <Link
              href="/"
              className="px-6 py-2.5 bg-[#34d399] border border-[#34d399] text-white text-[13.5px] font-medium rounded-lg hover:bg-[#34d399]/80 transition-all no-underline"
            >
              ✅ 完成所有課程！
            </Link>
          )}
        </div>
      </div>
    </AppShell>
  );
}
