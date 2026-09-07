// Agent 7: Health Summary Agent
// Synthesizes individual agent outputs into an integrated, clear, actionable family health briefing.
(function(window) {
  'use strict';

  const HealthSummaryAgent = {
    name: 'Health Summary Agent',
    id: 'agent_summary',

    synthesize({ query, member, agentOutputs, safetyAudit }) {
      const actionablePoints = [];
      const doctorDiscussionList = [];

      // Extract details from agent outputs
      if (agentOutputs.medicalReport) {
        actionablePoints.push(`Lab Review: ${agentOutputs.medicalReport.outOfRangeCount} out-of-range indicator(s) noted for discussion.`);
        doctorDiscussionList.push(...(agentOutputs.medicalReport.questionsForDoctor || []));
      }

      if (agentOutputs.medication) {
        actionablePoints.push(`Medication Adherence: Current adherence is ${agentOutputs.medication.todayAdherence}. Continue adhering to prescribed times.`);
        if (agentOutputs.medication.refillWarnings && agentOutputs.medication.refillWarnings.length > 0) {
          actionablePoints.push(...agentOutputs.medication.refillWarnings);
        }
      }

      if (agentOutputs.healthAssessment) {
        actionablePoints.push(`Symptom Log: ${agentOutputs.healthAssessment.urgency} urgency profile.`);
        doctorDiscussionList.push(...(agentOutputs.healthAssessment.doctorDiscussionTopics || []));
      }

      if (agentOutputs.welfareScheme) {
        actionablePoints.push(`Welfare Opportunity: ${agentOutputs.welfareScheme.totalSchemesMatched} government health programs found with potential benefits.`);
      }

      return {
        agent: 'Health Summary Agent',
        status: 'completed',
        summaryTitle: `Integrated Action Plan for ${member.name}`,
        keyTakeaways: actionablePoints.length > 0 ? actionablePoints : ['Maintain routine healthy diet, hydration, and adherence to existing doctor plans.'],
        questionsForDoctor: Array.from(new Set(doctorDiscussionList)),
        safetyVerdict: safetyAudit.passedSafetyAudit ? 'Passed Safety Protocol' : 'Emergency Intercepted',
        disclaimer: safetyAudit.mandatoryDisclaimer
      };
    }
  };

  window.HealthSummaryAgent = HealthSummaryAgent;
})(window);
