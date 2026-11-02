import React, { useState } from 'react';
import { 
  FolderLock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Eye
} from 'lucide-react';
import { EVIDENCE_ITEMS } from '../data/caseData.js';
import EvidenceCard from '../components/EvidenceCard.jsx';
import EvidenceModal from '../components/EvidenceModal.jsx';
import { soundManager } from '../utils/soundEffects.js';

export default function EvidenceRoom({
  investigatedEvidence,
  onToggleInvestigated,
  onContinue
}) {
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  const totalReviewed = EVIDENCE_ITEMS.filter((item) => 
    investigatedEvidence.includes(item.id)
  ).length;

  const allReviewed = totalReviewed === EVIDENCE_ITEMS.length;

  const handleContinue = () => {
    if (totalReviewed < 2) {
      setShowWarning(true);
      soundManager.playWarning();
      return;
    }
    soundManager.playClick();
    onContinue();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>STAGE 03 // EVIDENCE VAULT</span>
            <span>·</span>
            <span>FORENSIC ARTIFACTS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Interactive Evidence Room
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Click into each artifact below to examine the raw technical evidence. Mark each item as investigated to log forensic points and build your timeline reconstruction.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-mono">
          <Eye className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-400">REVIEWED:</span>
          <span className={`font-bold ${allReviewed ? 'text-emerald-400' : 'text-cyan-300'}`}>
            {totalReviewed} / {EVIDENCE_ITEMS.length} ARTIFACTS
          </span>
        </div>
      </div>

      {/* Warning if trying to skip with low evidence review */}
      {showWarning && totalReviewed < 2 && (
        <div className="mb-6 p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200 flex items-center justify-between gap-3 animate-fade-in font-mono">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Tip: Review at least 2 critical pieces of evidence before attempting the Timeline Reconstruction Challenge.
            </span>
          </div>
          <button 
            onClick={() => setShowWarning(false)}
            className="text-amber-400 hover:text-white"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Evidence Grid: 4 Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {EVIDENCE_ITEMS.map((item) => {
          const isInvestigated = investigatedEvidence.includes(item.id);
          return (
            <EvidenceCard
              key={item.id}
              evidence={item}
              isInvestigated={isInvestigated}
              onOpenDetails={(ev) => setSelectedEvidence(ev)}
              onToggleInvestigated={onToggleInvestigated}
            />
          );
        })}
      </div>

      {/* Bottom Action Strip */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs font-mono text-slate-400">
          {allReviewed ? (
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              All 4 forensic categories thoroughly reviewed! Ready for Timeline Challenge.
            </span>
          ) : (
            <span>
              {EVIDENCE_ITEMS.length - totalReviewed} artifacts remaining. Examine closely to identify attack timestamps.
            </span>
          )}
        </div>

        <button
          onClick={handleContinue}
          className="py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.99] cursor-pointer"
        >
          <span>PROCEED TO TIMELINE CHALLENGE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Detailed Modal for Artifact Deep Dive */}
      <EvidenceModal
        evidence={selectedEvidence}
        isOpen={Boolean(selectedEvidence)}
        onClose={() => setSelectedEvidence(null)}
        isInvestigated={selectedEvidence ? investigatedEvidence.includes(selectedEvidence.id) : false}
        onToggleInvestigated={onToggleInvestigated}
      />

    </div>
  );
}
