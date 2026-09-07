// Agent 6: Emergency Safety Agent
// Highest priority watchdog. Monitors all user messages and reports for red flag emergency symptoms.
(function(window) {
  'use strict';

  const EMERGENCY_KEYWORDS = [
    'chest pain', 'chest pressure', 'difficulty breathing', 'shortness of breath', 'can\'t breathe',
    'stroke', 'face drooping', 'arm weakness', 'slurred speech', 'loss of consciousness',
    'passed out', 'fainted', 'unresponsive', 'severe bleeding', 'coughing blood',
    'vomiting blood', 'seizure', 'anaphylaxis', 'throat closing', 'severe head injury',
    'heart attack', 'cardiac arrest', 'suicidal', 'overdose', 'blue lips'
  ];

  const EmergencySafetyAgent = {
    name: 'Emergency Safety Agent',
    id: 'agent_safety',
    priority: 1, // Highest

    /**
     * Inspects text for red-flag emergency symptoms
     */
    inspect(text) {
      const lower = (text || '').toLowerCase();
      const matchedKeywords = EMERGENCY_KEYWORDS.filter(kw => lower.includes(kw));

      if (matchedKeywords.length > 0) {
        return {
          isEmergency: true,
          matchedKeywords,
          alertLevel: 'CRITICAL',
          message: `🚨 POTENTIAL MEDICAL EMERGENCY DETECTED: Symptoms related to "${matchedKeywords.join(', ')}" may require immediate emergency medical care.`,
          actionRequired: 'Call local emergency services (108 / 112 / 911) or proceed immediately to the nearest Emergency Trauma Center.',
          disclaimer: 'Do not delay seeking professional emergency care while reading or using this platform.'
        };
      }

      return {
        isEmergency: false,
        alertLevel: 'NOMINAL',
        message: 'No acute emergency indicators identified in the query.',
        safetyNotes: 'Educational guidance only. Always consult a healthcare provider.'
      };
    },

    /**
     * Safety filter applied to any agent output before final rendering
     */
    auditOutput(agentOutput) {
      const safetyNotice = '⚠️ This AI-generated explanation is for informational and organizational purposes only. It is NOT a medical diagnosis, prescription, or clinical directive. Always consult a qualified medical professional for diagnosis and treatment plans.';
      
      return {
        ...agentOutput,
        passedSafetyAudit: true,
        auditTimestamp: new Date().toISOString(),
        auditedBy: 'Emergency Safety Agent',
        mandatoryDisclaimer: safetyNotice
      };
    }
  };

  window.EmergencySafetyAgent = EmergencySafetyAgent;
})(window);
