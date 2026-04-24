"use client";

import { stats } from "../lib/cases";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  onSample: () => void;
}

export default function InputPanel({ value, onChange, onClear, onSample }: Props) {
  const s = stats(value);

  return (
    <div className="card p-4 md:p-5">
      <div className="flex items-center justify-between mb-3">
        <label htmlFor="input" className="text-sm font-medium text-white/90">
          Your text
        </label>
        <div className="flex items-center gap-2">
          <button type="button" className="btn" onClick={onSample}>
            sample
          </button>
          <button type="button" className="btn" onClick={onClear} disabled={!value}>
            clear
          </button>
        </div>
      </div>
      <textarea
        id="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste or type anything — a variable name, a sentence, a file path…"
        spellCheck={false}
        className="w-full min-h-[130px] resize-y bg-[color:var(--panel)] border border-[color:var(--border)] rounded-xl p-3 font-mono text-[13px] leading-relaxed"
      />
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[color:var(--muted)]">
        <span>
          <span className="text-white/80">{s.chars}</span> chars
        </span>
        <span>
          <span className="text-white/80">{s.charsNoSpace}</span> no-space
        </span>
        <span>
          <span className="text-white/80">{s.words}</span> words
        </span>
        <span>
          <span className="text-white/80">{s.lines}</span> lines
        </span>
        <span>
          <span className="text-white/80">{s.tokens}</span> tokens
        </span>
      </div>
    </div>
  );
}
