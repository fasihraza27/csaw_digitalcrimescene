import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  CheckSquare, 
  Square, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Award,
  Sparkles
} from 'lucide-react';
import { SECURITY_ACTIONS } from '../data/securityActions.js';
import { soundManager } from '../utils/soundEffects.js';

export default function SecurityResponse({
  selectedActions,
  setSelectedActions,
  isResponseSubmitted,
  setIsResponseSubmitted,
  responseScore,
  onCalculateResponseScore,
  onContinue
}) {
  const [localSelection, setLocalSelection] = useState(selectedActions || []);

  const handleToggleAction = (actId) => {
    if (isResponseSubmitted) return;
    soundManager.playClick();
    if (localSelection.includes(actId)) {
      setLocalSelection(localSelection.filter((id) => id !== actId));
    } else {
      setLocalSelection([...localSelection, actId]);
    }
  };

  const handleSubmitResponse = () => {
    if (localSelection.length === 0) {
      soundManager.playWarning();
      return;
    }

    // Calculate score
    let totalScore = 0;
    let safeCount = 0;
    let unsafeCount = 0;

    SECURITY_ACTIONS.forEach((act) => {
      if (localSelection.includes(act.id)) {
        if (act.isSafe) {
          totalScore += act.points;
          safeCount++;
        } else {
          totalScore += act.points; // negative points
          unsafeCount++;
        }
      }
    });

    if (unsafeCount > 0) {
      soundManager.playWarning();
    } else {
      soundManager.playSuccess();
    }

    setSelectedActions(localSelection);
    setIsResponseSubmitted(true);
    onCalculateResponseScore(totalScore);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 animate-fade-in">
      
      {/* Header */}
      <div className="mb-6 space-y-1">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>STAGE 06 // REMEDIATION & HARDENING</span>
          <span>·</span>
          <span>DEFENSIVE PLAYBOOK</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
          Incident Security Response
        </h2>
        <p className="text-sm text-slate-400">
          Select all the safe and effective remediation actions Ahmed should immediately execute. Safe actions award points; hazardous choices incur point deductions.
        </p>
      </div>

      {/* Multi-Select Action Grid */}
      <div className="space-y-3 mb-6">
        {SECURITY_ACTIONS.map((action) => {
          const isSelected = isResponseSubmitted 
            ? selectedActions.includes(action.id)
            : localSelection.includes(action.id);

          let cardBorder = 'border-slate-800 bg-slate-900/90 hover:border-cyan-500/40';

          if (isResponseSubmitted) {
            if (isSelected) {
              cardBorder = action.isSafe 
                ? 'border-emerald-500/60 bg-emerald-950/20' 
                : 'border-rose-500/60 bg-rose-950/20';
            } else if (!action.isSafe) {
              cardBorder = 'border-slate-800/80 bg-slate-950/50 opacity-60';
            } else {
              // Safe action that was missed
              cardBorder = 'border-amber-500/40 bg-amber-950/10';
            }
          } else if (isSelected) {
            cardBorder = 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400/50';
          }

          return (
            <div
              key={action.id}
              onClick={() => handleToggleAction(action.id)}
              className={`p-4 rounded-xl border transition-all ${cardBorder} ${
                !isResponseSubmitted ? 'cursor-pointer' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* Checkbox indicator */}
                  <div className="mt-0.5 shrink-0 text-slate-400">
                    {isResponseSubmitted ? (
                      isSelected ? (
                        action.isSafe ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        )
                      ) : action.isSafe ? (
                        <div className="w-5 h-5 rounded border border-amber-500/60 flex items-center justify-center text-[10px] font-mono text-amber-400">
                          !
                        </div>
                      ) : (
                        <Square className="w-5 h-5 text-slate-600" />
                      )
                    ) : isSelected ? (
                      <CheckSquare className="w-5 h-5 text-cyan-400" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-600 group-hover:text-slate-400" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-slate-100 font-display">
                        {action.text}
                      </span>
                      {isResponseSubmitted && (
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          action.isSafe 
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}>
                          {action.isSafe ? 'RECOMMENDED SAFE ACTION' : 'HAZARDOUS / AVOID'}
                        </span>
                      )}
                    </div>

                    {/* Category Label */}
                    <span className="text-[11px] font-mono text-slate-500">
                      {action.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Forensic Explanation (Visible after submission) */}
              {isResponseSubmitted && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 font-sans leading-relaxed">
                  <span className="font-mono text-cyan-400 font-bold uppercase text-[10px] block mb-0.5">
                    Security Analysis:
                  </span>
                  {action.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Controls */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs font-mono text-slate-400">
          {!isResponseSubmitted ? (
            <span>
              Selected: <strong className="text-cyan-300">{localSelection.length}</strong> actions
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Response Score: <strong className="text-emerald-400">{responseScore} pts</strong></span>
            </div>
          )}
        </div>

        {!isResponseSubmitted ? (
          <button
            onClick={handleSubmitResponse}
            disabled={localSelection.length === 0}
            className="py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-display font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.99] cursor-pointer"
          >
            CONFIRM SECURITY PLAYBOOK
          </button>
        ) : (
          <button
            onClick={() => {
              soundManager.playFanfare();
              onContinue();
            }}
            className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.99] cursor-pointer"
          >
            <span>GENERATE FINAL INVESTIGATION REPORT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
}
