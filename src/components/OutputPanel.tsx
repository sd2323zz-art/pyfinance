"use client";

interface OutputPanelProps {
  output: string | null;
  error: string | null;
  hint: string | null;
}

export default function OutputPanel({ output, error, hint }: OutputPanelProps) {
  if (!output && !error && !hint) return null;

  if (hint) {
    return (
      <div className="mobile-block-inset my-3 border border-border rounded-lg overflow-hidden">
        <div className="px-3.5 py-1.5 text-[11px] font-semibold text-gold bg-gold/10 tracking-wide">
          ✏️ 還沒完成喔
        </div>
        <pre className="px-4 py-3 font-mono text-[13px] leading-relaxed text-gold bg-code whitespace-pre-wrap break-all">
          {hint}
        </pre>
      </div>
    );
  }

  return (
    <div className="mobile-block-inset my-3 border border-border rounded-lg overflow-hidden">
      <div
        className={`px-3.5 py-1.5 text-[11px] font-semibold tracking-wide ${
          error ? "text-red bg-red/10" : "text-green bg-green/10"
        }`}
      >
        {error ? "❌ 錯誤" : "📤 輸出結果"}
      </div>
      <pre className="px-4 py-3 font-mono text-[13px] leading-relaxed text-t-primary bg-code whitespace-pre-wrap break-all">
        {error || output}
      </pre>
    </div>
  );
}
