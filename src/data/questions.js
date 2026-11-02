/**
 * Investigation Questions Data
 * Screen 5 challenge questions with scoring and security explanations.
 */

export const INVESTIGATION_QUESTIONS = [
  {
    id: "q1",
    questionNumber: 1,
    title: "Strongest Initial Warning Sign",
    prompt: "What is the strongest initial warning sign that Ahmed's account has been compromised?",
    points: 150,
    options: [
      {
        id: "opt-1a",
        text: "The usual device login at 8:15 PM.",
        isCorrect: false,
        feedback: "Incorrect. The 8:15 PM login was from Ahmed's normal MacBook on his usual home IP, representing legitimate routine activity."
      },
      {
        id: "opt-1b",
        text: "The failed login attempt at 10:02 PM.",
        isCorrect: false,
        feedback: "Partially informative, but a single failed attempt is common and alone doesn't guarantee compromise until the unfamiliar session succeeds."
      },
      {
        id: "opt-1c",
        text: "The successful login from an unfamiliar device at 10:04 PM.",
        isCorrect: true,
        feedback: "Correct! A successful authentication from a completely unrecognised external device/proxy without the owner's knowledge is the critical indicator of compromise."
      },
      {
        id: "opt-1d",
        text: "The owner's report at 10:15 PM.",
        isCorrect: false,
        feedback: "Incorrect. The owner's report is after-the-fact detection, not the technical warning sign that the compromise occurred."
      }
    ],
    explanation: "In forensic analysis, an unauthorized successful login from an unfamiliar IP or device fingerprint is the critical pivot point where access was breached."
  },
  {
    id: "q2",
    questionNumber: 2,
    title: "Most Likely Attack Explanation",
    prompt: "Based on the evidence gathered, what is the most likely explanation for how the compromise occurred?",
    points: 150,
    options: [
      {
        id: "opt-2a",
        text: "The owner accidentally sent the messages while sleepwalking.",
        isCorrect: false,
        feedback: "Incorrect. The technical logs prove the messages originated from an external unfamiliar device at 10:08 PM, not Ahmed's phone."
      },
      {
        id: "opt-2b",
        text: "The owner may have entered credentials into a phishing page.",
        isCorrect: true,
        feedback: "Correct! Ahmed clicked a link from an urgent verification email and submitted his credentials on a cloned spoofed site (university-login.example.invalid)."
      },
      {
        id: "opt-2c",
        text: "The university IT department intentionally accessed the account to test him.",
        isCorrect: false,
        feedback: "Incorrect. IT departments do not use anonymous external proxies or blast spam messages across campus contact lists."
      },
      {
        id: "opt-2d",
        text: "The account was automatically corrupted and deleted by server bug.",
        isCorrect: false,
        feedback: "Incorrect. The account was active, and legitimate credentials were used by an unauthorized party."
      }
    ],
    explanation: "This is the leading explanation based on the clues: Ahmed clicked an urgent fake verification lure, provided credentials on a fake domain, and minutes later an external party logged in with them."
  },
  {
    id: "q3",
    questionNumber: 3,
    title: "Immediate Remediation Priority",
    prompt: "What should Ahmed do first to regain control and halt ongoing harm?",
    points: 150,
    options: [
      {
        id: "opt-3a",
        text: "Ignore the activity and wait to see if more messages get sent.",
        isCorrect: false,
        feedback: "Dangerous! Inaction allows the attacker to maintain persistence, harvest more contacts, or lock Ahmed out permanently."
      },
      {
        id: "opt-3b",
        text: "Click the suspicious link again to see what it was doing.",
        isCorrect: false,
        feedback: "Dangerous! Revisiting an untrusted malicious site could expose the device to secondary drive-by payloads or repeat harvesting."
      },
      {
        id: "opt-3c",
        text: "Use the official recovery/security page or contact university IT.",
        isCorrect: true,
        feedback: "Correct! Immediately contacting official university IT or using the legitimate, verified recovery portal ensures active attacker sessions get terminated and passwords get securely reset."
      },
      {
        id: "opt-3d",
        text: "Share his password with a classmate to have them check the inbox.",
        isCorrect: false,
        feedback: "Never share credentials with friends or colleagues; it compounds credential exposure and violates security hygiene."
      }
    ],
    explanation: "Always use verified out-of-band channels: official bookmarks or direct IT contacts. Never click links inside suspicious notices to remediate an account."
  }
];
