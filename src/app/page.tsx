"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";
import { LESSONS, STAGES } from "@/data/lessons";

const stageIcons = ["🐍", "📊", "🗄️", "🎯"];
const stageColors = [
  "from-[#4f8fff] to-[#60a5fa]",
  "from-[#34d399] to-[#6ee7b7]",
  "from-[#a78bfa] to-[#8b5cf6]",
  "from-[#fbbf24] to-[#f59e0b]",
];

export default function HomePage() {
  return (
    <AppShell
      topbar={
        <div>
          <span className="text-lg font-bold">課程總覽</span>
        </div>
      }
    >
      <div className="px-12 py-10 max-lg:px-6 max-w-[960px] mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-br from-[#4f8fff] to-[#34d399]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            PyFinance
          </h1>
          <p className="text-[#8896b3] text-lg">
            專為數金 MA 面試設計的 Python 速成課程
          </p>
          <p className="text-[#5a6a8a] text-sm mt-2">
            4 個階段 · 15 堂課 · 2 週完成
          </p>
        </div>

        {/* Stages */}
        {STAGES.map((stage, si) => (
          <div key={stage.id} className="mb-12">
            <div className="flex items-center gap-4 mb-5">
              <span className="text-2xl">{stageIcons[si]}</span>
              <div>
                <h2 className="text-lg font-bold">
                  階段 {stage.id}：{stage.title}
                </h2>
                <span className="text-xs text-[#5a6a8a]">{stage.days}</span>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {LESSONS.filter((l) => l.stage === stage.id).map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/lesson/${lesson.id}`}
                  className="block p-5 rounded-xl border border-[#2a3550] bg-[#1a2235] hover:border-[#4f8fff] hover:bg-[#4f8fff]/[0.08] transition-all no-underline group"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stageColors[si]} flex items-center justify-center text-white text-sm font-bold shrink-0`}
                    >
                      {LESSONS.findIndex((l) => l.id === lesson.id) + 1}
                    </div>
                    <div>
                      <div className="text-xs text-[#5a6a8a] mb-1">{lesson.day}</div>
                      <div className="text-sm font-medium text-[#e8ecf4] group-hover:text-[#4f8fff] transition-colors">
                        {lesson.title}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="text-center mt-12 mb-8">
          <Link
            href={`/lesson/${LESSONS[0].id}`}
            className="inline-block px-8 py-3 bg-[#4f8fff] text-white font-semibold rounded-lg hover:bg-[#6ba3ff] transition-all no-underline hover:-translate-y-0.5"
          >
            開始學習 →
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
