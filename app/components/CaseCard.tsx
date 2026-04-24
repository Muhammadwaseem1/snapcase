"use client";

import { useState } from "react";
import type { CaseDef } from "../lib/cases";

interface Props {
  def: CaseDef;
  input: string;
}

export default function CaseCard({ def, input }: Props) {
  const [copied, setCopied] = useState(false);
  const output = def.transform(input);

  const onCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Fallback for restricted clipboards
      const ta = document.createElement("textarea");
      ta.value = output;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      } catch {
        // ignore
      }
      document.body.removeChild(ta);
    }
  };

  return (
    <div className="card p-4 fade-in">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="text-xs uppercase tracking-wider text-[color:var(--muted)]">
            {def.hint}
          </div>
          <div className="text-sm font-medium text-white/90">{def.label}</div>
        </div>
        <button
          type="button"
          onClick={onCopy}
          disabled={!output}
          className="btn"
          aria-label={`Copy ${def.label}`}
        >
          {copied ? (
            <>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              copied
            </>
          ) : (
            <>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              copy
            </>
          )}
        </button>
      </div>
      <pre className="font-mono text-[13px] leading-relaxed text-[color:var(--accent-soft)] whitespace-pre-wrap break-words min-h-[1.5rem]">
        {output || <span className="text-[color:var(--muted)]">—</span>}
      </pre>
    </div>
  );
}
