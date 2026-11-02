import React, { useState } from 'react';
import breachSceneImage from '../assets/images/cyber_breach_scene_1793524348267.jpg';
import { Shield, Play, Clock, Sparkles, Terminal, Info, User } from 'lucide-react';
import { CASE_META } from '../data/caseData.js';
import { soundManager } from '../utils/soundEffects.js';

export default function WelcomeScreen({
  investigatorName,
  setInvestigatorName,
  onStartInvestigation
}) {
  const [localName, setLocalName] = useState(investigatorName || '');
  const [errorMsg, setErrorMsg] = useState('');

  const handleStart = (e) => {
    e.preventDefault();
    const trimmed = localName.trim();
    if (!trimmed) {
      setErrorMsg('Please enter an investigator nickname or callsign to begin.');
      soundManager.playWarning();
      return;
    }
    setErrorMsg('');
    setInvestigatorName(trimmed);
    soundManager.playSuccess();
    onStartInvestigation();
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 sm:py-10 animate-fade-in">
      
      {/* Top Banner / Stall Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-cyan-900/40">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>{CASE_META.stallOrganization} · INTERACTIVE STALL EXPERIENCE</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-slate-500">CLASSIFICATION:</span>
          <span className="text-amber-400">{CASE_META.classification}</span>
        </div>
      </div>

      {/* Main Grid: Visual Breach on one side, Case Induction on the other */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Visual Breach Asset & Quick Specs */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-cyan-800/60 shadow-2xl shadow-cyan-950/40 group">
            {/* Real generated breach scene image */}
            <img 
              src={breachSceneImage} 
              alt="Cyber crime scene workstation with unauthorized access alert"
              className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/90 border border-slate-800/80 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-rose-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  INCIDENT ALERT TRIGGERED
                </span>
                <span className="text-slate-400">10:04 PM ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Case Quick Info Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block mb-1">CASE ID</span>
              <span className="text-cyan-300 font-bold">{CASE_META.caseId}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block mb-1">ESTIMATED TIME</span>
              <span className="text-emerald-400 font-bold">{CASE_META.estimatedTime}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block mb-1">DIFFICULTY</span>
              <span className="text-amber-300 font-bold">{CASE_META.difficulty}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block mb-1">OBJECTIVE</span>
              <span className="text-slate-200 font-bold">Trace & Neutralize</span>
            </div>
          </div>
        </div>

        {/* Right Column: Case Brief & Start Induction */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div>
            <div className="inline-block px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-800/50 text-cyan-400 font-mono text-xs font-semibold mb-3">
              CASE #007 — {CASE_META.codeName}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display mb-4">
              DIGITAL CRIME SCENE
            </h1>
            <p className="text-base sm:text-lg text-cyan-200/90 font-serif italic mb-4">
              "{CASE_META.tagline}"
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Step into the shoes of a cyber forensic investigator at the SEASAW stall. An unauthorized access event occurred just minutes before midnight. You must examine digital artifacts, piece together the breach timeline, expose the attack vector, and deploy defensive counter-measures before further damage occurs.
            </p>
          </div>

          {/* Investigator Name Input Form */}
          <form onSubmit={handleStart} className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-800/40 space-y-4">
            <div>
              <label htmlFor="investigator-name" className="block text-xs font-mono font-bold text-slate-200 mb-1.5">
                ENTER INVESTIGATOR CALLSIGN / NICKNAME:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4 text-cyan-400" />
                </div>
                <input
                  id="investigator-name"
                  type="text"
                  maxLength={25}
                  value={localName}
                  onChange={(e) => {
                    setLocalName(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="e.g. AgentCipher, Alex, CyberSam"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                * Nickname is stored locally for your case badge and certificate. Do not enter real personal passwords.
              </p>
              {errorMsg && (
                <p className="text-xs text-rose-400 font-mono mt-1 font-semibold">
                  {errorMsg}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-display font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/25 active:scale-[0.99] cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>START INVESTIGATION</span>
            </button>
          </form>

          {/* Educational Disclaimer */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              {CASE_META.disclaimer} Designed for community engagement and cybersecurity education at the SEASAW Society booth.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
