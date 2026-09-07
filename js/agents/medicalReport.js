// Agent 2: Medical Report Agent
// Analyzes uploaded diagnostic files and lab reports, extracts values, evaluates against reference ranges, prepares questions.
(function(window) {
  'use strict';

  const MedicalReportAgent = {
    name: 'Medical Report Agent',
    id: 'agent_report',

    /**
     * Simulates OCR extraction and reference-range interpretation
     */
    async analyzeReport(reportOrQuery, member) {
      // Find matching or most recent report if query references it
      const storeState = window.CareBridgeStore.getState();
      let report = storeState.medicalReports.find(r => r.memberId === member.id) || storeState.medicalReports[0];

      const outOfRange = report.parameters.filter(p => p.status !== 'normal');
      const inRange = report.parameters.filter(p => p.status === 'normal');

      return {
        agent: 'Medical Report Agent',
        status: 'completed',
        reportTitle: report.reportTitle,
        labName: report.labName,
        reportDate: report.reportDate,
        totalParametersExtracted: report.parameters.length,
        outOfRangeCount: outOfRange.length,
        inRangeCount: inRange.length,
        parameters: report.parameters,
        outOfRangeDetails: outOfRange.map(p => ({
          parameter: p.name,
          observedValue: `${p.value} ${p.unit}`,
          referenceRange: p.refRange,
          variance: p.status === 'low' ? 'Below Reference Range' : 'Above Reference Range',
          explanation: p.status === 'low' 
            ? `The reported value is lower than the lab's normal reference band (${p.refRange} ${p.unit}).`
            : `The reported value is higher than the lab's normal reference band (${p.refRange} ${p.unit}).`
        })),
        questionsForDoctor: report.questionsForDoctor || [
          'What are the primary clinical implications of these flagged out-of-range values?',
          'Is any dietary modification or follow-up testing recommended within 3 months?'
        ],
        summary: `Medical Report Agent extracted ${report.parameters.length} parameters from "${report.reportTitle}". Identified ${outOfRange.length} parameter(s) outside standard reference boundaries.`
      };
    }
  };

  window.MedicalReportAgent = MedicalReportAgent;
})(window);
