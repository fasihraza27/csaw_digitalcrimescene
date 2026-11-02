import React, { useEffect, useState } from 'react';
import { Terminal, ShieldCheck } from 'lucide-react';

const MESSAGES = [
  "INITIALIZING FORENSIC ENVIRONMENT...",
  "CONNECTING TO AUTH LOGS [PORT 8443]...",
  "PARSING SESSION TOKENS AND PACKET DUMP...",
  "VERIFYING INTEGRITY OF CASE ARTIFACTS...",
  "ACCESS GRANTED TO CASE FILE #007"
];

export default function CaseLoadingOverlay({ onComplete, duration = 1800 }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const stepTime = duration / MESSAGES.length;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => {
        if (prev < MESSAGES.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        setTimeout(onComplete, 300);
        return prev;
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6 text-cyan-400 font-mono">
      <div className="w-full max-w-md bg-slate-950 border border-cyan-800/60 rounded-xl p-6 shadow-2xl shadow-cyan-950/40 relative overflow-hidden">
        
        {/* Holographic scanner bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-cyan-900/40">
          <Terminal className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="text-xs tracking-wider text-slate-300 font-bold uppercase">
            SEASAW FORENSIC BOOTLOADER v2.4
          </span>
        </div>

        <div className="space-y-2 mb-6 min-h-[120px]">
          {MESSAGES.slice(0, currentIdx + 1).map((msg, i) => (
            <div key={i} className="text-xs flex items-center gap-2">
              <span className="text-cyan-600">[{String(i + 1).padStart(2, '0')}]</span>
              <span className={i === currentIdx ? "text-cyan-300 font-semibold" : "text-slate-400"}>
                {msg}
              </span>
              {i === currentIdx && <span className="inline-block w-1.5 h-3 bg-cyan-400 animate-ping" />}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan-400 transition-all duration-300 shadow-sm shadow-cyan-400"
            style={{ width: `${((currentIdx + 1) / MESSAGES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
