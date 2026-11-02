import React from 'react';
import { Check } from 'lucide-react';

const STAGES = [
  { id: 1, label: "Welcome" },
  { id: 2, label: "Briefing" },
  { id: 3, label: "Evidence" },
  { id: 4, label: "Timeline" },
  { id: 5, label: "Questions" },
  { id: 6, label: "Response" },
  { id: 7, label: "Results" },
];

export default function ProgressBar({ currentScreen, onNavigateStage, maxUnlockedScreen = 1 }) {
  const percent = Math.round(((currentScreen - 1) / (STAGES.length - 1)) * 100);

  return (
    <div className="w-full bg-slate-950/70 border-b border-slate-900 py-2.5 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Progress track */}
        <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden mb-2.5">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Stage nodes */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {STAGES.map((st) => {
            const isCompleted = st.id < currentScreen;
            const isCurrent = st.id === currentScreen;
            const isUnlocked = st.id <= maxUnlockedScreen;

            return (
              <button
                key={st.id}
                disabled={!isUnlocked}
                onClick={() => isUnlocked && onNavigateStage && onNavigateStage(st.id)}
                className={`group flex flex-col items-center gap-1 transition-all text-left md:text-center ${
                  isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                    isCurrent
                      ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-500/20 shadow-lg shadow-cyan-500/20'
                      : isCompleted
                      ? 'bg-emerald-950 border border-emerald-500/50 text-emerald-400'
                      : 'bg-slate-900 border border-slate-800 text-slate-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : st.id}
                </div>
                <span
                  className={`text-[10px] md:text-xs font-mono transition-colors truncate max-w-full ${
                    isCurrent
                      ? 'text-cyan-400 font-bold'
                      : isCompleted
                      ? 'text-slate-300'
                      : 'text-slate-600'
                  }`}
                >
                  {st.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
