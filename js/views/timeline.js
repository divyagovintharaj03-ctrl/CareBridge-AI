// View 8: Health Timeline Component
(function(window) {
  'use strict';

  let selectedCategory = 'all'; // 'all', 'Lab Report', 'Doctor Consultation', 'Vaccination', 'Checkup', 'Welfare Scheme'
  let selectedMemberFilter = 'all';

  const TimelineView = {
    render() {
      const state = window.CareBridgeStore.getState();
      const timelineEvents = state.timeline;
      const members = state.familyMembers;

      let filtered = timelineEvents;
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(e => e.category === selectedCategory);
      }
      if (selectedMemberFilter !== 'all') {
        filtered = filtered.filter(e => e.memberId === selectedMemberFilter);
      }

      return `
        <div class="space-y-8 animate-fadeIn">
          <!-- Header -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 class="text-3xl font-black text-slate-900 tracking-tight">Family Health Timeline</h1>
              <p class="text-xs text-slate-500 mt-1">Chronological record of clinical checkups, lab reports, vaccinations, and welfare milestones.</p>
            </div>
          </div>

          <!-- Filters Bar -->
          <div class="health-card p-4 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
            <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
              <button onclick="TimelineView.setCategory('all')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedCategory === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                All Events (${timelineEvents.length})
              </button>
              <button onclick="TimelineView.setCategory('Lab Report')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedCategory === 'Lab Report' ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-800 hover:bg-teal-100'}">
                🩸 Lab Reports
              </button>
              <button onclick="TimelineView.setCategory('Doctor Consultation')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedCategory === 'Doctor Consultation' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-800 hover:bg-blue-100'}">
                🩺 Doctor Visits
              </button>
              <button onclick="TimelineView.setCategory('Vaccination')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedCategory === 'Vaccination' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'}">
                🛡️ Vaccines
              </button>
              <button onclick="TimelineView.setCategory('Welfare Scheme')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedCategory === 'Welfare Scheme' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'}">
                🏛️ Welfare
              </button>
            </div>

            <div class="flex items-center gap-2 w-full md:w-auto justify-end">
              <span class="text-xs text-slate-400 font-semibold">Filter Member:</span>
              <select onchange="TimelineView.setMember(this.value)" class="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none">
                <option value="all" ${selectedMemberFilter === 'all' ? 'selected' : ''}>All Family</option>
                ${members.map(m => `<option value="${m.id}" ${m.id === selectedMemberFilter ? 'selected' : ''}>${m.name}</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- Chronological Timeline Stream -->
          <div class="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-4 sm:before:left-6 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            ${filtered.length > 0 ? filtered.map(event => {
              const colors = {
                teal: 'bg-teal-50 border-teal-200 text-teal-800 node-teal',
                blue: 'bg-blue-50 border-blue-200 text-blue-800 node-blue',
                green: 'bg-emerald-50 border-emerald-200 text-emerald-800 node-green',
                purple: 'bg-purple-50 border-purple-200 text-purple-800 node-purple',
                amber: 'bg-amber-50 border-amber-200 text-amber-800 node-amber'
              };

              return `
                <div class="relative pl-6 animate-slideIn">
                  <!-- Node Icon Marker -->
                  <div class="absolute -left-9 sm:-left-11 top-1 w-8 h-8 rounded-xl bg-white border-2 border-slate-300 shadow-sm flex items-center justify-center text-xs font-bold text-slate-700">
                    ●
                  </div>

                  <div class="health-card p-6 bg-white shadow-md space-y-2">
                    <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div class="flex items-center gap-2">
                        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${colors[event.categoryColor] || colors.teal}">
                          ${event.category}
                        </span>
                        <span class="text-xs font-bold text-slate-900">${event.memberName}</span>
                      </div>
                      <span class="text-xs font-mono text-slate-400 font-semibold">${event.date} • ${event.time}</span>
                    </div>

                    <h4 class="text-base font-extrabold text-slate-900 pt-1">${event.title}</h4>
                    <p class="text-xs text-slate-600 leading-relaxed">${event.description}</p>

                    <div class="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Logged by: <strong class="text-teal-700">${event.badge || 'CareBridge System'}</strong></span>
                      <button onclick="CareBridgeStore.setActiveMember('${event.memberId}'); CareBridgeStore.setView('assistant');" class="text-indigo-600 font-bold hover:underline">
                        Discuss event with AI →
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('') : `
              <div class="p-12 text-center text-xs text-slate-500 bg-white rounded-3xl border border-slate-200">
                No health timeline events match the selected filter.
              </div>
            `}
          </div>
        </div>
      `;
    },

    setCategory(cat) {
      selectedCategory = cat;
      window.App.renderCurrentView();
    },

    setMember(memId) {
      selectedMemberFilter = memId;
      window.App.renderCurrentView();
    }
  };

  window.TimelineView = TimelineView;
})(window);
