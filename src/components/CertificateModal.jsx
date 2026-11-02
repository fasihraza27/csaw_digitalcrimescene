import React from 'react';
import { X, Printer, Award, ShieldCheck, CheckCircle } from 'lucide-react';
import { soundManager } from '../utils/soundEffects.js';

export default function CertificateModal({
  isOpen,
  onClose,
  investigatorName,
  rank,
  score,
  maxScore,
  percentage,
  dateString
}) {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-800/60 rounded-2xl shadow-2xl my-8 overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="no-print p-4 bg-slate-950 border-b border-cyan-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-display font-bold text-slate-100 text-sm">
              Official Cyber Forensic Credential
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md shadow-cyan-600/30"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE CERTIFICATE BODY */}
        <div className="printable-certificate p-8 sm:p-10 bg-slate-950 text-slate-100 relative border-4 border-cyan-950/80 m-4 rounded-xl">
          {/* Subtle ornate border corners */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

          {/* Header */}
          <div className="text-center space-y-1 mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              <ShieldCheck className="w-4 h-4 text-cyan-400 inline" />
              SEASAW CYBERSECURITY SOCIETY
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase">
              Certificate of Forensic Achievement
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              DIGITAL CRIME SCENE · CASE #007: THE MIDNIGHT LOGIN
            </p>
          </div>

          {/* Recipient */}
          <div className="text-center my-6 py-4 border-y border-cyan-900/40 space-y-2">
            <p className="text-xs uppercase font-mono text-slate-400 tracking-wider">
              THIS CREDENTIAL IS PROUDLY CONFERRED UPON
            </p>
            <div className="text-2xl sm:text-3xl font-bold font-display text-cyan-300 tracking-tight">
              {investigatorName || "Anonymous Investigator"}
            </div>
            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              For demonstrating exceptional competence in digital forensic evidence analysis, incident timeline reconstruction, phishing detection, and compromised account remediation.
            </p>
          </div>

          {/* Merit Details Grid */}
          <div className="grid grid-cols-3 gap-3 my-6 text-center">
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                ASSIGNED RANK
              </span>
              <span className="text-xs sm:text-sm font-bold text-amber-300 font-display">
                {rank}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                TOTAL SCORE
              </span>
              <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">
                {score} / {maxScore} pts ({percentage}%)
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                DATE ISSUED
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-200 font-mono">
                {dateString}
              </span>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="flex items-end justify-between pt-6 border-t border-slate-800 text-xs">
            <div className="text-left font-mono">
              <div className="text-cyan-400 font-bold mb-1 font-display">SEASAW IR TEAM</div>
              <div className="text-[10px] text-slate-500">Incident Command Directorate</div>
            </div>

            {/* Official Seal Graphic */}
            <div className="w-16 h-16 rounded-full border-2 border-cyan-400/60 bg-cyan-950/60 flex flex-col items-center justify-center text-center p-1 shadow-inner">
              <span className="text-[8px] font-mono text-cyan-300 font-bold leading-tight uppercase">
                SEASAW
              </span>
              <span className="text-[7px] text-cyan-400 font-mono">
                VERIFIED
              </span>
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mt-0.5" />
            </div>

            <div className="text-right font-mono">
              <div className="text-slate-300 font-bold mb-1">STALL CASE #007</div>
              <div className="text-[10px] text-slate-500">Hash: SHA256-VLD-007</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
