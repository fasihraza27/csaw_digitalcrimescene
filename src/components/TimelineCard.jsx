import React from 'react';
import { GripVertical, ChevronUp, ChevronDown, Clock } from 'lucide-react';

export default function TimelineCard({
  event,
  index,
  totalEvents,
  onMoveUp,
  onMoveDown,
  onDragStart,
  onDragOver,
  onDrop,
  draggedIndex,
  isSubmitted,
  isCorrectPosition
}) {
  const isBeingDragged = draggedIndex === index;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      className={`group relative flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-all duration-200 select-none ${
        isBeingDragged 
          ? 'opacity-40 border-cyan-500 scale-[0.99] bg-slate-900/40' 
          : 'bg-slate-900/90 hover:bg-slate-900'
      } ${
        isSubmitted
          ? isCorrectPosition
            ? 'border-emerald-500/50 bg-emerald-950/20'
            : 'border-amber-500/50 bg-amber-950/20'
          : 'border-slate-800 hover:border-cyan-500/40'
      }`}
    >
      {/* Left Slot Order & Drag Handle */}
      <div className="flex items-center gap-3">
        <div className="cursor-grab active:cursor-grabbing text-slate-500 group-hover:text-cyan-400 p-1">
          <GripVertical className="w-5 h-5" />
        </div>

        <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
          isSubmitted
            ? isCorrectPosition
              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
              : 'bg-amber-950 text-amber-400 border border-amber-500/40'
            : 'bg-slate-950 text-slate-300 border border-slate-800'
        }`}>
          {index + 1}
        </div>

        {/* Content */}
        <div className="pr-2">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-cyan-300 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800/40">
              <Clock className="w-3 h-3 text-cyan-400" />
              {event.timeText}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {event.category}
            </span>
          </div>
          
          <h4 className="text-sm font-semibold text-slate-100 font-display">
            {event.title}
          </h4>
          
          <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
            {event.description}
          </p>
        </div>
      </div>

      {/* Right Controls: Up / Down arrow buttons for mobile / quick tap */}
      <div className="flex items-center gap-1 shrink-0">
        <div className="flex flex-col gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMoveUp(index)}
            title="Move earlier"
            className="p-1.5 rounded bg-slate-950 hover:bg-slate-800 disabled:opacity-25 disabled:cursor-not-allowed text-slate-400 hover:text-cyan-300 border border-slate-800"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={index === totalEvents - 1}
            onClick={() => onMoveDown(index)}
            title="Move later"
            className="p-1.5 rounded bg-slate-950 hover:bg-slate-800 disabled:opacity-25 disabled:cursor-not-allowed text-slate-400 hover:text-cyan-300 border border-slate-800"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
