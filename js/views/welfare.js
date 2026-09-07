// View 9: Welfare Schemes Navigator
(function(window) {
  'use strict';

  let filterAge = 'all';
  let filterIncome = 'all';
  let activeSchemeModal = null;

  const WelfareView = {
    render() {
      const state = window.CareBridgeStore.getState();
      const schemes = state.welfareSchemes;

      let filtered = schemes;
      if (filterAge === 'senior') {
        filtered = filtered.filter(s => s.minAge >= 60 || s.maxAge >= 60);
      } else if (filterAge === 'child') {
        filtered = filtered.filter(s => s.minAge === 0);
      }

      return `
        <div class="space-y-8 animate-fadeIn">
          <!-- Header -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold mb-1">
                <span>🏛️ Welfare Scheme Agent Active</span>
              </div>
              <h1 class="text-3xl font-black text-slate-900 tracking-tight">Health & Welfare Scheme Navigator</h1>
              <p class="text-xs text-slate-500 mt-1">Discover verified government and community health programs, insurance benefits, and assistive device subsidies.</p>
            </div>
          </div>

          <!-- Interactive Eligibility Questionnaire Bar -->
          <div class="health-card p-6 bg-gradient-to-r from-amber-50/50 via-white to-teal-50/40 border-amber-200">
            <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Family Demographic Filters</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-600 mb-1">Target Age Group</label>
                <select onchange="WelfareView.setAgeFilter(this.value)" class="w-full px-3 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500">
                  <option value="all" ${filterAge === 'all' ? 'selected' : ''}>All Family Members (Pan-Age)</option>
                  <option value="senior" ${filterAge === 'senior' ? 'selected' : ''}>Senior Citizens (60+ Years)</option>
                  <option value="child" ${filterAge === 'child' ? 'selected' : ''}>Children & Adolescents (0–18 Years)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-600 mb-1">Household Location</label>
                <input type="text" value="${state.user.city}, ${state.user.state}" readonly class="w-full px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-xl cursor-not-allowed" />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-600 mb-1">Income Tier</label>
                <input type="text" value="${state.user.incomeCategory}" readonly class="w-full px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-xl cursor-not-allowed" />
              </div>
            </div>
          </div>

          <!-- Matched Schemes Grid -->
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-black text-slate-900">Potentially Relevant Programs (${filtered.length})</h3>
              <span class="text-xs font-mono text-slate-400">DATABASE: Pan-India & Karnataka</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${filtered.map(scheme => `
                <div class="health-card p-6 flex flex-col justify-between bg-white shadow-md border border-slate-200 hover:border-amber-400 transition">
                  <div>
                    <div class="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                      <div>
                        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          ${scheme.category}
                        </span>
                        <h4 class="text-lg font-black text-slate-900 mt-2">${scheme.name}</h4>
                        <p class="text-xs font-semibold text-emerald-700 mt-0.5">Coverage: ${scheme.coverageAmount}</p>
                      </div>
                      <span class="text-xs font-extrabold px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
                        ${scheme.matchScore}
                      </span>
                    </div>

                    <div class="mt-4 space-y-2 text-xs text-slate-600">
                      <p class="leading-relaxed">${scheme.description}</p>
                      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                        <strong class="text-slate-900 font-bold block mb-1">💡 Why it may be relevant for your family:</strong>
                        <span>${scheme.whyRelevant}</span>
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span class="text-[11px] text-slate-400 font-mono">${scheme.portalName}</span>
                    <a href="${scheme.officialUrl}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5">
                      <span>View Official Portal</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Official Authority Verification Disclaimer -->
          <div class="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-950 flex items-start gap-3">
            <span class="text-lg">🛡️</span>
            <div>
              <strong class="font-bold">Important Welfare Guidance:</strong> Programs listed above are matched based on demographic heuristics. CareBridge AI <strong>does not guarantee</strong> eligibility. Always verify your identity and submit official claims directly via the respective state or national portal.
            </div>
          </div>
        </div>
      `;
    },

    setAgeFilter(val) {
      filterAge = val;
      window.App.renderCurrentView();
    }
  };

  window.WelfareView = WelfareView;
})(window);
