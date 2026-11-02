import React from 'react';
import { 
  FileSpreadsheet, 
  User, 
  Building, 
  Calendar, 
  AlertOctagon, 
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { VICTIM_INFO, CASE_META } from '../data/caseData.js';
import { soundManager } from '../utils/soundEffects.js';

export default function IncidentBriefing({ onContinue, investigatorName }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="mb-6 space-y-1">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>STAGE 02 // FORENSIC INGESTION</span>
          <span>·</span>
          <span>DISPATCH LOG #8812</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
          Incident Briefing & Intake Report
        </h2>
        <p className="text-sm text-slate-400">
          Review the initial statement and victim telemetry submitted to the SEASAW Helpdesk.
        </p>
      </div>

      {/* Professional Incident Report Docket */}
      <div className="rounded-2xl bg-slate-900/90 border border-cyan-900/40 overflow-hidden shadow-xl shadow-cyan-950/20 mb-6">
        
        {/* Top Docket Header Strip */}
        <div className="p-4 bg-slate-950 border-b border-cyan-900/40 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-cyan-300">
            <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
            <span className="font-bold">METROPOLITAN UNIVERSITY CS-CERT INTAKE DOCKET</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>INTAKE STATUS:</span>
            <span className="text-rose-400 font-bold bg-rose-950 px-2 py-0.5 rounded border border-rose-900">
              OPEN INVESTIGATION
            </span>
          </div>
        </div>

        {/* Victim Information Grid */}
        <div className="p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-500 block mb-1">AFFECTED OWNER</span>
              <div className="flex items-center gap-1.5 text-slate-100 font-bold">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>{VICTIM_INFO.name}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-500 block mb-1">STUDENT ROLE</span>
              <div className="text-slate-200 font-semibold truncate">
                {VICTIM_INFO.role}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-500 block mb-1">DATE OF BREACH</span>
              <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{VICTIM_INFO.incidentDate}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-500 block mb-1">ACCOUNT TARGET</span>
              <div className="text-amber-300 font-semibold">
                {VICTIM_INFO.accountType}
              </div>
            </div>
          </div>

          {/* Incident Narrative Callout */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-slate-950 via-slate-950 to-cyan-950/20 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              OFFICIAL INCIDENT SUMMARY
            </div>
            <p className="text-base text-slate-100 font-serif italic leading-relaxed">
              "{VICTIM_INFO.incidentSummary}"
            </p>
            <p className="text-xs text-slate-400 pt-1 border-t border-slate-800/80">
              {VICTIM_INFO.initialImpact}
            </p>
          </div>

          {/* What needs to be solved */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              PRIMARY INVESTIGATIVE OBJECTIVES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="font-mono text-cyan-400 font-bold">01. EVIDENCE DISCOVERY</span>
                <p className="text-slate-300">
                  Inspect login records, email lures, and security configurations in the Evidence Room.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="font-mono text-cyan-400 font-bold">02. CHRONOLOGY</span>
                <p className="text-slate-300">
                  Reconstruct the precise sequence of events leading from initial message to compromise.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="font-mono text-cyan-400 font-bold">03. INCIDENT REMEDIATION</span>
                <p className="text-slate-300">
                  Formulate a defensive playbook to expel unauthorized sessions and protect the identity.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer with Continue Button */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-400">
            <span>ASSIGNED INVESTIGATOR: </span>
            <span className="text-cyan-300 font-bold">{investigatorName || 'Investigator'}</span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onContinue();
            }}
            className="py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.99] cursor-pointer"
          >
            <span>PROCEED TO EVIDENCE ROOM</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
