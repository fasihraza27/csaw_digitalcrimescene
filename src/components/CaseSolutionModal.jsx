import React from 'react';
import { X, CheckCircle2, ShieldAlert, KeyRound, Mail, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/soundEffects.js';

export default function CaseSolutionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-cyan-800/60 rounded-2xl shadow-2xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-cyan-900/40 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
              FORENSIC DEBRIEFING & ROOT CAUSE ANALYSIS
            </span>
            <h3 className="text-lg font-bold text-slate-100 font-display">
              Case #007: Anatomy of the Midnight Login
            </h3>
          </div>
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

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-200">
          
          {/* Attack Chain Visual Pipeline */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              The Full Kill Chain (Attack Anatomy)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-900 border border-amber-900/40">
                <span className="text-amber-400 font-bold block mb-1">1. PHISH LURE</span>
                <p className="text-[11px] text-slate-300">
                  Urgent email creates panic about "account restriction" in 2 hours.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-rose-900/40">
                <span className="text-rose-400 font-bold block mb-1">2. CREDENTIAL HARVEST</span>
                <p className="text-[11px] text-slate-300">
                  Ahmed enters student credentials into cloned spoofed portal.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-rose-900/40">
                <span className="text-rose-400 font-bold block mb-1">3. MIDNIGHT BREACH</span>
                <p className="text-[11px] text-slate-300">
                  Attacker logs in at 10:04 PM. Bypasses security because MFA is DISABLED.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-cyan-900/40">
                <span className="text-cyan-400 font-bold block mb-1">4. PROPAGATION</span>
                <p className="text-[11px] text-slate-300">
                  At 10:08 PM, outbound messages are blasted to 42 classmates to spread the phish.
                </p>
              </div>
            </div>
          </div>

          {/* Key Forensic Takeaways */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              Why Each Factor Mattered
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100">Artificial Urgency is the #1 Phishing Weapon:</strong>
                  <p className="text-slate-400 mt-1 leading-relaxed">
                    By claiming the account would be restricted immediately, the attacker prevented Ahmed from pausing to verify the link address (<code className="text-cyan-300">university-login.example.invalid</code>).
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <KeyRound className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100">MFA Would Have Stopped the Attack Completely:</strong>
                  <p className="text-slate-400 mt-1 leading-relaxed">
                    Even after harvesting Ahmed's password, the attacker could NOT have completed the 10:04 PM login if Multi-Factor Authentication was enabled. The authentication server would have prompted for a secondary one-time code or push approval that only Ahmed possessed.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100">Fast Incident Reporting Prevented Campus Spread:</strong>
                  <p className="text-slate-400 mt-1 leading-relaxed">
                    Ahmed filing a ticket with IT at 10:15 PM (just 7 minutes after the unauthorized outbound messages) allowed security engineers to revoke active sessions, quarantine the 42 sent messages, and block the fake domain across campus networks.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs transition-colors"
          >
            Close Case Solution
          </button>
        </div>

      </div>
    </div>
  );
}
