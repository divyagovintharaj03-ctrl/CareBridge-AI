// CareBridge AI - Reactive State Store & Fictional Demo Data
(function(window) {
  'use strict';

  const STORAGE_KEY = 'carebridge_ai_state_v2';

  // Default Realistic Demo State (All Fictional Data)
  const defaultState = {
    user: {
      id: 'usr_01',
      name: 'Divya G',
      email: 'divya.g@example.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      role: 'Family Health Admin',
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'India',
      incomeCategory: 'Middle Income (₹8L - ₹15L)',
      familySize: 4
    },
    activeMemberId: 'mem_01',
    activeView: 'landing', // 'landing', 'dashboard', 'assistant', 'family', 'reports', 'medications', 'timeline', 'welfare', 'emergency', 'agents', 'settings', 'presentation'
    presentationSlide: 0,
    emergencyActive: false,
    emergencyMessage: null,

    // 4 Family Members
    familyMembers: [
      {
        id: 'mem_01',
        name: 'Divya G',
        relation: 'Self / Mother',
        age: 38,
        gender: 'Female',
        bloodGroup: 'B+',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        allergies: ['Penicillin', 'Dust Mites'],
        emergencyContact: '+91 98765 43210 (Karthik - Spouse)',
        vitals: { bp: '122/80 mmHg', pulse: '72 bpm', spo2: '98%', weight: '64 kg', bmi: '23.5' },
        healthScore: 86,
        adherenceRate: 94,
        status: 'Healthy',
        doctor: 'Dr. Arvind Rao (Cardiologist, Manipal Clinic)',
        upcomingAppointment: 'Sep 18, 2026 - Routine Health & Wellness Review',
        notes: 'Mild lipid elevation managed by diet and active lifestyle.'
      },
      {
        id: 'mem_02',
        name: 'Priya G',
        relation: 'Sister / Co-Admin',
        age: 34,
        gender: 'Female',
        bloodGroup: 'O+',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        allergies: ['Sulfa Drugs'],
        emergencyContact: '+91 98765 43211 (Divya - Sister)',
        vitals: { bp: '118/76 mmHg', pulse: '76 bpm', spo2: '99%', weight: '58 kg', bmi: '22.0' },
        healthScore: 88,
        adherenceRate: 95,
        status: 'Healthy',
        doctor: 'Dr. Sunita Deshmukh (Endocrinologist)',
        upcomingAppointment: 'Oct 04, 2026 - Thyroid Panel Review',
        notes: 'Takes Levothyroxine 50 mcg daily on empty stomach.'
      },
      {
        id: 'mem_03',
        name: 'Ramesh Sharma',
        relation: 'Grandfather / Father',
        age: 68,
        gender: 'Male',
        bloodGroup: 'B+',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        allergies: ['Aspirin (Mild Gastric Upset)'],
        emergencyContact: '+91 98765 43211 (Divya - Daughter)',
        vitals: { bp: '138/88 mmHg', pulse: '68 bpm', spo2: '96%', weight: '71 kg', bmi: '25.3' },
        healthScore: 71,
        adherenceRate: 84,
        status: 'Attention Needed',
        doctor: 'Dr. V. K. Nambiar (Geriatric Physician & Diabetologist)',
        upcomingAppointment: 'Sep 12, 2026 - Diabetic Foot & HbA1c Review',
        notes: 'Type 2 Diabetes (6 yrs) and mild hypertension. Recent CBC shows mild microcytic anemia.'
      },
      {
        id: 'mem_04',
        name: 'Ananya Sharma',
        relation: 'Daughter / Child',
        age: 12,
        gender: 'Female',
        bloodGroup: 'O+',
        avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
        allergies: ['Peanuts', 'Pollen'],
        emergencyContact: '+91 98765 43211 (Priya - Mother)',
        vitals: { bp: '105/68 mmHg', pulse: '84 bpm', spo2: '99%', weight: '38 kg', bmi: '18.2' },
        healthScore: 94,
        adherenceRate: 100,
        status: 'Healthy',
        doctor: 'Dr. Kavita Shenoy (Pediatrician)',
        upcomingAppointment: 'Nov 15, 2026 - Annual Growth & Immunization Check',
        notes: 'Asthma inhaler (Salbutamol) as needed during sport/exercise.'
      }
    ],

    // Medications Schedule
    medications: [
      {
        id: 'med_01',
        memberId: 'mem_01',
        name: 'Atorvastatin',
        dosage: '10 mg',
        frequency: 'Once Daily (Bedtime)',
        timeSlot: '08:00 PM',
        purpose: 'Lipid / Cholesterol Support',
        prescribedBy: 'Dr. Arvind Rao',
        status: 'upcoming', // 'taken', 'pending', 'upcoming', 'missed'
        streakDays: 14,
        refillDaysLeft: 18
      },
      {
        id: 'med_02',
        memberId: 'mem_01',
        name: 'Omega-3 Fish Oil',
        dosage: '1000 mg',
        frequency: 'Once Daily with Food',
        timeSlot: '08:00 AM',
        purpose: 'General Wellness Supplement',
        prescribedBy: 'Self / OTC',
        status: 'taken',
        streakDays: 28,
        refillDaysLeft: 22
      },
      {
        id: 'med_03',
        memberId: 'mem_02',
        name: 'Levothyroxine',
        dosage: '50 mcg',
        frequency: 'Daily (Morning 30m before breakfast)',
        timeSlot: '08:00 AM',
        purpose: 'Hypothyroidism Maintenance',
        prescribedBy: 'Dr. Sunita Deshmukh',
        status: 'taken',
        streakDays: 45,
        refillDaysLeft: 12
      },
      {
        id: 'med_04',
        memberId: 'mem_02',
        name: 'Vitamin D3 & Calcium',
        dosage: '60,000 IU (Weekly) / 500mg',
        frequency: 'Daily after lunch',
        timeSlot: '01:00 PM',
        purpose: 'Bone Density & Vitality',
        prescribedBy: 'Dr. Sunita Deshmukh',
        status: 'pending',
        streakDays: 19,
        refillDaysLeft: 30
      },
      {
        id: 'med_05',
        memberId: 'mem_03',
        name: 'Metformin Hydrochloride',
        dosage: '500 mg',
        frequency: 'Twice Daily (Post-Meal)',
        timeSlot: '08:00 AM',
        purpose: 'Type 2 Blood Glucose Control',
        prescribedBy: 'Dr. V. K. Nambiar',
        status: 'taken',
        streakDays: 32,
        refillDaysLeft: 8
      },
      {
        id: 'med_06',
        memberId: 'mem_03',
        name: 'Amlodipine Besylate',
        dosage: '5 mg',
        frequency: 'Once Daily (Morning)',
        timeSlot: '08:00 AM',
        purpose: 'Blood Pressure Regulation',
        prescribedBy: 'Dr. V. K. Nambiar',
        status: 'taken',
        streakDays: 32,
        refillDaysLeft: 8
      },
      {
        id: 'med_07',
        memberId: 'mem_03',
        name: 'Metformin Hydrochloride (2nd dose)',
        dosage: '500 mg',
        frequency: 'Evening (Post-Dinner)',
        timeSlot: '08:00 PM',
        purpose: 'Type 2 Blood Glucose Control',
        prescribedBy: 'Dr. V. K. Nambiar',
        status: 'upcoming',
        streakDays: 31,
        refillDaysLeft: 8
      },
      {
        id: 'med_08',
        memberId: 'mem_04',
        name: 'Salbutamol Inhaler (Ventolin)',
        dosage: '100 mcg (2 puffs)',
        frequency: 'PRN (As Needed for Wheezing)',
        timeSlot: '01:00 PM',
        purpose: 'Mild Asthma Bronchodilator',
        prescribedBy: 'Dr. Kavita Shenoy',
        status: 'pending',
        streakDays: 7,
        refillDaysLeft: 40
      }
    ],

    // Medical Reports
    medicalReports: [
      {
        id: 'rep_01',
        memberId: 'mem_03',
        memberName: 'Ramesh Sharma',
        reportTitle: 'Complete Blood Count (CBC) & Iron Profile',
        labName: 'Metropolis Healthcare Diagnostic Labs',
        reportDate: '05 Sep 2026',
        testType: 'Hematology / Blood Panel',
        status: 'Analyzed by Medical Report Agent',
        summary: 'Report indicates mild microcytic hypochromic anemia with Hemoglobin at 10.2 g/dL (normal 13.0–17.0 g/dL) and Serum Ferritin low at 18 ng/mL. Other indices (WBC, Platelets) are within reference ranges.',
        parameters: [
          { name: 'Hemoglobin (Hb)', value: '10.2', unit: 'g/dL', refRange: '13.0 - 17.0', status: 'low', percentOfMax: 45 },
          { name: 'Total RBC Count', value: '3.8', unit: 'million/mcL', refRange: '4.5 - 5.9', status: 'low', percentOfMax: 48 },
          { name: 'WBC (Total Leucocytes)', value: '7,400', unit: '/cumm', refRange: '4,000 - 11,000', status: 'normal', percentOfMax: 60 },
          { name: 'Platelet Count', value: '235,000', unit: '/cumm', refRange: '150,000 - 450,000', status: 'normal', percentOfMax: 55 },
          { name: 'Serum Ferritin', value: '18', unit: 'ng/mL', refRange: '30 - 400', status: 'low', percentOfMax: 20 },
          { name: 'Fasting Blood Glucose', value: '128', unit: 'mg/dL', refRange: '70 - 100', status: 'high', percentOfMax: 78 }
        ],
        questionsForDoctor: [
          'What dietary or therapeutic iron supplementation is recommended for this mild hemoglobin decrease?',
          'Should we investigate any gastrointestinal or absorption causes given the low ferritin level?',
          'Does my current Metformin regimen require adjustment considering my fasting glucose of 128 mg/dL?'
        ],
        safetyNotes: 'This summary is for informational and educational preparation only. It does not replace a clinical examination by Dr. V. K. Nambiar.'
      },
      {
        id: 'rep_02',
        memberId: 'mem_01',
        memberName: 'Divya G',
        reportTitle: 'Comprehensive Lipid & Metabolic Profile',
        labName: 'Apollo Diagnostics Laboratory',
        reportDate: '20 Aug 2026',
        testType: 'Biochemistry / Lipid Panel',
        status: 'Analyzed by Medical Report Agent',
        summary: 'Total cholesterol is slightly elevated at 214 mg/dL with LDL at 134 mg/dL. HDL (Good Cholesterol) is optimal at 48 mg/dL and Triglycerides are normal at 148 mg/dL.',
        parameters: [
          { name: 'Total Cholesterol', value: '214', unit: 'mg/dL', refRange: '< 200', status: 'high', percentOfMax: 72 },
          { name: 'LDL Cholesterol', value: '134', unit: 'mg/dL', refRange: '< 100', status: 'high', percentOfMax: 68 },
          { name: 'HDL Cholesterol', value: '48', unit: 'mg/dL', refRange: '> 40', status: 'normal', percentOfMax: 58 },
          { name: 'Triglycerides', value: '148', unit: 'mg/dL', refRange: '< 150', status: 'normal', percentOfMax: 50 },
          { name: 'HbA1c', value: '5.4', unit: '%', refRange: '< 5.7', status: 'normal', percentOfMax: 45 }
        ],
        questionsForDoctor: [
          'Is lifestyle modification and diet sufficient before considering statin therapy?',
          'What specific dietary fiber adjustments are recommended before our next checkup?'
        ],
        safetyNotes: 'Educational summary only. Consult Dr. Arvind Rao.'
      },
      {
        id: 'rep_03',
        memberId: 'mem_02',
        memberName: 'Priya Sharma',
        reportTitle: 'Thyroid Function Panel (Free T3, Free T4, TSH)',
        labName: 'Dr. Lal PathLabs',
        reportDate: '12 Jul 2026',
        testType: 'Endocrinology / Thyroid',
        status: 'Analyzed by Medical Report Agent',
        summary: 'TSH is well-controlled at 2.45 mIU/L (euthyroid target 0.4–4.0 mIU/L). Free T3 and Free T4 are balanced on current Levothyroxine 50 mcg dosage.',
        parameters: [
          { name: 'TSH (Ultrasensitive)', value: '2.45', unit: 'mIU/L', refRange: '0.40 - 4.20', status: 'normal', percentOfMax: 50 },
          { name: 'Free T4', value: '1.28', unit: 'ng/dL', refRange: '0.80 - 1.80', status: 'normal', percentOfMax: 52 },
          { name: 'Free T3', value: '3.10', unit: 'pg/mL', refRange: '2.30 - 4.20', status: 'normal', percentOfMax: 54 }
        ],
        questionsForDoctor: [
          'Given that TSH is stable at 2.45 mIU/L, should we maintain the same 50 mcg dose for the next 6 months?',
          'When is the next ideal window for a routine follow-up thyroid test?'
        ],
        safetyNotes: 'Educational guidance. Do not change thyroid medication without physician guidance.'
      }
    ],

    // Health Timeline
    timeline: [
      {
        id: 'tl_01',
        memberId: 'mem_03',
        memberName: 'Ramesh Sharma',
        date: '05 Sep 2026',
        time: '11:30 AM',
        title: 'CBC & Iron Profile Report Uploaded',
        category: 'Lab Report',
        categoryColor: 'teal',
        icon: 'file-text',
        description: 'Analyzed by Medical Report Agent. Mild microcytic anemia noted (Hb 10.2 g/dL). Doctor discussion points generated.',
        badge: 'Medical Report Agent'
      },
      {
        id: 'tl_02',
        memberId: 'mem_01',
        memberName: 'Divya G',
        date: '28 Aug 2026',
        time: '04:15 PM',
        title: 'Health Follow-up with Dr. Arvind Rao',
        category: 'Doctor Consultation',
        categoryColor: 'blue',
        icon: 'stethoscope',
        description: 'Blood pressure checked at 122/80 mmHg. Omega-3 & dietary wellness plan continued. Advised 30 mins brisk daily walk.',
        badge: 'Consultation'
      },
      {
        id: 'tl_03',
        memberId: 'mem_02',
        memberName: 'Priya G',
        date: '18 Aug 2026',
        time: '10:00 AM',
        title: 'Influenza Annual Vaccination Recorded',
        category: 'Vaccination',
        categoryColor: 'green',
        icon: 'shield-check',
        description: 'Quadrivalent flu vaccine administered at Manipal Hospital. Valid until Aug 2027.',
        badge: 'Preventive Care'
      },
      {
        id: 'tl_04',
        memberId: 'mem_04',
        memberName: 'Ananya Sharma',
        date: '10 Aug 2026',
        time: '02:30 PM',
        title: 'Pediatric Growth & Vision Screening',
        category: 'Checkup',
        categoryColor: 'purple',
        icon: 'activity',
        description: 'Height 148 cm, weight 38 kg. 20/20 vision confirmed. Salbutamol inhaler refilled for emergency kit.',
        badge: 'Pediatrics'
      },
      {
        id: 'tl_05',
        memberId: 'mem_03',
        memberName: 'Ramesh Sharma',
        date: '22 Jul 2026',
        time: '09:00 AM',
        title: 'Senior Citizen Welfare Program Matched',
        category: 'Welfare Scheme',
        categoryColor: 'amber',
        icon: 'gift',
        description: 'Welfare Scheme Agent matched Rashtriya Vayoshri Yojana and PM-JAY Senior Citizen health coverage.',
        badge: 'Welfare Agent'
      }
    ],

    // Curated Welfare & Health Schemes Database
    welfareSchemes: [
      {
        id: 'sch_01',
        name: 'Ayushman Bharat PM-JAY (Senior Citizens 70+ & Families)',
        targetGroup: 'Senior Citizens (All Incomes) & Low/Middle Income Families',
        minAge: 0,
        maxAge: 120,
        coverageAmount: '₹5,00,000 per family/senior per year',
        matchScore: 'High Match (96%)',
        state: 'All States / Pan-India',
        description: 'Flagship health protection scheme providing cashless access to secondary and tertiary hospitalization across empanelled public and private hospitals.',
        whyRelevant: 'Ramesh (68) is approaching the 70-year universal senior bracket, and family members are covered under secondary care portability.',
        requiredDocuments: ['Aadhaar Card', 'Ration Card / Family ID', 'Income / Category Certificate (if applicable)', 'Mobile Number linked with Aadhaar'],
        officialUrl: 'https://pmjay.gov.in',
        portalName: 'National Health Authority (NHA) Portal',
        category: 'Government Health Insurance'
      },
      {
        id: 'sch_02',
        name: 'Rashtriya Vayoshri Yojana (RVY)',
        targetGroup: 'Senior Citizens with Age-Related Physical/Vision/Mobility Needs',
        minAge: 60,
        maxAge: 120,
        coverageAmount: 'Free Assisted-Living & Physical Devices (Spectacles, Hearing Aids, Walking Sticks)',
        matchScore: 'High Match (92%)',
        state: 'Karnataka & Pan-India',
        description: 'Provides physical aids and assisted-living devices for senior citizens suffering from age-related disabilities or infirmities to restore near normalcy.',
        whyRelevant: 'Directly applicable for grandfather Ramesh Sharma (68) for routine vision, hearing, and ergonomic assistance support.',
        requiredDocuments: ['Proof of Age (Aadhaar / Voter ID / Passport)', 'Disability/Medical Certificate from Medical Officer', 'Income Proof (or BPL Certificate)'],
        officialUrl: 'https://socialjustice.gov.in',
        portalName: 'Ministry of Social Justice & Empowerment',
        category: 'Senior Welfare'
      },
      {
        id: 'sch_03',
        name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
        targetGroup: 'Pregnant Women & Lactating Mothers',
        minAge: 18,
        maxAge: 45,
        coverageAmount: 'Direct Benefit Cash Incentive ₹5,000 in installments',
        matchScore: 'Informational (65%)',
        state: 'All States / Pan-India',
        description: 'Maternity benefit program compensating wage-loss during childbirth and encouraging institutional health checkups and early child immunization.',
        whyRelevant: 'Available to family members and relatives planning maternal care and newborn wellness.',
        requiredDocuments: ['MCP Card (Mother-Child Protection Card)', 'Aadhaar Card of Mother & Husband', 'Bank Account / Post Office Account details'],
        officialUrl: 'https://pmmvy.wcd.gov.in',
        portalName: 'Ministry of Women and Child Development',
        category: 'Maternal & Child Health'
      },
      {
        id: 'sch_04',
        name: 'National Urban Health Mission (NUHM) - NCD Screening Program',
        targetGroup: 'Urban Residents Aged 30+ for Diabetes, Hypertension & Cancer Screening',
        minAge: 30,
        maxAge: 100,
        coverageAmount: '100% Free Diagnostics & Generic Medications at UPHCs',
        matchScore: 'High Match (94%)',
        state: 'Karnataka (Bengaluru Urban)',
        description: 'Free comprehensive primary healthcare, monthly non-communicable disease (NCD) drug refills, and routine blood/urine tests at Urban Primary Health Centres.',
        whyRelevant: 'Both Divya (38) and Priya (34) can access free routine lipid, fasting sugar, and BP monitoring tests near their residential locality.',
        requiredDocuments: ['Aadhaar Card or Voter ID', 'Previous Prescription / NCD Health Card'],
        officialUrl: 'https://nhm.gov.in',
        portalName: 'National Health Mission',
        category: 'Preventive Care'
      },
      {
        id: 'sch_05',
        name: 'Universal Immunization Programme (UIP) & Mission Indradhanush',
        targetGroup: 'Children (0–16 Years) & Adolescent Girls',
        minAge: 0,
        maxAge: 18,
        coverageAmount: 'Free 12 Vaccine Preventable Disease Immunizations',
        matchScore: 'Active for Child (90%)',
        state: 'All States / Pan-India',
        description: 'Provides free life-saving vaccines including DPT booster, MMR, HPV, and Td (Tetanus-Diphtheria) for school-age children and adolescents.',
        whyRelevant: 'Ananya Sharma (12) has upcoming 12-year booster vaccines (Td/HPV preventive schedule).',
        requiredDocuments: ['Child Birth Certificate / Aadhaar', 'School Health Card / Immunization Record'],
        officialUrl: 'https://uwin.mohfw.gov.in',
        portalName: 'U-WIN Immunization Portal',
        category: 'Pediatric Care'
      }
    ],

    // AI Agents Registry & Health Status
    agents: [
      {
        id: 'agent_coord',
        name: 'Health Coordinator Agent',
        role: 'Central Dispatcher & Synthesis Engine',
        status: 'online',
        latency: '82 ms',
        icon: 'cpu',
        color: 'indigo',
        tasksCompleted: 142,
        description: 'Interprets user intent, decomposes multi-faceted healthcare inquiries, dispatches tasks to specialized agents, and merges final outputs with safety oversight.'
      },
      {
        id: 'agent_assess',
        name: 'Health Assessment Agent',
        role: 'Symptom Triage & Clarification',
        status: 'online',
        latency: '115 ms',
        icon: 'activity',
        color: 'blue',
        tasksCompleted: 89,
        description: 'Explores user-described symptoms, asks structured follow-up questions, gauges non-clinical urgency, and outlines informative discussion topics for doctors.'
      },
      {
        id: 'agent_report',
        name: 'Medical Report Agent',
        role: 'Diagnostic OCR & Lab Analyzer',
        status: 'online',
        latency: '145 ms',
        icon: 'file-text',
        color: 'teal',
        tasksCompleted: 64,
        description: 'Parses blood panels and diagnostic files, translates clinical jargon into layman terminology, detects out-of-range parameters, and prepares doctor inquiries.'
      },
      {
        id: 'agent_med',
        name: 'Medication Agent',
        role: 'Rx Schedule & Adherence Guardian',
        status: 'online',
        latency: '95 ms',
        icon: 'pill',
        color: 'emerald',
        tasksCompleted: 112,
        description: 'Tracks family dosage schedules, monitors adherence rates, flags duplicate entries, sends refill warnings, and ensures adherence to physician instructions.'
      },
      {
        id: 'agent_wellness',
        name: 'Family Wellness Agent',
        role: 'Preventive Care & Milestone Tracker',
        status: 'online',
        latency: '105 ms',
        icon: 'heart',
        color: 'rose',
        tasksCompleted: 78,
        description: 'Maintains pediatric immunization milestones, geriatric checkup cadence, dental/ophthalmic routines, and alerts the family to impending health tasks.'
      },
      {
        id: 'agent_welfare',
        name: 'Welfare Scheme Agent',
        role: 'Public Health & Benefit Matcher',
        status: 'online',
        latency: '130 ms',
        icon: 'shield-check',
        color: 'amber',
        tasksCompleted: 53,
        description: 'Scans verified government and community welfare programs, matches family demographics, details necessary documentation, and guides users to official portals.'
      },
      {
        id: 'agent_safety',
        name: 'Emergency Safety Agent',
        role: 'Critical Watchdog & Triage Protocol',
        status: 'online',
        latency: '42 ms',
        icon: 'alert-triangle',
        color: 'red',
        tasksCompleted: 156,
        description: 'Highest-priority background watcher. Scans all inputs and agent outputs for red-flag emergency symptoms (cardiac, respiratory, neuro), immediately tripping SOS alert protocols.'
      },
      {
        id: 'agent_summary',
        name: 'Health Summary Agent',
        role: 'Action Planner & Report Synthesizer',
        status: 'online',
        latency: '120 ms',
        icon: 'clipboard-list',
        color: 'cyan',
        tasksCompleted: 96,
        description: 'Aggregates multi-agent discoveries into concise, actionable family summaries, highlight cards, and non-diagnostic doctor consultation guides.'
      }
    ],

    // Agent Activity Live Event Log
    agentLogs: [
      { id: 'log_01', timestamp: '13:40:12', agent: 'Emergency Safety Agent', action: 'Background keyword monitor idle. 0 acute flags detected.', status: 'nominal', latency: '38ms' },
      { id: 'log_02', timestamp: '13:38:50', agent: 'Medical Report Agent', action: 'OCR extraction completed for Ramesh Sharma (CBC Blood Test). Flagged Hb 10.2 g/dL.', status: 'completed', latency: '142ms' },
      { id: 'log_03', timestamp: '13:35:22', agent: 'Medication Agent', action: 'Morning dose marked taken: Metformin 500mg (Ramesh) & Levothyroxine 50mcg (Priya).', status: 'completed', latency: '85ms' },
      { id: 'log_04', timestamp: '13:30:00', agent: 'Health Coordinator Agent', action: 'Dispatched preventive check schedule check to Family Wellness Agent.', status: 'completed', latency: '79ms' },
      { id: 'log_05', timestamp: '13:15:10', agent: 'Welfare Scheme Agent', action: 'Indexed 5 active public health programs for Karnataka state region.', status: 'completed', latency: '110ms' }
    ],

    // Chat Messages
    chatMessages: [
      {
        id: 'msg_01',
        sender: 'agent',
        agentName: 'Health Coordinator Agent',
        timestamp: '13:30 PM',
        text: 'Hello Divya! I am the **CareBridge Health Coordinator Agent**. Together with our 7 specialized AI agents, I am here to help your family organize medical reports, track medications, understand wellness milestones, and discover relevant welfare programs.\n\nHow can our agent team assist your family today?',
        agentsInvolved: ['Health Coordinator Agent', 'Family Wellness Agent'],
        structuredData: {
          type: 'welcome',
          quickActions: [
            'Explain grandfather’s CBC blood test report',
            'Show upcoming medications for today',
            'Find senior citizen welfare schemes for Ramesh',
            'What questions should we ask Dr. Arvind Rao?'
          ]
        }
      }
    ],

    // Notifications
    notifications: [
      { id: 'notif_01', type: 'medication', title: 'Medication Due', message: 'Omega-3 Fish Oil scheduled for Divya at 08:00 AM.', time: '10 mins ago', read: false, icon: 'pill', color: 'blue' },
      { id: 'notif_02', type: 'report', title: 'Lab Analysis Ready', message: 'CBC report for Ramesh Sharma has 3 suggested doctor discussion points.', time: '1 hour ago', read: false, icon: 'file-text', color: 'teal' },
      { id: 'notif_03', type: 'appointment', title: 'Upcoming Doctor Visit', message: 'Dr. V. K. Nambiar consultation for Ramesh on Sep 12, 2026.', time: '4 hours ago', read: true, icon: 'calendar', color: 'purple' },
      { id: 'notif_04', type: 'welfare', title: 'Welfare Scheme Match', message: '2 potential schemes identified for senior citizen healthcare coverage.', time: 'Yesterday', read: true, icon: 'gift', color: 'amber' }
    ],

    // Emergency Contacts
    emergencyContacts: [
      { name: 'National Emergency Helpline', number: '112', type: 'Police / Fire / All-in-One' },
      { name: 'National Ambulance Service', number: '108', type: 'Emergency Medical Service' },
      { name: 'Senior Citizen National Helpline', number: '14567', type: 'Elder Care & Welfare' },
      { name: 'National Poison Information Centre', number: '1800-116-117', type: 'Toxicology & Poison Control' },
      { name: 'Manipal Emergency Trauma Care', number: '+91 80 2502 4444', type: 'Primary Family Hospital' }
    ]
  };

  class Store {
    constructor() {
      this.state = this.loadState();
      this.listeners = [];
    }

    loadState() {
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          // Merge with default state in case new keys were added
          return { ...defaultState, ...parsed };
        }
      } catch (e) {
        console.warn('Failed to parse cached state, falling back to default:', e);
      }
      return JSON.parse(JSON.stringify(defaultState));
    }

    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.warn('Failed to persist state:', e);
      }
      this.notify();
    }

    getState() {
      return this.state;
    }

    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }

    notify() {
      this.listeners.forEach(listener => listener(this.state));
    }

    // Actions
    setView(viewName) {
      this.state.activeView = viewName;
      this.saveState();
    }

    setActiveMember(memberId) {
      this.state.activeMemberId = memberId;
      this.saveState();
    }

    setPresentationSlide(slideIndex) {
      this.state.presentationSlide = slideIndex;
      this.saveState();
    }

    toggleMedicationStatus(medId) {
      const med = this.state.medications.find(m => m.id === medId);
      if (med) {
        med.status = med.status === 'taken' ? 'pending' : 'taken';
        // Add log
        this.addAgentLog('Medication Agent', `Medication "${med.name}" status updated to ${med.status.toUpperCase()}.`, 'completed', '75ms');
        this.saveState();
      }
    }

    addMedication(newMed) {
      this.state.medications.unshift({
        id: 'med_' + Date.now(),
        status: 'pending',
        streakDays: 1,
        refillDaysLeft: 30,
        ...newMed
      });
      this.addAgentLog('Medication Agent', `Registered new medication "${newMed.name}" for ${this.getMemberName(newMed.memberId)}.`, 'completed', '85ms');
      this.saveState();
    }

    addFamilyMember(newMember) {
      const id = 'mem_' + Date.now();
      this.state.familyMembers.push({
        id,
        healthScore: 88,
        adherenceRate: 100,
        status: 'Healthy',
        vitals: { bp: '120/80 mmHg', pulse: '74 bpm', spo2: '99%', weight: '65 kg', bmi: '22.0' },
        ...newMember
      });
      this.addAgentLog('Family Wellness Agent', `Enrolled new family member "${newMember.name}" into wellness register.`, 'completed', '90ms');
      this.saveState();
    }

    addMedicalReport(newReport) {
      this.state.medicalReports.unshift({
        id: 'rep_' + Date.now(),
        reportDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Analyzed by Medical Report Agent',
        ...newReport
      });
      this.addTimelineEvent({
        memberId: newReport.memberId,
        memberName: newReport.memberName,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: `${newReport.reportTitle} Uploaded`,
        category: 'Lab Report',
        categoryColor: 'teal',
        icon: 'file-text',
        description: newReport.summary,
        badge: 'Medical Report Agent'
      });
      this.addAgentLog('Medical Report Agent', `Completed OCR extraction and lab range review for "${newReport.reportTitle}".`, 'completed', '135ms');
      this.saveState();
    }

    addTimelineEvent(event) {
      this.state.timeline.unshift({
        id: 'tl_' + Date.now(),
        ...event
      });
      this.saveState();
    }

    addChatMessage(msg) {
      this.state.chatMessages.push({
        id: 'msg_' + Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...msg
      });
      this.saveState();
    }

    addAgentLog(agent, action, status = 'completed', latency = '80ms') {
      this.state.agentLogs.unshift({
        id: 'log_' + Date.now() + Math.random().toString(36).substring(2, 5),
        timestamp: new Date().toLocaleTimeString(),
        agent,
        action,
        status,
        latency
      });
      // Limit to 50 logs in memory
      if (this.state.agentLogs.length > 50) {
        this.state.agentLogs.pop();
      }
      this.saveState();
    }

    triggerEmergency(message) {
      this.state.emergencyActive = true;
      this.state.emergencyMessage = message || 'POTENTIAL MEDICAL EMERGENCY DETECTED: Symptoms require urgent professional clinical evaluation.';
      this.addAgentLog('Emergency Safety Agent', `CRITICAL INTERCEPT: Triggered emergency safety protocol. Reason: ${this.state.emergencyMessage}`, 'critical', '32ms');
      this.saveState();
    }

    clearEmergency() {
      this.state.emergencyActive = false;
      this.state.emergencyMessage = null;
      this.addAgentLog('Emergency Safety Agent', 'Emergency alert acknowledged and dismissed by family administrator.', 'completed', '40ms');
      this.saveState();
    }

    markAllNotificationsRead() {
      this.state.notifications.forEach(n => n.read = true);
      this.saveState();
    }

    resetToDemoData() {
      this.state = JSON.parse(JSON.stringify(defaultState));
      this.saveState();
    }

    getMember(memberId) {
      return this.state.familyMembers.find(m => m.id === memberId) || this.state.familyMembers[0];
    }

    getMemberName(memberId) {
      const m = this.getMember(memberId);
      return m ? m.name : 'Family Member';
    }

    getActiveMember() {
      return this.getMember(this.state.activeMemberId);
    }
  }

  window.CareBridgeStore = new Store();
})(window);
