import React, { useEffect, useState } from 'react';
import { 
  Award, 
  RotateCcw, 
  FileCheck, 
  CheckCircle2, 
  Printer, 
  BookOpen, 
  ShieldAlert, 
  Clock, 
  Crosshair,
  Share2,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CASE_META } from '../data/caseData.js';
import { soundManager } from '../utils/soundEffects.js';
import CertificateModal from '../components/CertificateModal.jsx';
import CaseSolutionModal from '../components/CaseSolutionModal.jsx';
import forensicBadgeImage from '../assets/images/cyber_forensic_badge_1793524346150.jpg';

export default function InvestigationResults({
  investigatorName,
  elapsedSeconds,
  evidenceScore,
  investigatedEvidenceCount,
  timelineScore,
  timelineAttempts,
  quizAnswers,
  responseScore,
  totalScore,
  maxTotalScore,
  onRestartCase
}) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // Compute percentage
  const percentage = Math.min(100, Math.max(0, Math.round((totalScore / maxTotalScore) * 100)));

  // Rank assignment
  let rank = "TRAINEE INVESTIGATOR";
  let rankColor = "text-slate-300";
  let rankBadge = "border-slate-700 bg-slate-900";

  if (percentage >= 90) {
    rank = "ELITE CYBER INVESTIGATOR";
    rankColor = "text-cyan-300";
    rankBadge = "border-cyan-500/60 bg-cyan-950/60 shadow-lg shadow-cyan-950/40";
  } else if (percentage >= 75) {
    rank = "SENIOR INVESTIGATOR";
    rankColor = "text-emerald-300";
    rankBadge = "border-emerald-500/60 bg-emerald-950/60";
  } else if (percentage >= 50) {
    rank = "JUNIOR INVESTIGATOR";
    rankColor = "text-amber-300";
    rankBadge = "border-amber-500/60 bg-amber-950/60";
  }

  // Count correct quiz answers
  const correctQuizCount = Object.values(quizAnswers).filter((a) => a.isCorrect).length;

  // Animated score counter on mount + celebration confetti
  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = totalScore / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= totalScore) {
        setAnimatedScore(totalScore);
        clearInterval(timer);

        if (percentage >= 75) {
          try {
            confetti({
              particleCount: 75,
              spread: 60,
              origin: { y: 0.6 }
            });
          } catch (e) {}
        }
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [totalScore, percentage]);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs}s`;
  };

  const currentDateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 sm:py-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/40">
          <FileCheck className="w-4 h-4 text-cyan-400" />
          <span>INCIDENT REPORT CLOSED · CASE SOLVED</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Forensic Investigation Report
        </h2>
        <p className="text-sm text-slate-400 font-mono">
          SEASAW Cybersecurity Society · Case #007 Evaluation Docket
        </p>
      </div>

      {/* Main Scorecard Banner */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${rankBadge} mb-8 relative overflow-hidden backdrop-blur-md`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* Left: Investigator & Rank */}
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="w-20 h-20 rounded-2xl bg-slate-950/80 border border-cyan-500/40 p-2 flex items-center justify-center shrink-0 shadow-inner">
              <img 
                src={forensicBadgeImage} 
                alt="SEASAW Cyber Forensic Unit Badge" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                SPECIAL AGENT // CALLSIGN
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                {investigatorName || "Anonymous Agent"}
              </h3>
              <div className="mt-1 flex items-center gap-2 justify-center md:justify-start">
                <span className="text-xs font-mono text-slate-500">ASSIGNED RANK:</span>
                <span className={`text-xs font-mono font-bold tracking-wider ${rankColor}`}>
                  {rank}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Big Animated Score Metric */}
          <div className="text-center md:text-right bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 min-w-[200px]">
            <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
              TOTAL INVESTIGATION SCORE
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-cyan-300 tabular-nums">
              {animatedScore} <span className="text-lg text-slate-500">/ {maxTotalScore}</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 font-semibold mt-1">
              {percentage}% MASTERY RATING
            </div>
          </div>

        </div>
      </div>

      {/* Detailed Metrics Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs font-mono text-slate-500 block mb-1">EVIDENCE EXAMINED</span>
          <div className="text-lg sm:text-xl font-bold font-mono text-slate-100">
            {investigatedEvidenceCount} / 4 Clues
          </div>
          <span className="text-[11px] font-mono text-emerald-400 block mt-1">
            +{evidenceScore} pts
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs font-mono text-slate-500 block mb-1">TIMELINE ACCURACY</span>
          <div className="text-lg sm:text-xl font-bold font-mono text-slate-100">
            {timelineAttempts === 1 ? '1st Attempt' : `${timelineAttempts} Attempts`}
          </div>
          <span className="text-[11px] font-mono text-emerald-400 block mt-1">
            +{timelineScore} pts
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs font-mono text-slate-500 block mb-1">DEDUCTION ACCURACY</span>
          <div className="text-lg sm:text-xl font-bold font-mono text-slate-100">
            {correctQuizCount} / 3 Correct
          </div>
          <span className="text-[11px] font-mono text-emerald-400 block mt-1">
            +{correctQuizCount * 150} pts
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs font-mono text-slate-500 block mb-1">RESPONSE PLAYBOOK</span>
          <div className="text-lg sm:text-xl font-bold font-mono text-slate-100">
            {responseScore >= 250 ? 'Hardened' : 'Evaluated'}
          </div>
          <span className="text-[11px] font-mono text-emerald-400 block mt-1">
            {responseScore >= 0 ? `+${responseScore}` : responseScore} pts
          </span>
        </div>

      </div>

      {/* Final Forensic Explanation of Attack Vectors */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
          INCIDENT ROOT CAUSE & DEFENSIVE SYNTHESIS
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Case #007 exemplifies the classic modern credential harvest compromise:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <span className="font-mono text-amber-400 font-bold block">1. PHISHING LURE</span>
            <p className="text-slate-300 leading-relaxed">
              Attackers weaponize psychological urgency ("account restricted in 2 hours") to trick users into entering credentials on lookalike domains (<code className="text-cyan-300">example.invalid</code>).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <span className="font-mono text-rose-400 font-bold block">2. UNFAMILIAR DEVICE ACCESS</span>
            <p className="text-slate-300 leading-relaxed">
              Without defensive protections, the attacker tested credentials from an external proxy IP at 10:02 PM, and logged in smoothly at 10:04 PM.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <span className="font-mono text-emerald-400 font-bold block">3. THE MFA CRITICAL SHIELD</span>
            <p className="text-slate-300 leading-relaxed">
              Multi-Factor Authentication (MFA) was disabled. If MFA had been active, the stolen password would have been useless to the intruder.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        
        {/* Secondary: Restart or Solution */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onRestartCase();
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-mono font-medium flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESTART INVESTIGATION</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setShowSolution(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-950 border border-cyan-800/40 hover:border-cyan-700 text-cyan-300 text-xs font-mono font-medium flex items-center gap-2 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>VIEW CASE SOLUTION</span>
          </button>
        </div>

        {/* Primary: Official Certificate */}
        <button
          onClick={() => {
            soundManager.playFanfare();
            setShowCertificate(true);
          }}
          className="py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-display font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/25 active:scale-[0.99] cursor-pointer"
        >
          <Award className="w-4 h-4 fill-current" />
          <span>VIEW & PRINT CREDENTIAL CERTIFICATE</span>
        </button>

      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        investigatorName={investigatorName}
        rank={rank}
        score={totalScore}
        maxScore={maxTotalScore}
        percentage={percentage}
        dateString={currentDateStr}
      />

      {/* Solution Walkthrough Modal */}
      <CaseSolutionModal
        isOpen={showSolution}
        onClose={() => setShowSolution(false)}
      />

    </div>
  );
}
