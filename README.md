# CareBridge AI — Multi-Agent Family Health & Welfare Assistant

> **“One Family. One Health Intelligence.”**

CareBridge AI is an autonomous, multi-agent healthcare coordination platform designed to help families organize medical reports, track multi-generational medication schedules, stay ahead of preventive wellness milestones, and discover eligible public welfare and healthcare schemes.

---

## 🏗️ Multi-Agent Architecture (Hub-and-Spoke)

CareBridge AI coordinates 7 specialized AI agents managed by a central **Health Coordinator Agent**:

```text
                           ┌──────────────────────────┐
                           │   Family User / Admin    │
                           └─────────────┬────────────┘
                                         │ (Natural Language / Report Upload)
                                         ▼
                        ┌─────────────────────────────────┐
                        │    Health Coordinator Agent     │
                        │   - Intent Classification       │
                        │   - Task Decomposition          │
                        │   - Safety Routing              │
                        └────────────────┬────────────────┘
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        ▼                                ▼                                ▼
┌──────────────────────┐       ┌──────────────────────┐       ┌──────────────────────┐
│  Health Assessment   │       │    Medical Report    │       │   Medication Agent   │
│  - Triage Info       │       │    - OCR Extraction  │       │   - Adherence Check  │
│  - Doctor Questions  │       │    - Lab Ranges      │       │   - Refill Warnings  │
└──────────┬───────────┘       └──────────┬───────────┘       └──────────┬───────────┘
           │                              │                              │
           │                              ▼                              │
           │                     ┌──────────────────────┐                │
           ├────────────────────►│ Emergency Safety     │◄───────────────┤
           │                     │ (Highest Watchdog)   │                │
           │                     └──────────┬───────────┘                │
           │                              │                              │
           ▼                              ▼                              ▼
┌──────────────────────┐       ┌──────────────────────┐       ┌──────────────────────┐
│   Family Wellness    │       │    Welfare Scheme    │       │    Health Summary    │
│   - Immunizations    │       │    - PM-JAY / RVY    │       │    - Clinician Guide │
│   - Checkups         │       │    - Benefit Matcher │       │    - Unified Plan    │
└──────────────────────┘       └──────────────────────┘       └──────────────────────┘
```

---

## 🌟 The 7 Specialized Agents

1. **Health Coordinator Agent**: Central dispatcher and synthesis engine.
2. **Health Assessment Agent**: Evaluates symptoms, asks structured follow-up questions, gauges non-clinical urgency, and outlines doctor discussion topics.
3. **Medical Report Agent**: Parses diagnostic files, checks values against clinical reference ranges, flags high/low parameters, and prepares doctor inquiries.
4. **Medication Agent**: Tracks family dosage schedules (8 AM / 1 PM / 8 PM), monitors adherence streaks, and alerts for low refills.
5. **Family Wellness Agent**: Aggregates preventive health milestones, immunizations, and pediatric/geriatric checkup cadences.
6. **Welfare Scheme Agent**: Scans verified government programs (Ayushman Bharat PM-JAY, Rashtriya Vayoshri, Matru Vandana) matching family demographics.
7. **Emergency Safety Agent**: Highest-priority watchdog scanning all queries and outputs for red-flag symptoms to immediately trigger SOS emergency protocols.

---

## 🚀 Quick Start Guide

### 1. Run the Application Locally
Since CareBridge AI is built with modern ES Modules and standard web technologies, you can run the server directly using Python:

```bash
# In the project root directory:
python server.py
```

Open your browser and navigate to:
```
http://localhost:8080
```
*(or `http://localhost:8000`)*

---

## 🎯 Hackathon Demo Scenarios

CareBridge AI includes pre-configured, 1-click demo flows in the **Floating Demo Bar**:

### Primary Showcase: Blood Report Analysis (Grandfather Ramesh)
1. Click **“1. Blood Report Analysis”** or visit **AI Health Assistant**.
2. Query: *“Can you explain my grandfather Ramesh’s CBC blood report and tell me what questions we should ask Dr. Nambiar?”*
3. Watch the real-time agent pipeline:
   - **Health Coordinator Agent** activates.
   - **Medical Report Agent** extracts Hemoglobin (10.2 g/dL - Low) & Ferritin (18 ng/mL - Low).
   - **Emergency Safety Agent** enforces non-diagnostic guardrails.
   - **Health Summary Agent** generates formatted consultation questions for Dr. V. K. Nambiar.

### Scenario 2: Emergency Safety Intercept
1. Query: *“I am feeling severe crushing chest pain and shortness of breath.”*
2. **Emergency Safety Agent** immediately intercepts the prompt, flags critical red alerts, and surfaces the 108 Ambulance dialer.

### Scenario 3: Senior Welfare Discovery
1. Open **Welfare Schemes Navigator** or run Scenario 3.
2. Filter for senior citizens to see matches for **Ayushman Bharat PM-JAY** and **Rashtriya Vayoshri Yojana**.

---

## 🎪 Pitch Deck & Presentation Mode
CareBridge AI features a built-in, 5-slide pitch deck ready for hackathon judges:
- Click **“🎪 Pitch Deck”** in the top navigation or sidebar.
- Navigate using **← / → Arrow Keys** or **Spacebar**.

---

## 🛡️ Medical Disclaimer
CareBridge AI is designed exclusively for health information organization and clinician appointment preparation. It does **not** provide medical diagnoses, replace certified medical professionals, or prescribe treatments.
