import React, { useState, useEffect } from 'react';
import { CASE_META, TIMELINE_EVENTS } from './data/caseData.js';
import { soundManager } from './utils/soundEffects.js';
import Navbar from './components/Navbar.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import CaseLoadingOverlay from './components/CaseLoadingOverlay.jsx';
import RestartConfirmModal from './components/RestartConfirmModal.jsx';

import WelcomeScreen from './pages/WelcomeScreen.jsx';
import IncidentBriefing from './pages/IncidentBriefing.jsx';
import EvidenceRoom from './pages/EvidenceRoom.jsx';
import TimelineChallenge from './pages/TimelineChallenge.jsx';
import InvestigationQuiz from './pages/InvestigationQuiz.jsx';
import SecurityResponse from './pages/SecurityResponse.jsx';
import InvestigationResults from './pages/InvestigationResults.jsx';

// Function to shuffle timeline items for the puzzle
const getShuffledTimeline = () => {
  return [...TIMELINE_EVENTS].sort(() => Math.random() - 0.5);
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [maxUnlockedScreen, setMaxUnlockedScreen] = useState(1);
  const [investigatorName, setInvestigatorName] = useState(() => {
    try {
      return localStorage.getItem('dcs_agent_name') || '';
    } catch (e) {
      return '';
    }
  });

  const [isLoadingOverlay, setIsLoadingOverlay] = useState(false);
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  // Elapsed Timer state
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Evidence state
  const [investigatedEvidence, setInvestigatedEvidence] = useState([]);

  // Timeline state
  const [timelineEvents, setTimelineEvents] = useState(getShuffledTimeline);
  const [isTimelineSolved, setIsTimelineSolved] = useState(false);
  const [timelineAttempts, setTimelineAttempts] = useState(0);
  const [timelineScore, setTimelineScore] = useState(0);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});

  // Security Response state
  const [selectedSecurityActions, setSelectedSecurityActions] = useState([]);
  const [isSecurityResponseSubmitted, setIsSecurityResponseSubmitted] = useState(false);
  const [securityResponseScore, setSecurityResponseScore] = useState(0);

  // Timer interval (runs while active in investigation screens 2-6)
  useEffect(() => {
    let interval = null;
    if (currentScreen >= 2 && currentScreen < 7) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentScreen]);

  // Save investigator name to localStorage
  const handleSetInvestigatorName = (name) => {
    setInvestigatorName(name);
    try {
      localStorage.setItem('dcs_agent_name', name);
    } catch (e) {}
  };

  // Sound mute toggle
  const handleToggleMute = () => {
    const next = soundManager.toggleMute();
    setIsMuted(next);
  };

  // Screen progression helper
  const goToScreen = (screenNumber) => {
    setCurrentScreen(screenNumber);
    if (screenNumber > maxUnlockedScreen) {
      setMaxUnlockedScreen(screenNumber);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start investigation from Welcome Screen
  const handleStartInvestigation = () => {
    setIsLoadingOverlay(true);
  };

  const handleLoadingComplete = () => {
    setIsLoadingOverlay(false);
    goToScreen(2); // Go to Incident Briefing
  };

  // Evidence investigated toggle
  const handleToggleInvestigated = (evidenceId) => {
    setInvestigatedEvidence((prev) => {
      if (prev.includes(evidenceId)) {
        return prev.filter((id) => id !== evidenceId);
      } else {
        return [...prev, evidenceId];
      }
    });
  };

  // Timeline solved callback
  const handleTimelineSuccess = (attempts) => {
    setIsTimelineSolved(true);
    setTimelineAttempts(attempts);

    // Scoring logic for timeline: 250 for 1st attempt, 200 for 2nd, 150 for 3rd+
    let score = 250;
    if (attempts === 2) score = 200;
    else if (attempts >= 3) score = 150;
    setTimelineScore(score);
  };

  // Quiz answer recorder
  const handleRecordQuizAnswer = (qId, answerData) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [qId]: answerData
    }));
  };

  // Calculate live score totals
  const evidenceScore = investigatedEvidence.length * 50; // 50 pts each, max 200
  const quizScore = Object.values(quizAnswers).reduce((sum, item) => sum + (item.pointsAwarded || 0), 0); // max 450
  const totalScore = Math.max(0, evidenceScore + timelineScore + quizScore + securityResponseScore);
  const maxTotalScore = 1200; // 200 evidence + 250 timeline + 450 quiz + 300 response

  // Reset all state to restart case
  const handleRestartCase = () => {
    setIsRestartModalOpen(false);
    setCurrentScreen(1);
    setMaxUnlockedScreen(1);
    setElapsedSeconds(0);
    setInvestigatedEvidence([]);
    setTimelineEvents(getShuffledTimeline());
    setIsTimelineSolved(false);
    setTimelineAttempts(0);
    setTimelineScore(0);
    setQuizAnswers({});
    setSelectedSecurityActions([]);
    setIsSecurityResponseSubmitted(false);
    setSecurityResponseScore(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 cyber-grid-bg flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        currentScreen={currentScreen}
        investigatorName={investigatorName}
        score={totalScore}
        elapsedSeconds={elapsedSeconds}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenRestart={() => setIsRestartModalOpen(true)}
      />

      {/* Progress Bar (Visible on all screens) */}
      <ProgressBar
        currentScreen={currentScreen}
        maxUnlockedScreen={maxUnlockedScreen}
        onNavigateStage={(stageId) => goToScreen(stageId)}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-center py-4">
        
        {/* Screen 1: Welcome Screen */}
        {currentScreen === 1 && (
          <WelcomeScreen
            investigatorName={investigatorName}
            setInvestigatorName={handleSetInvestigatorName}
            onStartInvestigation={handleStartInvestigation}
          />
        )}

        {/* Screen 2: Incident Briefing */}
        {currentScreen === 2 && (
          <IncidentBriefing
            investigatorName={investigatorName}
            onContinue={() => goToScreen(3)}
          />
        )}

        {/* Screen 3: Evidence Room */}
        {currentScreen === 3 && (
          <EvidenceRoom
            investigatedEvidence={investigatedEvidence}
            onToggleInvestigated={handleToggleInvestigated}
            onContinue={() => goToScreen(4)}
          />
        )}

        {/* Screen 4: Timeline Reconstruction Challenge */}
        {currentScreen === 4 && (
          <TimelineChallenge
            timelineEvents={timelineEvents}
            setTimelineEvents={setTimelineEvents}
            onTimelineSuccess={handleTimelineSuccess}
            isTimelineSolved={isTimelineSolved}
            timelineScore={timelineScore}
            onContinue={() => goToScreen(5)}
          />
        )}

        {/* Screen 5: Investigation Questions Quiz */}
        {currentScreen === 5 && (
          <InvestigationQuiz
            quizAnswers={quizAnswers}
            onRecordAnswer={handleRecordQuizAnswer}
            onContinue={() => goToScreen(6)}
          />
        )}

        {/* Screen 6: Security Response */}
        {currentScreen === 6 && (
          <SecurityResponse
            selectedActions={selectedSecurityActions}
            setSelectedActions={setSelectedSecurityActions}
            isResponseSubmitted={isSecurityResponseSubmitted}
            setIsResponseSubmitted={setIsSecurityResponseSubmitted}
            responseScore={securityResponseScore}
            onCalculateResponseScore={(score) => setSecurityResponseScore(score)}
            onContinue={() => goToScreen(7)}
          />
        )}

        {/* Screen 7: Investigation Results */}
        {currentScreen === 7 && (
          <InvestigationResults
            investigatorName={investigatorName}
            elapsedSeconds={elapsedSeconds}
            evidenceScore={evidenceScore}
            investigatedEvidenceCount={investigatedEvidence.length}
            timelineScore={timelineScore}
            timelineAttempts={timelineAttempts}
            quizAnswers={quizAnswers}
            responseScore={securityResponseScore}
            totalScore={totalScore}
            maxTotalScore={maxTotalScore}
            onRestartCase={() => setIsRestartModalOpen(true)}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-950/80 border-t border-slate-900 py-4 px-6 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            SEASAW Cybersecurity Society · Case File #007
          </span>
          <span className="text-[11px] text-slate-600">
            Fictional Training Scenario · Strictly Offline / Safe Simulation
          </span>
        </div>
      </footer>

      {/* Case File Loading Animation Overlay */}
      {isLoadingOverlay && (
        <CaseLoadingOverlay
          onComplete={handleLoadingComplete}
          duration={1600}
        />
      )}

      {/* Restart Confirmation Modal */}
      <RestartConfirmModal
        isOpen={isRestartModalOpen}
        onClose={() => setIsRestartModalOpen(false)}
        onConfirm={handleRestartCase}
      />

    </div>
  );
}
