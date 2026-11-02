/**
 * Case Information & Evidence Data
 * Fictional investigation for SEASAW Cybersecurity Society stall
 */

export const CASE_META = {
  caseId: "CASE-007-MIDNIGHT",
  codeName: "THE MIDNIGHT LOGIN",
  stallOrganization: "SEASAW Cybersecurity Society",
  difficulty: "Beginner – Intermediate",
  estimatedTime: "5–7 minutes",
  classification: "ACCOUNT COMPROMISE / PHISHING FORENSICS",
  tagline: "Every clue matters. Can you solve the case before the next login?",
  disclaimer: "Fictional educational simulation. No actual credentials, servers, or personal accounts are accessed."
};

export const VICTIM_INFO = {
  name: "Ahmed Khan",
  role: "Undergraduate Computer Science Student & Club Treasurer",
  institution: "Metropolitan University (Fictional)",
  accountType: "Student Portal & Single Sign-On (SSO)",
  incidentDate: "October 31, 2026",
  incidentSummary: "Ahmed Khan notices messages sent from his account that he does not remember sending. He contacts the Cybersecurity Society investigation team to determine what happened.",
  initialImpact: "Unauthorized messages dispatched to fellow students and committee members; risk of broader campus credential harvest."
};

export const EVIDENCE_ITEMS = [
  {
    id: "evidence-a",
    key: "A",
    title: "Login History",
    subtitle: "Auth Server Access Logs",
    category: "Network & Access Logs",
    iconName: "ShieldAlert",
    summary: "Timestamped authentication records showing multiple device sessions and anomalies.",
    clueHighlight: "A failed login attempt at 10:02 PM was followed by a successful login at 10:04 PM from an unrecognised device.",
    logs: [
      {
        time: "8:15 PM",
        status: "SUCCESS",
        device: "MacBook Air (Personal)",
        ip: "192.168.1.45 (Home Broadband)",
        location: "Local Suburb",
        details: "Owner's usual authenticated session. Normal session token issued."
      },
      {
        time: "10:02 PM",
        status: "FAILED",
        device: "Unknown Linux / Headless Browser",
        ip: "185.220.101.5 (External Proxy / Tor Exit)",
        location: "Unknown / Cloud VPN",
        details: "Invalid password attempt (attempt #1). Threshold warning triggered."
      },
      {
        time: "10:04 PM",
        status: "SUCCESS",
        device: "Unknown Linux / Chromium",
        ip: "185.220.101.5 (External Proxy / Tor Exit)",
        location: "Unknown / Cloud VPN",
        details: "Successful login with valid credentials from unfamiliar device. No MFA challenge presented."
      },
      {
        time: "10:08 PM",
        status: "ACTIVITY",
        device: "Unknown Linux / Chromium",
        ip: "185.220.101.5",
        location: "Unknown",
        details: "Mass outbound messages dispatched to 42 contact addresses containing external links."
      },
      {
        time: "10:15 PM",
        status: "INCIDENT",
        device: "iPhone 14 (Mobile)",
        ip: "172.56.21.80 (Mobile Network)",
        location: "Local Suburb",
        details: "Ahmed Khan submits high-priority incident ticket via Helpdesk regarding unauthorized outbound chats."
      }
    ],
    forensicNotes: "Notice the 2-minute gap between the failed login and the successful login from the same unfamiliar external IP. This strongly indicates the attacker tested harvested credentials until successful, without encountering MFA barriers."
  },
  {
    id: "evidence-b",
    key: "B",
    title: "Suspicious Message",
    subtitle: "Phishing Lure Inspection",
    category: "Communications",
    iconName: "MailWarning",
    summary: "High-urgency email lure claiming account restriction with a fake domain.",
    clueHighlight: "Artificial urgency designed to panic the recipient into clicking a fraudulent domain (example.invalid).",
    emailDetails: {
      from: "IT Helpdesk Notice <security-alert@metrouni-support.site.invalid>",
      to: "a.khan@student.metrouni.invalid",
      timestamp: "9:42 PM (approx 20 mins before breach)",
      subject: "Your university account requires verification.",
      body: "ATTENTION: Your account will be restricted within 2 hours due to unverified compliance policies. Verify your details immediately to prevent administrative lockout.",
      displayedLinkText: "university-login.example.invalid",
      actualDestination: "http://university-login.example.invalid/harvest-auth",
      redFlags: [
        "Artificial sense of urgency ('account will be restricted immediately')",
        "Unrealistic deadline designed to prevent rational fact-checking",
        "Non-standard domain (.site.invalid instead of official university portal)",
        "Generic greeting without student verification number",
        "Direct link asking for password re-entry rather than asking user to navigate to official bookmark"
      ]
    },
    forensicNotes: "Phishing lures deliberately manufacture stress and urgency. An official IT department rarely threatens immediate restriction within hours via an unsolicited email link."
  },
  {
    id: "evidence-c",
    key: "C",
    title: "Owner's Statement",
    subtitle: "Interview Transcript",
    category: "Witness Testimony",
    iconName: "UserCheck",
    summary: "Ahmed Khan's firsthand testimony explaining actions leading up to the breach.",
    clueHighlight: "Ahmed admitted clicking an urgent link and submitting credentials on a lookalike portal.",
    statementText: "I received an unexpected verification message, followed its link, and entered my account details.",
    transcript: [
      {
        speaker: "Investigator",
        text: "Ahmed, could you walk us through what happened earlier this evening around 9:45 PM?"
      },
      {
        speaker: "Ahmed Khan (Owner)",
        text: "I was studying in my room when a notification popped up saying my university account was about to be restricted. I panicked because my assignment is due midnight. I received an unexpected verification message, followed its link, and entered my account details."
      },
      {
        speaker: "Investigator",
        text: "Did the webpage look normal when you typed your credentials?"
      },
      {
        speaker: "Ahmed Khan (Owner)",
        text: "It looked almost identical to our student portal login screen! It had the blue university banner and everything. After I clicked submit, it just redirected back to Google or refreshed, and I thought it went through. Then 20 minutes later, my groupmates texted me asking why I was spamming them."
      }
    ],
    forensicNotes: "Credential harvesting attack confirmed. The victim provided their legitimate credentials on a cloned spoofed site. The attacker captured them and tested them shortly after."
  },
  {
    id: "evidence-d",
    key: "D",
    title: "Security Settings",
    subtitle: "Account Audit Profile",
    category: "Identity & Configuration",
    iconName: "KeyRound",
    summary: "System configuration inspection revealing crucial defensive posture gaps.",
    clueHighlight: "Multi-Factor Authentication was DISABLED, and the 10:04 PM login was flagged as an UNRECOGNIZED device.",
    settings: [
      {
        attribute: "Multi-Factor Authentication (MFA / 2FA)",
        value: "DISABLED",
        severity: "CRITICAL VULNERABILITY",
        impact: "Credentials alone granted complete unhindered access. No OTP, push notification, or security key was required to log in."
      },
      {
        attribute: "Recent Password Change",
        value: "NONE RECORDED",
        severity: "INFORMATIONAL",
        impact: "Password had remained unchanged for 210 days; same password used on multiple personal services."
      },
      {
        attribute: "Unfamiliar Device Status",
        value: "NOT RECOGNIZED",
        severity: "HIGH ALERT",
        impact: "The login session at 10:04 PM originated from a brand new device fingerprint never previously registered by Ahmed."
      },
      {
        attribute: "Active Concurrent Sessions",
        value: "2 ACTIVE SESSIONS",
        severity: "WARNING",
        impact: "Attacker session remains alive alongside Ahmed's phone session until invalidated."
      }
    ],
    forensicNotes: "If Multi-Factor Authentication had been enabled, the stolen password alone would NOT have allowed the attacker to log in. MFA creates an essential second defensive barrier."
  }
];

export const TIMELINE_EVENTS = [
  {
    id: "evt-phish",
    correctOrder: 1,
    timeText: "Approx 9:42 PM",
    title: "Suspicious verification message received",
    description: "Urgent email arrives warning account restriction; contains fake link (university-login.example.invalid).",
    category: "Lure Received"
  },
  {
    id: "evt-failed-login",
    correctOrder: 2,
    timeText: "10:02 PM",
    title: "Failed login attempt",
    description: "Attacker attempts to log in using harvested credentials from an unfamiliar external proxy IP.",
    category: "Initial Attack"
  },
  {
    id: "evt-success-login",
    correctOrder: 3,
    timeText: "10:04 PM",
    title: "Successful login from an unfamiliar device",
    description: "Attacker successfully authenticates with valid credentials; no MFA challenge required.",
    category: "Compromise"
  },
  {
    id: "evt-messages-sent",
    correctOrder: 4,
    timeText: "10:08 PM",
    title: "Messages sent from the account",
    description: "Attacker uses Ahmed's account to send spam and secondary phishing messages to 42 campus contacts.",
    category: "Unauthorized Action"
  },
  {
    id: "evt-owner-reports",
    correctOrder: 5,
    timeText: "10:15 PM",
    title: "Owner reports suspicious activity",
    description: "Ahmed alerted by classmates, notices unfamiliar activity, and files a high-priority ticket with IT.",
    category: "Detection & Response"
  }
];
