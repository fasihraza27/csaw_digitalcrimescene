import React, { useState } from 'react';
import { 
  GitCommit, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  HelpCircle,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import TimelineCard from '../components/TimelineCard.jsx';
import { soundManager } from '../utils/soundEffects.js';

export default function TimelineChallenge({
  timelineEvents,
  setTimelineEvents,
  onTimelineSuccess,
  isTimelineSolved,
  timelineScore,
  onContinue
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [checkResult, setCheckResult] = useState(null);

  // Move event up
  const handleMoveUp = (index) => {
    if (index === 0) return;
    soundManager.playClick();
    const updated = [...timelineEvents];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setTimelineEvents(updated);
    setCheckResult(null);
  };

  // Move event down
  const handleMoveDown = (index) => {
    if (index === timelineEvents.length - 1) return;
    soundManager.playClick();
    const updated = [...timelineEvents];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setTimelineEvents(updated);
    setCheckResult(null);
  };

  // Drag and Drop Handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    soundManager.playClick();

    const updated = [...timelineEvents];
    const draggedItem = updated[draggedIndex];
    updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, draggedItem);

    setTimelineEvents(updated);
    setDraggedIndex(null);
    setCheckResult(null);
  };

  // Check Timeline
  const handleCheckTimeline = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    // Calculate how many are in correct index
    const correctCount = timelineEvents.filter((evt, idx) => evt.correctOrder === idx + 1).length;
    const isPerfect = correctCount === timelineEvents.length;

    let hint = "";
    if (isPerfect) {
      hint = "Flawless forensic chronology! All events are in exact chronological order.";
      soundManager.playSuccess();
      onTimelineSuccess(newAttempts);
    } else {
      soundManager.playWarning();
      if (timelineEvents[0].correctOrder !== 1) {
        hint = "Remember: The initial threat vector began with an incoming lure before any server authentication took place.";
      } else if (timelineEvents[timelineEvents.length - 1].correctOrder !== 5) {
        hint = "Check the final event: Incident response tickets occur after unauthorized activity is observed.";
      } else {
        hint = `${correctCount} of 5 events are currently in their correct sequence. Pay close attention to the order of the failed vs successful logins and when messages were broadcast.`;
      }
    }

    setCheckResult({
      isPerfect,
      correctCount,
      hint
    });
  };

  const handleResetOrder = () => {
    soundManager.playClick();
    // Shuffle order slightly to allow fresh attempt
    const shuffled = [...timelineEvents].sort(() => Math.random() - 0.5);
    setTimelineEvents(shuffled);
    setCheckResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 animate-fade-in">
      
      {/* Header */}
      <div className="mb-6 space-y-1">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>STAGE 04 // RECONSTRUCTION CHALLENGE</span>
          <span>·</span>
          <span>CHRONOLOGY MATRIX</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
          Reconstruct the Incident Timeline
        </h2>
        <p className="text-sm text-slate-400">
          Arrange the 5 digital event cards into strict chronological order from earliest to latest. Drag cards or use the up/down arrows to position them.
        </p>
      </div>

      {/* Interactive Drag & Drop Area */}
      <div className="space-y-3 mb-6">
        {timelineEvents.map((event, idx) => {
          const isCorrectPosition = checkResult ? event.correctOrder === idx + 1 : false;
          return (
            <TimelineCard
              key={event.id}
              event={event}
              index={idx}
              totalEvents={timelineEvents.length}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              draggedIndex={draggedIndex}
              isSubmitted={Boolean(checkResult)}
              isCorrectPosition={isCorrectPosition}
            />
          );
        })}
      </div>

      {/* Feedback Panel */}
      {checkResult && (
        <div className={`p-4 rounded-xl border mb-6 text-sm transition-all duration-300 font-mono ${
          checkResult.isPerfect
            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
            : 'bg-amber-950/40 border-amber-500/50 text-amber-200'
        }`}>
          <div className="flex items-start gap-3">
            {checkResult.isPerfect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <div className="font-bold">
                {checkResult.isPerfect ? "TIMELINE VERIFIED" : "CHRONOLOGY ANOMALIES DETECTED"}
              </div>
              <p className="text-xs font-sans text-slate-200 leading-relaxed">
                {checkResult.hint}
              </p>
              {!checkResult.isPerfect && (
                <p className="text-[11px] text-amber-400/90 pt-1">
                  Adjust the cards and click "Check Timeline" to verify again.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetOrder}
            className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Shuffle / Reset</span>
          </button>
          
          <span className="text-xs font-mono text-slate-400">
            Attempts: <strong className="text-cyan-300">{attempts}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {!isTimelineSolved ? (
            <button
              onClick={handleCheckTimeline}
              className="py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.99] cursor-pointer"
            >
              <span>CHECK TIMELINE</span>
            </button>
          ) : (
            <button
              onClick={() => {
                soundManager.playClick();
                onContinue();
              }}
              className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.99] cursor-pointer"
            >
              <span>CONTINUE TO INVESTIGATION QUESTIONS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
