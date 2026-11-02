import React from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  ExternalLink,
  Laptop,
  Smartphone,
  Globe,
  Radio,
  Clock,
  Sparkles,
  KeyRound
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects.js';

export default function EvidenceModal({
  evidence,
  isOpen,
  onClose,
  isInvestigated,
  onToggleInvestigated
}) {
  if (!isOpen || !evidence) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-cyan-800/60 rounded-2xl shadow-2xl shadow-cyan-950/50 my-8 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-cyan-900/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-700/50 flex items-center justify-center font-mono font-bold text-sm">
              {evidence.key}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-100 font-display">
                  {evidence.title}
                </h3>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
                  {evidence.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                ARTIFACT ID: {evidence.id.toUpperCase()} · CLOUD FORENSIC DUMP
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Forensic Inspection */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-200">
          
          {/* Summary Banner */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
            <FileText className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200 mb-1">{evidence.subtitle}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{evidence.summary}</p>
            </div>
          </div>

          {/* EVIDENCE SPECIFIC CONTENT */}
          
          {/* EVIDENCE A: LOGIN HISTORY */}
          {evidence.id === "evidence-a" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  AUTHENTICATION EVENT LOGS (CHRONOLOGICAL)
                </h4>
                <span className="text-[11px] font-mono text-slate-400">
                  5 Events Captured
                </span>
              </div>

              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                <div className="divide-y divide-slate-800/80 font-mono text-xs">
                  {evidence.logs.map((log, index) => {
                    const isSuspicious = log.status === 'FAILED' || log.status === 'ACTIVITY' || (log.status === 'SUCCESS' && log.device.includes('Unknown'));
                    return (
                      <div 
                        key={index} 
                        className={`p-3.5 transition-colors ${
                          isSuspicious 
                            ? 'bg-rose-950/20 hover:bg-rose-950/30 border-l-2 border-rose-500' 
                            : 'hover:bg-slate-900/50 border-l-2 border-slate-700'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-200 tabular-nums">
                              {log.time}
                            </span>
                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                              log.status === 'SUCCESS' && !log.device.includes('Unknown')
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                                : log.status === 'FAILED'
                                ? 'bg-amber-950 text-amber-400 border border-amber-800/40'
                                : log.status === 'INCIDENT'
                                ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40'
                                : 'bg-rose-950 text-rose-400 border border-rose-800/40'
                            }`}>
                              {log.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400">
                            <Globe className="w-3.5 h-3.5 text-slate-500" />
                            <span>{log.ip}</span>
                            <span className="text-slate-600">·</span>
                            <span>{log.location}</span>
                          </div>
                        </div>

                        <div className="text-xs text-slate-300 mb-1">
                          <span className="text-slate-500">Device Fingerprint: </span>
                          <span className={log.device.includes('Unknown') ? 'text-rose-300 font-semibold' : 'text-slate-200'}>
                            {log.device}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-400 font-sans">
                          {log.details}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* EVIDENCE B: SUSPICIOUS MESSAGE */}
          {evidence.id === "evidence-b" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  RECOVERED PHISHING EMAIL SPECIMEN
                </h4>
                <span className="text-[11px] font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-900/50">
                  HIGH THREAT LURE
                </span>
              </div>

              {/* Fake Email Client Interface */}
              <div className="border border-slate-800 rounded-xl bg-slate-950 overflow-hidden">
                <div className="p-3 bg-slate-900 border-b border-slate-800 text-xs font-mono space-y-1">
                  <div className="flex">
                    <span className="text-slate-500 w-16">FROM:</span>
                    <span className="text-rose-300 font-semibold truncate">{evidence.emailDetails.from}</span>
                  </div>
                  <div className="flex">
                    <span className="text-slate-500 w-16">TO:</span>
                    <span className="text-slate-300 truncate">{evidence.emailDetails.to}</span>
                  </div>
                  <div className="flex">
                    <span className="text-slate-500 w-16">DATE:</span>
                    <span className="text-slate-400">{evidence.emailDetails.timestamp}</span>
                  </div>
                  <div className="flex">
                    <span className="text-slate-500 w-16">SUBJECT:</span>
                    <span className="text-amber-300 font-bold">{evidence.emailDetails.subject}</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 font-sans space-y-4">
                  <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-amber-200 text-xs">
                    ⚠️ <strong>Simulated Suspicious Email Body:</strong>
                  </div>

                  <p className="text-slate-200 leading-relaxed font-medium">
                    {evidence.emailDetails.body}
                  </p>

                  {/* Malicious Link Callout */}
                  <div className="p-3 rounded-lg bg-slate-900 border border-rose-800/40 space-y-1.5">
                    <div className="text-[11px] font-mono text-slate-400">
                      DISPLAYED HYPERLINK TARGET:
                    </div>
                    <div className="font-mono text-sm text-cyan-300 bg-black/60 p-2 rounded border border-cyan-900/40 break-all flex items-center justify-between gap-2">
                      <span>{evidence.emailDetails.displayedLinkText}</span>
                      <span className="text-[10px] font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-900">
                        SPOOFED DOMAIN
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Target URL destination resolves to: <code className="text-rose-400">{evidence.emailDetails.actualDestination}</code> (non-university infrastructure)
                    </p>
                  </div>
                </div>
              </div>

              {/* Red Flags Breakdown */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  Identified Phishing Red Flags:
                </span>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  {evidence.emailDetails.redFlags.map((flag, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* EVIDENCE C: OWNER'S STATEMENT */}
          {evidence.id === "evidence-c" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Radio className="w-4 h-4 text-emerald-400" />
                  INCIDENT RESPONSE INTERVIEW LOG
                </h4>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/50">
                  VERIFIED WITNESS
                </span>
              </div>

              {/* Primary Key Statement Quote */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-800/50 shadow-inner">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  DIRECT QUOTE FROM AHMED KHAN:
                </span>
                <blockquote className="text-base sm:text-lg font-serif italic text-slate-100 font-medium">
                  "{evidence.statementText}"
                </blockquote>
              </div>

              {/* Dialogue Transcript */}
              <div className="border border-slate-800 rounded-xl bg-slate-950 p-4 space-y-3 font-sans text-xs">
                {evidence.transcript.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className={`font-mono font-bold uppercase text-[11px] ${
                      item.speaker.includes('Ahmed') ? 'text-cyan-400' : 'text-slate-400'
                    }`}>
                      {item.speaker}:
                    </span>
                    <p className="text-slate-300 pl-3 border-l border-slate-800 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EVIDENCE D: SECURITY SETTINGS */}
          {evidence.id === "evidence-d" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-rose-400" />
                  ACCOUNT POSTURE & DEFENSIVE AUDIT
                </h4>
                <span className="text-[11px] font-mono text-rose-400 bg-rose-950/80 px-2.5 py-1 rounded border border-rose-800">
                  CRITICAL DEFENSE DEFICIT
                </span>
              </div>

              {/* Callout Summary */}
              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/40 text-xs text-rose-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Critical Discovery:</strong> Multi-Factor Authentication was not enforced on Ahmed's student account. Once the attacker harvested his single password, zero secondary verification stood in their way.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {evidence.settings.map((item, idx) => {
                  const isVuln = item.value === 'DISABLED' || item.value === 'NOT RECOGNIZED';
                  return (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-xl border bg-slate-900/90 shadow-md ${
                        isVuln 
                          ? 'border-rose-800/60 shadow-rose-950/20' 
                          : 'border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-slate-100 font-display">
                          {item.attribute}
                        </span>
                        <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded ${
                          item.value === 'DISABLED'
                            ? 'bg-rose-950 text-rose-300 border border-rose-700'
                            : item.value === 'NOT RECOGNIZED'
                            ? 'bg-amber-950 text-amber-300 border border-amber-700'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}>
                          {item.value}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {item.impact}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Forensic Investigator Analysis Note */}
          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200 space-y-1">
            <span className="font-mono font-bold uppercase tracking-wider text-cyan-400 block text-[11px]">
              Forensic Examiner Deduction:
            </span>
            <p className="leading-relaxed">
              {evidence.forensicNotes}
            </p>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-mono text-slate-400">
            {isInvestigated ? (
              <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Evidence marked as investigated (+50 pts)
              </span>
            ) : (
              <span className="text-slate-500">
                Marking evidence awards +50 forensic points
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (!isInvestigated) soundManager.playSuccess();
                else soundManager.playClick();
                onToggleInvestigated(evidence.id);
              }}
              className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold flex items-center gap-2 transition-colors ${
                isInvestigated
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60 hover:bg-emerald-900/60'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-700/30'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isInvestigated ? 'Investigated ✓' : 'Mark as Investigated'}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs transition-colors"
            >
              Done Examining
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
