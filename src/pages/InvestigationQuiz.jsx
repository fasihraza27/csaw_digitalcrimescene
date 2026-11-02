import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Award,
  ChevronRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { INVESTIGATION_QUESTIONS } from '../data/questions.js';
import { soundManager } from '../utils/soundEffects.js';

export default function InvestigationQuiz({
  quizAnswers,
  onRecordAnswer,
  onContinue
}) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptId, setSelectedOptId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeQuestion = INVESTIGATION_QUESTIONS[currentQIndex];
  const existingRecord = quizAnswers[activeQuestion.id];

  // Set up existing answer if user navigated back
  const currentAnswer = existingRecord || (isSubmitted ? activeQuestion.options.find(o => o.id === selectedOptId) : null);

  const handleSelectOption = (optId) => {
    if (existingRecord || isSubmitted) return;
    soundManager.playClick();
    setSelectedOptId(optId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptId || existingRecord || isSubmitted) return;

    const chosenOption = activeQuestion.options.find((o) => o.id === selectedOptId);
    if (!chosenOption) return;

    setIsSubmitted(true);
    if (chosenOption.isCorrect) {
      soundManager.playSuccess();
    } else {
      soundManager.playWarning();
    }

    onRecordAnswer(activeQuestion.id, {
      selectedOptionId: chosenOption.id,
      isCorrect: chosenOption.isCorrect,
      pointsAwarded: chosenOption.isCorrect ? activeQuestion.points : 0
    });
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    if (currentQIndex < INVESTIGATION_QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOptId(null);
      setIsSubmitted(false);
    } else {
      onContinue();
    }
  };

  const isLastQuestion = currentQIndex === INVESTIGATION_QUESTIONS.length - 1;
  const isQuestionAnswered = Boolean(existingRecord || isSubmitted);
  const selectedOptionObj = activeQuestion.options.find(
    (o) => o.id === (existingRecord ? existingRecord.selectedOptionId : selectedOptId)
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 animate-fade-in">
      
      {/* Header */}
      <div className="mb-6 space-y-1">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>STAGE 05 // FORENSIC ANALYSIS QUIZ</span>
          <span>·</span>
          <span>QUESTION {currentQIndex + 1} OF {INVESTIGATION_QUESTIONS.length}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
          Investigation Analysis
        </h2>
        <p className="text-sm text-slate-400">
          Evaluate the technical evidence to determine warning signs, attack vectors, and immediate remediation steps.
        </p>
      </div>

      {/* Question Stepper Indicator */}
      <div className="flex items-center gap-2 mb-6">
        {INVESTIGATION_QUESTIONS.map((q, idx) => {
          const ans = quizAnswers[q.id];
          const isCurrent = idx === currentQIndex;
          return (
            <button
              key={q.id}
              onClick={() => {
                if (ans) {
                  setCurrentQIndex(idx);
                  setIsSubmitted(false);
                  setSelectedOptId(null);
                }
              }}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all ${
                isCurrent 
                  ? 'bg-cyan-950 border border-cyan-500/60 text-cyan-300' 
                  : ans
                  ? ans.isCorrect
                    ? 'bg-emerald-950/40 border border-emerald-800/40 text-emerald-400'
                    : 'bg-rose-950/40 border border-rose-800/40 text-rose-400'
                  : 'bg-slate-900 border border-slate-800 text-slate-500'
              }`}
            >
              <span>Q{idx + 1}</span>
              {ans && (
                ans.isCorrect 
                  ? <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  : <XCircle className="w-3 h-3 text-rose-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Question Card */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl mb-6">
        
        {/* Card Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
              {activeQuestion.title}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-100 font-display mt-0.5">
              {activeQuestion.prompt}
            </h3>
          </div>
          <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40 shrink-0">
            +{activeQuestion.points} pts
          </div>
        </div>

        {/* Options List */}
        <div className="p-5 sm:p-6 space-y-3">
          {activeQuestion.options.map((option) => {
            const isSelected = (existingRecord ? existingRecord.selectedOptionId : selectedOptId) === option.id;
            
            let optionStyles = 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-cyan-500/40 hover:bg-slate-950';

            if (isQuestionAnswered) {
              if (option.isCorrect) {
                optionStyles = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-100 shadow-sm shadow-emerald-950';
              } else if (isSelected && !option.isCorrect) {
                optionStyles = 'bg-rose-950/40 border-rose-500/60 text-rose-100';
              } else {
                optionStyles = 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60';
              }
            } else if (isSelected) {
              optionStyles = 'bg-cyan-950/50 border-cyan-400 text-white ring-1 ring-cyan-400 shadow-md shadow-cyan-950/30';
            }

            return (
              <div
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${optionStyles}`}
              >
                {/* Radio Circle / Status Icon */}
                <div className="mt-0.5 shrink-0">
                  {isQuestionAnswered ? (
                    option.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-700" />
                    )
                  ) : (
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected ? 'border-cyan-400 bg-cyan-500' : 'border-slate-600 bg-slate-900'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                    </div>
                  )}
                </div>

                <div className="flex-1 text-sm font-medium leading-relaxed">
                  {option.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback / Educational Explanation Drawer */}
        {isQuestionAnswered && selectedOptionObj && (
          <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-3 animate-fade-in text-xs font-mono">
            <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
              selectedOptionObj.isCorrect 
                ? 'bg-emerald-950/40 border-emerald-700/50 text-emerald-200' 
                : 'bg-rose-950/40 border-rose-700/50 text-rose-200'
            }`}>
              {selectedOptionObj.isCorrect ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-bold block mb-0.5">
                  {selectedOptionObj.isCorrect ? "ACCURATE DEDUCTION (+150 PTS)" : "INCORRECT DEDUCTION"}
                </span>
                <p className="font-sans leading-relaxed text-slate-300">
                  {selectedOptionObj.feedback}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-sans text-slate-300 leading-relaxed">
              <span className="font-mono text-cyan-400 font-bold block mb-1 uppercase text-[11px]">
                Forensic Takeaway:
              </span>
              {activeQuestion.explanation}
            </div>
          </div>
        )}

        {/* Footer Action */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-400">
            {!isQuestionAnswered ? "Select an option and submit to verify." : "Review the forensic feedback above."}
          </div>

          {!isQuestionAnswered ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOptId}
              className="py-2.5 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-display font-bold text-sm transition-all shadow-md shadow-cyan-500/20 active:scale-[0.99]"
            >
              SUBMIT ANSWER
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="py-2.5 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-display font-bold text-sm flex items-center gap-2 transition-all shadow-md shadow-cyan-500/20 active:scale-[0.99] cursor-pointer"
            >
              <span>{isLastQuestion ? "PROCEED TO SECURITY RESPONSE" : "NEXT QUESTION"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
