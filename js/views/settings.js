// View 12: Settings Component
(function(window) {
  'use strict';

  const SettingsView = {
    render() {
      const state = window.CareBridgeStore.getState();

      return `
        <div class="space-y-8 animate-fadeIn max-w-4xl">
          <!-- Header -->
          <div>
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Family Health & System Settings</h1>
            <p class="text-xs text-slate-500 mt-1">Configure family administrator details, AI safety guardrail sensitivity, and demo data presets.</p>
          </div>

          <!-- Family Admin Profile -->
          <div class="health-card p-6 bg-white shadow-md space-y-4">
            <h3 class="text-base font-black text-slate-900 pb-3 border-b border-slate-100">Family Administrator Profile</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Primary Account Name</label>
                <input type="text" value="${state.user.name}" class="w-full px-3 py-2 border border-slate-300 rounded-xl" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Email</label>
                <input type="email" value="${state.user.email}" class="w-full px-3 py-2 border border-slate-300 rounded-xl" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Primary City & State</label>
                <input type="text" value="${state.user.city}, ${state.user.state}" class="w-full px-3 py-2 border border-slate-300 rounded-xl" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Income Classification (for Welfare Matcher)</label>
                <input type="text" value="${state.user.incomeCategory}" class="w-full px-3 py-2 border border-slate-300 rounded-xl" />
              </div>
            </div>
          </div>

          <!-- AI Safety Guardrail Configuration -->
          <div class="health-card p-6 bg-white shadow-md space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 class="text-base font-black text-slate-900">Clinical Ethics & Safety Guardrails</h3>
                <p class="text-xs text-slate-500">Autonomous non-diagnostic rules verified by Emergency Safety Agent.</p>
              </div>
              <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                LOCKED STRICT
              </span>
            </div>

            <div class="space-y-3 text-xs text-slate-700">
              <label class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <strong class="text-slate-900 block">Strict Non-Diagnostic Mode</strong>
                  <span class="text-slate-500">Prohibits AI agents from formulating clinical medical diagnoses.</span>
                </div>
                <input type="checkbox" checked disabled class="rounded text-teal-600 focus:ring-teal-500 h-4 w-4" />
              </label>

              <label class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <strong class="text-slate-900 block">Prescription Modification Lock</strong>
                  <span class="text-slate-500">Disallows agents from altering or stopping drug regimens.</span>
                </div>
                <input type="checkbox" checked disabled class="rounded text-teal-600 focus:ring-teal-500 h-4 w-4" />
              </label>

              <label class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <strong class="text-slate-900 block">Real-Time Emergency Keyword Watchdog</strong>
                  <span class="text-slate-500">Immediately trips SOS alert overlay upon acute symptom recognition.</span>
                </div>
                <input type="checkbox" checked disabled class="rounded text-teal-600 focus:ring-teal-500 h-4 w-4" />
              </label>
            </div>
          </div>

          <!-- Demo Reset & Data Management -->
          <div class="health-card p-6 bg-slate-50 border border-slate-200 space-y-4">
            <h3 class="text-base font-black text-slate-900">Hackathon State Management</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Reset all medications, reports, timeline events, and logs back to the curated 4-member fictional family state.
            </p>
            <div class="flex items-center gap-3">
              <button onclick="CareBridgeStore.resetToDemoData(); NotificationUtil.showToast('Reset Complete', 'Fictional demo data restored.', 'success'); App.renderCurrentView();" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition">
                ↺ Restore Default Demo State
              </button>
            </div>
          </div>
        </div>
      `;
    }
  };

  window.SettingsView = SettingsView;
})(window);
