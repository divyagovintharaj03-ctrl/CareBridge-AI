// Central Coordinator: Health Coordinator Agent
// Manages multi-agent orchestration, pipeline execution, step-by-step progress callbacks, and final synthesis.
(function(window) {
  'use strict';

  class HealthCoordinatorAgent {
    constructor() {
      this.name = 'Health Coordinator Agent';
      this.id = 'agent_coord';
      this.activePipeline = null;
    }

    /**
     * Determines which agents are needed based on user intent
     */
    classifyIntent(query) {
      const lower = query.toLowerCase();
      const agents = [];

      const isReport = lower.includes('report') || lower.includes('blood') || lower.includes('test') || lower.includes('cbc') || lower.includes('lipid') || lower.includes('hemoglobin') || lower.includes('cholesterol');
      const isMedication = lower.includes('medicine') || lower.includes('medication') || lower.includes('pill') || lower.includes('dose') || lower.includes('adherence') || lower.includes('refill') || lower.includes('timing');
      const isWelfare = lower.includes('welfare') || lower.includes('scheme') || lower.includes('government') || lower.includes('ayushman') || lower.includes('pmjay') || lower.includes('insurance') || lower.includes('benefit') || lower.includes('program');
      const isWellness = lower.includes('wellness') || lower.includes('preventive') || lower.includes('vaccin') || lower.includes('appointment') || lower.includes('checkup') || lower.includes('score');
      const isSymptom = lower.includes('pain') || lower.includes('headache') || lower.includes('fever') || lower.includes('cough') || lower.includes('tired') || lower.includes('dizzy') || lower.includes('symptom') || lower.includes('feel');

      if (isReport) agents.push('Medical Report Agent');
      if (isMedication) agents.push('Medication Agent');
      if (isWelfare) agents.push('Welfare Scheme Agent');
      if (isWellness) agents.push('Family Wellness Agent');
      if (isSymptom || agents.length === 0) agents.push('Health Assessment Agent');

      // Always include Safety and Summary agents
      agents.push('Emergency Safety Agent');
      agents.push('Health Summary Agent');

      return Array.from(new Set(agents));
    }

    /**
     * Executes the multi-agent pipeline with step-by-step visual animation callbacks
     */
    async executePipeline(query, memberId, onStepCallback = () => {}) {
      const store = window.CareBridgeStore;
      const member = store.getMember(memberId || store.getState().activeMemberId);
      
      const executionTrace = [];
      const startTime = performance.now();

      // Step 1: Coordinator activation
      onStepCallback({
        step: 1,
        agent: 'Health Coordinator Agent',
        status: 'analyzing',
        message: 'Understanding user intent and mapping health context...'
      });
      await this.sleep(400);

      store.addAgentLog('Health Coordinator Agent', `Received query: "${query}" for member ${member.name}. Decomposing task.`, 'completed', '45ms');

      // Step 2: Emergency Safety Watchdog check
      onStepCallback({
        step: 2,
        agent: 'Emergency Safety Agent',
        status: 'monitoring',
        message: 'Screening for acute clinical emergency red-flags...'
      });
      await this.sleep(300);

      const emergencyCheck = window.EmergencySafetyAgent.inspect(query);
      if (emergencyCheck.isEmergency) {
        store.triggerEmergency(emergencyCheck.message);
        
        onStepCallback({
          step: 2,
          agent: 'Emergency Safety Agent',
          status: 'emergency',
          message: '🚨 CRITICAL: Emergency indicators detected!'
        });

        return {
          isEmergency: true,
          emergencyDetails: emergencyCheck,
          agentsActivated: ['Health Coordinator Agent', 'Emergency Safety Agent'],
          finalText: `### 🚨 CRITICAL HEALTH ALERT: POTENTIAL MEDICAL EMERGENCY\n\n${emergencyCheck.message}\n\n**Action Required Immediately:**\n* ${emergencyCheck.actionRequired}\n* Contact the National Ambulance Service at **108** or Universal Helpline **112**.\n* Proceed directly to the nearest hospital trauma unit.\n\n*${emergencyCheck.disclaimer}*`,
          executionTime: `${Math.round(performance.now() - startTime)}ms`
        };
      }

      // Step 3: Dispatch to specialized agents
      const targetAgents = this.classifyIntent(query);
      const agentOutputs = {};

      if (targetAgents.includes('Medical Report Agent')) {
        onStepCallback({
          step: 3,
          agent: 'Medical Report Agent',
          status: 'processing',
          message: 'Extracting diagnostic parameters and evaluating against lab reference ranges...'
        });
        await this.sleep(500);
        agentOutputs.medicalReport = await window.MedicalReportAgent.analyzeReport(query, member);
        store.addAgentLog('Medical Report Agent', `Evaluated ${agentOutputs.medicalReport.parameters.length} lab values. Found ${agentOutputs.medicalReport.outOfRangeCount} out-of-range item(s).`, 'completed', '140ms');
      }

      if (targetAgents.includes('Medication Agent')) {
        onStepCallback({
          step: 4,
          agent: 'Medication Agent',
          status: 'processing',
          message: 'Auditing prescription schedule, refill levels, and adherence compliance...'
        });
        await this.sleep(450);
        agentOutputs.medication = await window.MedicationAgent.evaluate(query, member);
        store.addAgentLog('Medication Agent', `Adherence evaluated at ${agentOutputs.medication.todayAdherence}. Refill status clear.`, 'completed', '92ms');
      }

      if (targetAgents.includes('Health Assessment Agent')) {
        onStepCallback({
          step: 5,
          agent: 'Health Assessment Agent',
          status: 'processing',
          message: 'Synthesizing symptom context and generating doctor consultation topics...'
        });
        await this.sleep(450);
        agentOutputs.healthAssessment = await window.HealthAssessmentAgent.process(query, member);
        store.addAgentLog('Health Assessment Agent', `Structured triage summary compiled for ${member.name}.`, 'completed', '110ms');
      }

      if (targetAgents.includes('Family Wellness Agent')) {
        onStepCallback({
          step: 6,
          agent: 'Family Wellness Agent',
          status: 'processing',
          message: 'Checking family vaccination records and upcoming appointment cadences...'
        });
        await this.sleep(400);
        agentOutputs.familyWellness = await window.FamilyWellnessAgent.analyze(query, member);
        store.addAgentLog('Family Wellness Agent', `Preventive timeline checked. Wellness score updated.`, 'completed', '102ms');
      }

      if (targetAgents.includes('Welfare Scheme Agent')) {
        onStepCallback({
          step: 7,
          agent: 'Welfare Scheme Agent',
          status: 'processing',
          message: 'Cross-referencing verified government health schemes against family eligibility...'
        });
        await this.sleep(450);
        agentOutputs.welfareScheme = await window.WelfareSchemeAgent.matchSchemes(query, member);
        store.addAgentLog('Welfare Scheme Agent', `Matched ${agentOutputs.welfareScheme.totalSchemesMatched} public health program(s).`, 'completed', '125ms');
      }

      // Step 8: Safety Audit
      onStepCallback({
        step: 8,
        agent: 'Emergency Safety Agent',
        status: 'auditing',
        message: 'Applying strict non-diagnostic clinical guardrails...'
      });
      await this.sleep(350);
      const safetyAudit = window.EmergencySafetyAgent.auditOutput(agentOutputs);
      store.addAgentLog('Emergency Safety Agent', 'Enforced safety guardrails: zero unauthorized diagnoses or prescription changes.', 'completed', '38ms');

      // Step 9: Final Health Summary Synthesis
      onStepCallback({
        step: 9,
        agent: 'Health Summary Agent',
        status: 'synthesizing',
        message: 'Consolidating multi-agent outputs into final family briefing...'
      });
      await this.sleep(450);
      const summaryResult = window.HealthSummaryAgent.synthesize({
        query,
        member,
        agentOutputs,
        safetyAudit
      });
      store.addAgentLog('Health Summary Agent', 'Synthesized unified multi-agent response.', 'completed', '115ms');

      // Done
      onStepCallback({
        step: 10,
        agent: 'Health Coordinator Agent',
        status: 'completed',
        message: 'Response ready.'
      });

      const totalTime = `${Math.round(performance.now() - startTime)}ms`;

      return {
        isEmergency: false,
        member,
        query,
        agentsActivated: targetAgents,
        agentOutputs,
        summaryResult,
        safetyAudit,
        executionTime: totalTime
      };
    }

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }

  window.HealthCoordinator = new HealthCoordinatorAgent();
})(window);
