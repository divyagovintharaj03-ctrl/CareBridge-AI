// Agent 1: Health Assessment Agent
// Analyzes symptoms, asks clarifying follow-up questions, gauges urgency, produces non-diagnostic discussion topics.
(function(window) {
  'use strict';

  const HealthAssessmentAgent = {
    name: 'Health Assessment Agent',
    id: 'agent_assess',

    async process(query, member) {
      const lower = query.toLowerCase();

      let urgency = 'Routine / Educational';
      let followUpQuestions = [
        'How long have you or your family member noticed these symptoms?',
        'Are there any associated factors such as exertion, meals, or rest that make it better or worse?',
        'Has this been evaluated previously by your primary care doctor?'
      ];
      let doctorDiscussionTopics = [
        'Review the onset timeline and severity pattern with your physician.',
        'Discuss whether baseline blood tests or physical examinations are advisable.'
      ];
      let observations = [];

      if (lower.includes('headache') || lower.includes('migraine')) {
        observations.push('Headache symptoms noted. Tracking frequency, hydration, sleep quality, and screen time can provide helpful context for your doctor.');
        followUpQuestions = [
          'Is the headache accompanied by visual disturbances, nausea, or neck stiffness?',
          'Does it occur more frequently at specific times of the day?'
        ];
        doctorDiscussionTopics = [
          'Ask if a tension headache or migraine protocol is suitable.',
          'Discuss if over-the-counter pain relievers are safe with your current medication regimen.'
        ];
      } else if (lower.includes('fever') || lower.includes('temperature') || lower.includes('cold') || lower.includes('cough')) {
        observations.push('Respiratory or febrile symptoms observed. Monitoring body temperature with a digital thermometer twice daily is recommended.');
        urgency = 'Moderate / Monitor Closely';
        followUpQuestions = [
          'What is the highest recorded oral temperature in degrees Celsius or Fahrenheit?',
          'Is the cough productive (with phlegm/mucus) or dry?'
        ];
        doctorDiscussionTopics = [
          'Ask whether a rapid viral panel or throat swab is recommended.',
          'Check if hydration and steam inhalation are sufficient for home comfort.'
        ];
      } else if (lower.includes('fatigue') || lower.includes('tired') || lower.includes('weakness') || lower.includes('dizzy')) {
        observations.push('Generalized fatigue noted. For senior family members, low hemoglobin (anemia), blood pressure shifts, or vitamin D/B12 deficiency are common discussion points.');
        followUpQuestions = [
          'Do you feel lightheaded when standing up abruptly from a seated position?',
          'Has there been any unintentional weight loss or changes in appetite?'
        ];
        doctorDiscussionTopics = [
          'Request a Complete Blood Count (CBC) and Iron profile review.',
          'Check whether current blood pressure or diabetic medications require dosage review.'
        ];
      } else {
        observations.push('General health inquiry received. Contextualizing based on member age and active health profile.');
      }

      return {
        agent: 'Health Assessment Agent',
        status: 'completed',
        urgency,
        observations,
        followUpQuestions,
        doctorDiscussionTopics,
        summary: `Assessed symptom context for ${member.name}. Provided structured follow-up questions and clinician discussion topics without offering medical diagnosis.`
      };
    }
  };

  window.HealthAssessmentAgent = HealthAssessmentAgent;
})(window);
