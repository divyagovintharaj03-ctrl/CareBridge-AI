// View 3: Family Dashboard Component
(function(window) {
  'use strict';

  const DashboardView = {
    render() {
      const state = window.CareBridgeStore.getState();
      const members = state.familyMembers;
      const medications = state.medications;
      const reports = state.medicalReports;

      // Pending tasks count
      const pendingMeds = medications.filter(m => m.status === 'pending');
      const takenMeds = medications.filter(m => m.status === 'taken');
      const overallAdherence = Math.round((takenMeds.length / medications.length) * 100);

      return `
        <div class="space-y-8 animate-fadeIn">
          <!-- Top Greeting & Header -->
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-1">
                <span>📍 ${state.user.city}, ${state.user.state}</span>
                <span>•</span>
                <span>${state.user.incomeCategory}</span>
              </div>
              <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Good Morning, Divya 👋</h1>
              <p class="text-sm text-slate-600 mt-1">Here is your family's centralized health & wellness overview.</p>
            </div>

            <!-- Quick Action Buttons -->
            <div class="flex flex-wrap items-center gap-3">
              <button onclick="CareBridgeStore.setView('assistant')" class="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition flex items-center gap-2">
                <span>💬 Ask AI Assistant</span>
              </button>
              <button onclick="DemoScenarios.runScenario('scenario_blood_report')" class="px-4 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 font-bold text-xs transition flex items-center gap-2">
                <span>🎯 Run Demo Flow</span>
              </button>
            </div>
          </div>

          <!-- Emergency Status Banner -->
          ${state.emergencyActive ? `
            <div class="p-4 rounded-2xl bg-red-600 text-white shadow-xl flex items-center justify-between emergency-pulse">
              <div class="flex items-center gap-3">
                <span class="text-2xl">🚨</span>
                <div>
                  <h4 class="font-extrabold text-sm uppercase tracking-wider">Active Emergency Alert</h4>
                  <p class="text-xs opacity-95 mt-0.5">${state.emergencyMessage}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="CareBridgeStore.setView('emergency')" class="px-3 py-1.5 rounded-lg bg-white text-red-700 font-extrabold text-xs shadow hover:bg-red-50">
                  Open SOS Center
                </button>
                <button onclick="CareBridgeStore.clearEmergency()" class="px-2 py-1 text-xs opacity-80 hover:opacity-100">
                  Dismiss
                </button>
              </div>
            </div>
          ` : `
            <div class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2.5">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="font-bold">Emergency Watchdog Active:</span>
                <span>No active medical emergency alerts across family profiles.</span>
              </div>
              <button onclick="CareBridgeStore.setView('emergency')" class="font-bold text-emerald-800 hover:underline">
                View SOS Protocol →
              </button>
            </div>
          `}

          <!-- Top Metric Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <!-- Family Wellness Score Card -->
            <div class="health-card p-5 relative overflow-hidden bg-gradient-to-br from-white to-teal-50/30">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-500 uppercase">Family Wellness Score</span>
                <span class="p-1.5 rounded-lg bg-teal-100 text-teal-700 text-xs font-bold">● Live Index</span>
              </div>
              <div class="mt-3 flex items-baseline gap-2">
                <span class="text-4xl font-black text-slate-900">78</span>
                <span class="text-lg font-bold text-slate-400">/ 100</span>
              </div>
              <div class="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                <div class="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full" style="width: 78%"></div>
              </div>
              <p class="text-[11px] text-slate-500 mt-2 italic">
                Wellness-management score, <strong>not</strong> a medical diagnosis.
              </p>
            </div>

            <!-- Medication Compliance -->
            <div class="health-card p-5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-500 uppercase">Daily Medication Rate</span>
                <span class="text-xl">💊</span>
              </div>
              <div class="mt-3 flex items-baseline gap-2">
                <span class="text-4xl font-black text-slate-900">${overallAdherence}%</span>
                <span class="text-xs font-bold text-emerald-600">${takenMeds.length} / ${medications.length} taken</span>
              </div>
              <p class="text-xs text-slate-500 mt-3 flex items-center justify-between">
                <span>${pendingMeds.length} pending doses today</span>
                <button onclick="CareBridgeStore.setView('medications')" class="text-teal-600 font-bold hover:underline">Check →</button>
              </p>
            </div>

            <!-- Upcoming Doctor Visits -->
            <div class="health-card p-5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-500 uppercase">Upcoming Consults</span>
                <span class="text-xl">🩺</span>
              </div>
              <div class="mt-3 flex items-baseline gap-2">
                <span class="text-4xl font-black text-slate-900">2</span>
                <span class="text-xs font-bold text-indigo-600">Next 14 Days</span>
              </div>
              <p class="text-xs text-slate-500 mt-3 truncate">
                Ramesh: Dr. V. K. Nambiar (Sep 12)
              </p>
            </div>

            <!-- Active Public Welfare Schemes -->
            <div class="health-card p-5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-500 uppercase">Matched Welfare Schemes</span>
                <span class="text-xl">🏛️</span>
              </div>
              <div class="mt-3 flex items-baseline gap-2">
                <span class="text-4xl font-black text-slate-900">5</span>
                <span class="text-xs font-bold text-amber-600">Pan-India & State</span>
              </div>
              <p class="text-xs text-slate-500 mt-3 flex items-center justify-between">
                <span>PM-JAY, RVY, UIP</span>
                <button onclick="CareBridgeStore.setView('welfare')" class="text-teal-600 font-bold hover:underline">Explore →</button>
              </p>
            </div>
          </div>

          <!-- Family Members Grid -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-xl font-black text-slate-900">Family Members</h3>
                <p class="text-xs text-slate-500">4 active family health profiles</p>
              </div>
              <button onclick="CareBridgeStore.setView('family')" class="text-xs font-bold text-teal-600 hover:text-teal-700">
                Manage Family Profiles →
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              ${members.map(member => `
                <div class="health-card p-5 cursor-pointer hover:border-teal-400 transition" onclick="CareBridgeStore.setActiveMember('${member.id}'); CareBridgeStore.setView('family');">
                  <div class="flex items-start gap-3">
                    <img src="${member.avatar}" alt="${member.name}" class="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-sm" />
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between">
                        <h4 class="text-sm font-extrabold text-slate-900 truncate">${member.name}</h4>
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${member.status === 'Healthy' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">
                          ${member.status}
                        </span>
                      </div>
                      <p class="text-xs text-slate-500">${member.relation} • ${member.age} yrs</p>
                    </div>
                  </div>

                  <div class="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                    <div class="flex items-center justify-between text-slate-600">
                      <span>Blood Group:</span>
                      <span class="font-bold text-slate-900">${member.bloodGroup}</span>
                    </div>
                    <div class="flex items-center justify-between text-slate-600">
                      <span>Adherence:</span>
                      <span class="font-bold text-emerald-600">${member.adherenceRate}%</span>
                    </div>
                    <div class="text-[11px] text-slate-500 pt-1 truncate">
                      <strong>Next:</strong> ${member.upcomingAppointment.split(' - ')[0]}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Bottom Grid: Upcoming Tasks & AI Insights -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Upcoming Tasks (2 cols) -->
            <div class="lg:col-span-2 health-card p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <span class="text-lg">📋</span>
                  <h3 class="text-base font-black text-slate-900">Upcoming Family Health Tasks</h3>
                </div>
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">Next 7 Days</span>
              </div>

              <div class="space-y-3">
                <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                      🩺
                    </div>
                    <div>
                      <p class="text-xs font-bold text-slate-900">Diabetic Foot & Blood Sugar Review</p>
                      <p class="text-[11px] text-slate-500">Ramesh Sharma • Dr. V. K. Nambiar • Sep 12, 2026</p>
                    </div>
                  </div>
                  <button onclick="CareBridgeStore.setActiveMember('mem_03'); CareBridgeStore.setView('assistant');" class="text-xs font-bold text-indigo-600 hover:underline">
                    Prepare Doctor Qs →
                  </button>
                </div>

                <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
                      💊
                    </div>
                    <div>
                      <p class="text-xs font-bold text-slate-900">Evening Medication Dose (08:00 PM)</p>
                      <p class="text-[11px] text-slate-500">Omega-3 1000mg (Divya) & Metformin 500mg (Ramesh)</p>
                    </div>
                  </div>
                  <button onclick="CareBridgeStore.setView('medications')" class="text-xs font-bold text-teal-600 hover:underline">
                    View Schedule →
                  </button>
                </div>

                <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                      🛡️
                    </div>
                    <div>
                      <p class="text-xs font-bold text-slate-900">Pediatric Booster Immunization (12-Yr Milestone)</p>
                      <p class="text-[11px] text-slate-500">Ananya Sharma • Universal Immunization Schedule • Nov 15, 2026</p>
                    </div>
                  </div>
                  <span class="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Scheduled</span>
                </div>
              </div>
            </div>

            <!-- AI Insights Panel (1 col) -->
            <div class="health-card p-6 bg-gradient-to-br from-indigo-900 to-slate-900 text-white flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                    Multi-Agent Insights
                  </span>
                  <span class="text-xs font-mono text-slate-400">7 AGENTS ONLINE</span>
                </div>
                <h4 class="text-lg font-black mt-3">Family Wellness Briefing</h4>

                <div class="mt-4 space-y-3 text-xs text-slate-300">
                  <div class="p-3 rounded-xl bg-white/10 border border-white/10">
                    <strong class="text-white block font-bold">📊 Lab Alert:</strong>
                    Ramesh's CBC report shows Hemoglobin at 10.2 g/dL. 3 questions generated for his diabetologist visit.
                  </div>
                  <div class="p-3 rounded-xl bg-white/10 border border-white/10">
                    <strong class="text-white block font-bold">🏛️ Welfare Discovery:</strong>
                    Ramesh is eligible for Rashtriya Vayoshri physical aids & Ayushman Bharat secondary hospitalization cover.
                  </div>
                  <div class="p-3 rounded-xl bg-white/10 border border-white/10">
                    <strong class="text-white block font-bold">💊 Medication Refill:</strong>
                    Metformin 500mg supply has 8 days remaining.
                  </div>
                </div>
              </div>

              <button onclick="CareBridgeStore.setView('agents')" class="mt-6 w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold text-xs shadow transition">
                Open AI Agent Activity Mesh →
              </button>
            </div>
          </div>
        </div>
      `;
    }
  };

  window.DashboardView = DashboardView;
})(window);
