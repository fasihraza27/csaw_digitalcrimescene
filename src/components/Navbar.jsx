import React from 'react';
import { Shield, Volume2, VolumeX, RotateCcw, Clock, Award } from 'lucide-react';
import { soundManager } from '../utils/soundEffects.js';

export default function Navbar({
  currentScreen,
  investigatorName,
  score,
  elapsedSeconds,
  isMuted,
  onToggleMute,
  onOpenRestart
}) {
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-950/90 backdrop-blur-md border-b border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
            <Shield className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white whitespace-nowrap">
                DIGITAL CRIME SCENE
              </span>
              <span className="text-xs font-mono font-medium text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">
                CASE #007
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden md:block">
              SEASAW Cybersecurity Society · Investigation Console
            </p>
          </div>
        </div>

        {/* Center Investigator & Timer Info */}
        <div className="hidden sm:flex items-center gap-6 text-xs font-mono">
          {investigatorName && (
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="text-slate-500">AGENT:</span>
              <span className="text-cyan-300 font-semibold truncate max-w-[120px]">
                {investigatorName}
              </span>
            </div>
          )}

          {currentScreen > 1 && (
            <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">TIME:</span>
              <span className="text-amber-300 font-bold tabular-nums">
                {formatTime(elapsedSeconds)}
              </span>
            </div>
          )}

          {currentScreen > 1 && (
            <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400">SCORE:</span>
              <span className="text-emerald-400 font-bold tabular-nums">
                {score} pts
              </span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Sound Mute Toggle */}
          <button
            onClick={() => {
              onToggleMute();
              soundManager.playClick();
            }}
            title={isMuted ? "Unmute audio effects" : "Mute audio effects"}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-800 transition-colors"
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Restart Case Button */}
          {currentScreen > 1 && (
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenRestart();
              }}
              title="Restart investigation"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-rose-400 hover:border-rose-900 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Restart</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
