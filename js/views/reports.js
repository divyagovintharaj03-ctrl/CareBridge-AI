// View 6: Medical Reports Uploader & Lab Analyzer
(function(window) {
  'use strict';

  let isAnalyzingReport = false;
  let activeProcessingStep = 0; // 0 to 5

  const ReportsView = {
    render() {
      const state = window.CareBridgeStore.getState();
      const reports = state.medicalReports;

      return `
        <div class="space-y-8 animate-fadeIn">
          <!-- Header -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 class="text-3xl font-black text-slate-900 tracking-tight">Medical Reports & Diagnostic Center</h1>
              <p class="text-xs text-slate-500 mt-1">Upload blood tests, pathology panels, and scans for instant multi-agent reference range extraction.</p>
            </div>
          </div>

          <!-- Drag & Drop Upload Card -->
          <div class="health-card p-8 bg-white border-2 border-dashed border-teal-300 hover:border-teal-500 transition text-center relative overflow-hidden">
            <div class="max-w-md mx-auto">
              <div class="w-16 h-16 rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                📄
              </div>
              <h3 class="text-lg font-black text-slate-900">Upload Diagnostic Medical Report</h3>
              <p class="text-xs text-slate-500 mt-1">Drag & drop your lab report (PDF, JPG, PNG) or select from device.</p>
              
              <div class="mt-6 flex flex-wrap justify-center gap-3">
                <label class="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow cursor-pointer transition">
                  <span>Browse Document Files</span>
                  <input type="file" class="hidden" accept=".pdf,.png,.jpg,.jpeg" onchange="ReportsView.handleFileUpload(event)" />
                </label>
              </div>

              <!-- Fast Test Sample Reports -->
              <div class="mt-8 pt-6 border-t border-slate-100 text-left">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">Or simulate with a sample lab report:</span>
                <div class="flex flex-wrap justify-center gap-2">
                  <button onclick="ReportsView.simulatePreloadedUpload('cbc')" class="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold hover:bg-teal-100 transition">
                    🩸 Ramesh: CBC & Iron Profile (Anemia)
                  </button>
                  <button onclick="ReportsView.simulatePreloadedUpload('lipid')" class="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 text-xs font-semibold hover:bg-sky-100 transition">
                    🧪 Divya: Lipid & Metabolic Panel
                  </button>
                  <button onclick="ReportsView.simulatePreloadedUpload('thyroid')" class="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 text-xs font-semibold hover:bg-purple-100 transition">
                    🦋 Priya: Thyroid Function (TSH/T3/T4)
                  </button>
                </div>
              </div>
            </div>

            <!-- Processing Pipeline Overlay -->
            ${isAnalyzingReport ? `
              <div class="absolute inset-0 bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-white animate-fadeIn">
                <div class="w-12 h-12 rounded-2xl bg-teal-500 text-slate-900 font-bold flex items-center justify-center text-xl animate-spin mb-4">
                  ⚙️
                </div>
                <h4 class="text-base font-black uppercase tracking-wider text-teal-400">Multi-Agent Document Processing</h4>
                <div class="mt-6 max-w-sm w-full space-y-2 text-xs font-mono">
                  <div class="flex items-center justify-between p-2 rounded bg-white/10 ${activeProcessingStep >= 1 ? 'text-emerald-400 font-bold' : 'text-slate-400'}">
                    <span>1. Upload complete</span>
                    <span>${activeProcessingStep >= 1 ? '✓' : '...'}</span>
                  </div>
                  <div class="flex items-center justify-between p-2 rounded bg-white/10 ${activeProcessingStep >= 2 ? 'text-emerald-400 font-bold' : 'text-slate-400'}">
                    <span>2. OCR & parameter extraction</span>
                    <span>${activeProcessingStep >= 2 ? '✓' : '...'}</span>
                  </div>
                  <div class="flex items-center justify-between p-2 rounded bg-white/10 ${activeProcessingStep >= 3 ? 'text-emerald-400 font-bold' : 'text-slate-400'}">
                    <span>3. Medical Report Agent analysis</span>
                    <span>${activeProcessingStep >= 3 ? '✓' : '...'}</span>
                  </div>
                  <div class="flex items-center justify-between p-2 rounded bg-white/10 ${activeProcessingStep >= 4 ? 'text-emerald-400 font-bold' : 'text-slate-400'}">
                    <span>4. Safety & guardrail review</span>
                    <span>${activeProcessingStep >= 4 ? '✓' : '...'}</span>
                  </div>
                  <div class="flex items-center justify-between p-2 rounded bg-white/10 ${activeProcessingStep >= 5 ? 'text-emerald-400 font-bold' : 'text-slate-400'}">
                    <span>5. Doctor questions generated</span>
                    <span>${activeProcessingStep >= 5 ? '✓' : '...'}</span>
                  </div>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Uploaded / Analyzed Reports List -->
          <div class="space-y-6">
            <h3 class="text-xl font-black text-slate-900">Analyzed Family Reports (${reports.length})</h3>

            ${reports.map(report => `
              <div class="health-card p-6 sm:p-8 bg-white shadow-lg space-y-6">
                <!-- Report Top Details -->
                <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-5 border-b border-slate-200">
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                        ${report.testType}
                      </span>
                      <span class="text-xs text-slate-500 font-medium">• ${report.reportDate}</span>
                    </div>
                    <h3 class="text-2xl font-black text-slate-900">${report.reportTitle}</h3>
                    <p class="text-xs text-slate-500 mt-1">
                      Patient: <strong class="text-slate-900">${report.memberName}</strong> • Diagnostic Lab: <strong>${report.labName}</strong>
                    </p>
                  </div>

                  <div class="flex items-center gap-2">
                    <button onclick="CareBridgeStore.setActiveMember('${report.memberId}'); CareBridgeStore.setView('assistant');" class="px-3.5 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 font-bold text-xs transition flex items-center gap-1.5">
                      <span>🧠 Discuss with Agent</span>
                    </button>
                  </div>
                </div>

                <!-- AI Plain English Summary -->
                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <div class="flex items-center gap-2 font-bold text-slate-900 mb-1.5 text-xs uppercase tracking-wider">
                    <span>🤖</span> Medical Report Agent Findings:
                  </div>
                  <p>${report.summary}</p>
                </div>

                <!-- Interactive Parameter Breakdown with Gauge Bars -->
                <div>
                  <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Extracted Diagnostic Parameters</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${report.parameters.map(param => `
                      <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                        <div class="flex items-center justify-between">
                          <span class="font-bold text-xs text-slate-900">${param.name}</span>
                          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${param.status === 'normal' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : param.status === 'low' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-red-50 text-red-800 border border-red-200'}">
                            ${param.status === 'normal' ? 'Normal Range' : param.status === 'low' ? '▼ Low' : '▲ High'}
                          </span>
                        </div>
                        <div class="flex items-baseline justify-between text-xs">
                          <span class="text-lg font-black text-slate-900 font-mono">${param.value} <span class="text-xs font-normal text-slate-500">${param.unit}</span></span>
                          <span class="text-[11px] text-slate-500">Ref: <strong>${param.refRange}</strong></span>
                        </div>
                        <!-- Range Indicator Bar -->
                        <div class="range-bar w-full">
                          <div class="range-pointer" style="left: ${param.percentOfMax || 50}%" title="${param.value} ${param.unit}"></div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- Questions for Doctor Box -->
                <div class="p-5 rounded-2xl bg-teal-50/70 border border-teal-200 text-teal-950 space-y-2">
                  <h4 class="font-black text-xs uppercase tracking-wider text-teal-900 flex items-center gap-2">
                    <span>🩺</span> Questions Prepared for Your Next Doctor Appointment:
                  </h4>
                  <ul class="list-disc list-inside space-y-1 text-xs text-teal-900">
                    ${report.questionsForDoctor.map(q => `<li>${q}</li>`).join('')}
                  </ul>
                </div>

                <!-- Disclaimer Footer -->
                <div class="p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-[11px] text-amber-900 italic">
                  <strong>Disclaimer:</strong> ${report.safetyNotes || 'This AI-generated explanation is for informational and organizational purposes only and is not a medical diagnosis.'}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    handleFileUpload(e) {
      const file = e.target.files[0];
      if (!file) return;
      this.simulateAnalysis(file.name.replace(/\.[^/.]+$/, ''));
    },

    simulatePreloadedUpload(type) {
      const titles = {
        cbc: 'Complete Blood Count & Iron Panel',
        lipid: 'Comprehensive Lipid & Metabolic Profile',
        thyroid: 'Thyroid Function Ultra-Sensitive Panel'
      };
      this.simulateAnalysis(titles[type] || 'Diagnostic Lab Panel');
    },

    async simulateAnalysis(reportTitle) {
      isAnalyzingReport = true;
      activeProcessingStep = 1;
      window.App.renderCurrentView();

      for (let s = 2; s <= 5; s++) {
        await new Promise(r => setTimeout(r, 450));
        activeProcessingStep = s;
        window.App.renderCurrentView();
      }

      await new Promise(r => setTimeout(r, 400));
      isAnalyzingReport = false;
      activeProcessingStep = 0;

      NotificationUtil.playChime();
      NotificationUtil.showToast('Report Analyzed', `Medical Report Agent extracted lab parameters for "${reportTitle}".`, 'success');
      window.App.renderCurrentView();
    }
  };

  window.ReportsView = ReportsView;
})(window);
