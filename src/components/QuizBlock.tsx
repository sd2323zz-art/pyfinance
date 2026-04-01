"use client";

import { useState } from "react";
import type { QuizOption } from "@/data/lessons";

interface QuizBlockProps {
  question: string;
  options: QuizOption[];
  explanation: string;
}

export default function QuizBlock({ question, options, explanation }: QuizBlockProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = submitted && selected !== null && options[selected]?.correct;

  return (
    <div className="mobile-block-inset border border-border rounded-xl overflow-hidden my-6 bg-card">
      <div className="px-5 py-3 text-[13px] font-bold text-gold bg-gold/[0.08] tracking-wider border-b border-border">
        📝 小測驗
      </div>
      <div className="px-5 pt-5 pb-3 text-[15px] leading-relaxed font-medium">{question}</div>
      <div className="px-4 pb-3">
        {options.map((opt, idx) => {
          let optClass = "bg-bg-sec border border-border";
          if (selected === idx && !submitted) optClass = "bg-accent/15 border border-accent";
          if (submitted && opt.correct) optClass = "bg-green/10 border border-green/30";
          if (submitted && selected === idx && !opt.correct) optClass = "bg-red/10 border border-red/30";

          let letterClass = "bg-elevated text-t-muted";
          if (selected === idx && !submitted) letterClass = "bg-accent text-white";
          if (submitted && opt.correct) letterClass = "bg-green text-white";
          if (submitted && selected === idx && !opt.correct) letterClass = "bg-red text-white";

          return (
            <button
              key={idx}
              className={`flex items-start gap-3 w-full text-left ${optClass} rounded-lg px-3.5 py-3 my-2 cursor-pointer transition-all hover:border-accent hover:bg-accent/15 font-sans text-t-primary`}
              onClick={() => !submitted && setSelected(idx)}
            >
              <span
                className={`min-w-[26px] h-[26px] flex items-center justify-center rounded-full text-xs font-bold shrink-0 ${letterClass}`}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap m-0 bg-transparent">
                {opt.text}
              </pre>
            </button>
          );
        })}
      </div>
      {!submitted ? (
        <div className="px-4 pb-4 flex justify-end">
          <button
            className="bg-accent border-none text-white font-sans text-[13px] font-semibold px-6 py-2 rounded-md cursor-pointer transition-all hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => selected !== null && setSubmitted(true)}
            disabled={selected === null}
          >
            確認答案
          </button>
        </div>
      ) : (
        <div
          className={`mx-4 mb-4 p-3.5 rounded-lg text-sm leading-relaxed ${
            isCorrect
              ? "bg-green/10 border border-green/20"
              : "bg-red/10 border border-red/20"
          }`}
        >
          <div className="font-bold mb-1.5">
            {isCorrect ? "✅ 正確！" : "❌ 再想想"}
          </div>
          <div className="text-t-secondary text-[13.5px]">{explanation}</div>
        </div>
      )}
    </div>
  );
}
