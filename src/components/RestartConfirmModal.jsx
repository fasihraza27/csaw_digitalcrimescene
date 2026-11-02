import React from 'react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';
import { soundManager } from '../utils/soundEffects.js';

export default function RestartConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-rose-900/40 rounded-xl p-6 shadow-2xl shadow-rose-950/30">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-10 h-10 rounded-lg bg-rose-950/60 border border-rose-700/50 flex items-center justify-center text-rose-400 shrink-0">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1 rounded text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-lg font-bold text-slate-100 font-display mb-2">
          Restart Case Investigation?
        </h3>
        
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          Restarting will reset your active timer, investigated evidence markers, timeline reconstruction order, and quiz scores for Case #007.
        </p>

        <div className="flex items-center justify-end gap-3 font-mono text-xs">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              soundManager.playWarning();
              onConfirm();
            }}
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center gap-1.5 transition-colors shadow-lg shadow-rose-600/30"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Yes, Restart Case
          </button>
        </div>
      </div>
    </div>
  );
}
