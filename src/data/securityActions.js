/**
 * Security Response Actions
 * Screen 6: Remediation options with scoring and rationales
 */

export const SECURITY_ACTIONS = [
  {
    id: "act-pwd",
    text: "Change the password from a trusted device.",
    isSafe: true,
    points: 50,
    impact: "+50 pts",
    category: "Credential Security",
    explanation: "Essential first step. Changing the password invalidates compromised credentials, provided it is performed on a verified, uncompromised device."
  },
  {
    id: "act-revoke-sessions",
    text: "Sign out unfamiliar sessions.",
    isSafe: true,
    points: 50,
    impact: "+50 pts",
    category: "Session Management",
    explanation: "Revoking active sessions cuts off the attacker's active Chromium session immediately, preventing ongoing unauthorized actions."
  },
  {
    id: "act-enable-mfa",
    text: "Enable multi-factor authentication.",
    isSafe: true,
    points: 50,
    impact: "+50 pts",
    category: "Identity Defense",
    explanation: "The strongest long-term defense. Even if credentials are leaked again in the future, an attacker cannot log in without the secondary authentication token."
  },
  {
    id: "act-review-recovery",
    text: "Review account recovery details.",
    isSafe: true,
    points: 50,
    impact: "+50 pts",
    category: "Account Hardening",
    explanation: "Attackers often backdoor accounts by adding their own recovery email or phone number. Checking recovery info ensures persistence mechanisms are dismantled."
  },
  {
    id: "act-audit-activity",
    text: "Review recent account activity.",
    isSafe: true,
    points: 50,
    impact: "+50 pts",
    category: "Incident Scoping",
    explanation: "Auditing sent items, forwarding rules, and connected apps helps understand the full blast radius of the compromise."
  },
  {
    id: "act-report-it",
    text: "Report the incident to university IT.",
    isSafe: true,
    points: 50,
    impact: "+50 pts",
    category: "Institutional Defense",
    explanation: "University IT can block the phishing domain network-wide, inspect campus email filters, and protect other students targeted by the 42 spam messages."
  },
  {
    id: "act-reclick-link",
    text: "Click the suspicious verification link again.",
    isSafe: false,
    points: -60,
    impact: "-60 pts",
    category: "Hazardous Action",
    explanation: "Unsafe! Interacting repeatedly with phishing links risks secondary exploitation, malware delivery, or validating your email address to the attacker."
  },
  {
    id: "act-share-creds",
    text: "Share account credentials with someone else.",
    isSafe: false,
    points: -60,
    impact: "-60 pts",
    category: "Hazardous Action",
    explanation: "Unsafe! Sharing passwords with friends or unofficial channels multiplies risk, voids acceptable use policies, and complicates forensic tracking."
  }
];
