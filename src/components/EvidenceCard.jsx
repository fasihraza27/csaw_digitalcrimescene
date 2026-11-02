import React from 'react';
import { 
  ShieldAlert, 
  MailWarning, 
  UserCheck, 
  KeyRound, 
  CheckCircle2, 
  Search,
  AlertTriangle,
  Globe,
  Radio,
  Clock
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects.js';

const ICON_MAP = {
  ShieldAlert: ShieldAlert,
  MailWarning: MailWarning,
  UserCheck: UserCheck,
  KeyRound: KeyRound
};

export default function EvidenceCard({
  evidence,
  isInvestigated,
  onOpenDetails,
  onToggleInvestigated
}) {
  const IconComponent = ICON_MAP[evidence.iconName] || Search;

  const handleCardClick = () => {
    soundManager.playScan();
    onOpenDetails(evidence);
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`relative group bg-slate-900 border rounded-xl p-5 transition-all duration-200 flex flex-col justify-between cursor-pointer select-none ${
        isInvestigated 
          ? 'border-emerald-500/50 bg-slate-900/95 shadow-lg shadow-emerald-950/20' 
          : 'border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-cyan-950/20'
      }`}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              isInvestigated 
                ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 shadow-sm' 
                : 'bg-cyan-950/70 text-cyan-400 border border-cyan-800/50 shadow-sm'
            }`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-medium text-slate-400 block tracking-wider uppercase">
                {evidence.category}
              </span>
              <h3 className="text-base font-bold text-slate-100 font-display flex items-center gap-2">
                <span>Evidence {evidence.key}:</span>
                <span>{evidence.title}</span>
              </h3>
            </div>
          </div>

          {/* Investigated Tag */}
          {isInvestigated && (
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/90 px-2.5 py-1 rounded-full border border-emerald-800/50 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              REVIEWED
            </span>
          )}
        </div>

        {/* Clue Summary Preview */}
        <p className="text-xs text-slate-300 leading-relaxed mb-3">
          {evidence.summary}
        </p>

        {/* SPECIFIC VISUAL ARTIFACT PREVIEWS ON CARD */}
        
        {/* Evidence A: Quick Log Preview */}
        {evidence.id === "evidence-a" && (
          <div className="mb-3 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">10:02 PM</span>
              <span className="text-amber-400 font-bold">FAILED · Unfamiliar Proxy</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">10:04 PM</span>
              <span className="text-rose-400 font-bold">SUCCESS · Unfamiliar Device</span>
            </div>
          </div>
        )}

        {/* Evidence B: Fake Phish URL Preview */}
        {evidence.id === "evidence-b" && (
          <div className="mb-3 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
            <div className="text-[10px] text-slate-400 uppercase mb-0.5">SUSPICIOUS TARGET LINK:</div>
            <div className="text-rose-400 font-bold truncate flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>university-login.example.invalid</span>
            </div>
          </div>
        )}

        {/* Evidence C: Quote Preview */}
        {evidence.id === "evidence-c" && (
          <div className="mb-3 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
            <span className="text-[10px] text-slate-400 uppercase block mb-0.5">VICTIM QUOTE:</span>
            <p className="text-slate-200 italic font-sans truncate">
              "{evidence.statementText}"
            </p>
          </div>
        )}

        {/* Evidence D: Security Posture Badges */}
        {evidence.id === "evidence-d" && (
          <div className="mb-3 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-300">MFA / 2FA Status:</span>
              <span className="px-2 py-0.5 bg-rose-950 text-rose-400 font-bold rounded border border-rose-800/60 text-[10px]">
                DISABLED
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-300">10:04 PM Device:</span>
              <span className="px-2 py-0.5 bg-amber-950 text-amber-400 font-bold rounded border border-amber-800/60 text-[10px]">
                NOT RECOGNIZED
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-300">Password Age:</span>
              <span className="text-slate-400 text-[10px]">210 Days Old</span>
            </div>
          </div>
        )}

        {/* High-visibility Clue Key Box */}
        <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/50 text-xs text-cyan-200 font-mono mb-4 shadow-inner">
          <span className="text-cyan-400 font-bold mr-1.5 block sm:inline uppercase text-[10px]">
            INVESTIGATION CLUE:
          </span>
          <span className="text-slate-200 font-medium">
            {evidence.clueHighlight || evidence.summary}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 mt-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            soundManager.playScan();
            onOpenDetails(evidence);
          }}
          className="flex-1 py-2 px-3 rounded-lg bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-300 hover:text-cyan-100 border border-cyan-800/50 text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Examine Artifact</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (!isInvestigated) {
              soundManager.playSuccess();
            } else {
              soundManager.playClick();
            }
            onToggleInvestigated(evidence.id);
          }}
          title={isInvestigated ? "Click to unmark" : "Mark as thoroughly investigated"}
          className={`py-2 px-3 rounded-lg text-xs font-mono font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
            isInvestigated
              ? 'bg-emerald-950/50 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/60'
              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">
            {isInvestigated ? 'Investigated' : 'Mark'}
          </span>
        </button>
      </div>
    </div>
  );
}
