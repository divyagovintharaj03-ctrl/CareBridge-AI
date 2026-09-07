// CareBridge AI - Hackathon Demo Scenarios Engine
(function(window) {
  'use strict';

  const DemoScenarios = {
    scenarios: [
      {
        id: 'scenario_blood_report',
        name: '🎯 Scenario 1: Blood Test Report Analysis (Hackathon Primary)',
        subtitle: 'Multi-Agent OCR Extraction & Doctor Consultation Preparation',
        memberId: 'mem_03',
        memberName: 'Ramesh Sharma (Grandfather, 68)',
        query: 'Can you explain my grandfather Ramesh’s CBC blood report and tell me what questions we should ask Dr. Nambiar?',
        description: 'Simulates diagnostic parsing, lab range evaluation (Hb 10.2 g/dL), safety guardrails, and action plan generation.',
        targetView: 'assistant'
      },
      {
        id: 'scenario_emergency',
        name: '🚨 Scenario 2: Emergency Safety Intercept',
        subtitle: 'Watchdog Protocol for Acute Cardiac / Respiratory Symptoms',
        memberId: 'mem_01',
        memberName: 'Sanjay Sharma (Father, 42)',
        query: 'I am feeling severe crushing chest pain and shortness of breath since 10 minutes.',
        description: 'Demonstrates real-time safety intercept, emergency modal trip, and local hospital helpline dispatch.',
        targetView: 'assistant'
      },
      {
        id: 'scenario_welfare',
        name: '🏛️ Scenario 3: Senior Citizen Welfare Scheme Match',
        subtitle: 'Public Health Benefit & Healthcare Insurance Discovery',
        memberId: 'mem_03',
        memberName: 'Ramesh Sharma (Grandfather, 68)',
        query: 'Find government welfare schemes and health insurance programs that Ramesh is eligible for.',
        description: 'Demonstrates Welfare Scheme Agent matching PM-JAY, Rashtriya Vayoshri Yojana, and document checklists.',
        targetView: 'welfare'
      },
      {
        id: 'scenario_medication',
        name: '💊 Scenario 4: Family Medication Adherence & Refills',
        subtitle: 'Prescription Schedule & Low-Supply Alerts',
        memberId: 'mem_01',
        memberName: 'All Family Members',
        query: 'Check our family medication schedule and adherence for today.',
        description: 'Displays multi-member pill timings (8 AM / 1 PM / 8 PM) and interactive adherence checkmarks.',
        targetView: 'medications'
      }
    ],

    async runScenario(scenarioId) {
      const scenario = this.scenarios.find(s => s.id === scenarioId) || this.scenarios[0];
      const store = window.CareBridgeStore;

      // Switch active member
      store.setActiveMember(scenario.memberId);
      
      // Navigate to target view
      store.setView(scenario.targetView);

      // Play chime
      window.NotificationUtil.playChime();
      window.NotificationUtil.showToast('Hackathon Demo Mode', `Running ${scenario.name}...`, 'info');

      if (scenario.targetView === 'assistant') {
        const chatInput = document.getElementById('chat-input-field');
        if (chatInput) {
          chatInput.value = scenario.query;
          const submitBtn = document.getElementById('chat-send-btn');
          if (submitBtn) {
            submitBtn.click();
          }
        }
      }
    }
  };

  window.DemoScenarios = DemoScenarios;
})(window);
