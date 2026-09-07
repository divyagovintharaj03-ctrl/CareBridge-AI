// View 7: Medication Tracker Component
(function(window) {
  'use strict';

  let selectedTimeSlot = 'all'; // 'all', '08:00 AM', '01:00 PM', '08:00 PM'

  const MedicationsView = {
    render() {
      const state = window.CareBridgeStore.getState();
      const medications = state.medications;
      const members = state.familyMembers;

      const filteredMeds = selectedTimeSlot === 'all' 
        ? medications 
        : medications.filter(m => m.timeSlot === selectedTimeSlot);

      const takenCount = medications.filter(m => m.status === 'taken').length;
      const pendingCount = medications.filter(m => m.status === 'pending').length;
      const upcomingCount = medications.filter(m => m.status === 'upcoming').length;
      const adherencePct = Math.round((takenCount / medications.length) * 100);

      // Low refill warning list
      const lowRefills = medications.filter(m => m.refillDaysLeft <= 10);

      return `
        <div class="space-y-8 animate-fadeIn">
          <!-- Header -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 class="text-3xl font-black text-slate-900 tracking-tight">Family Medication Tracker</h1>
              <p class="text-xs text-slate-500 mt-1">Organize daily pill schedules, track weekly adherence, and manage refill warnings safely.</p>
            </div>
            <button onclick="MedicationsView.openAddMedModal()" class="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2">
              <span>+ Add Prescription</span>
            </button>
          </div>

          <!-- Top Stats & Adherence Progress -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="health-card p-5 bg-gradient-to-br from-white to-teal-50/40">
              <span class="text-[10px] font-bold text-slate-400 uppercase">Today's Adherence</span>
              <div class="flex items-baseline gap-2 mt-2">
                <span class="text-3xl font-black text-slate-900">${adherencePct}%</span>
                <span class="text-xs font-bold text-teal-700">${takenCount} / ${medications.length} taken</span>
              </div>
              <div class="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                <div class="bg-teal-600 h-full rounded-full" style="width: ${adherencePct}%"></div>
              </div>
            </div>

            <div class="health-card p-5">
              <span class="text-[10px] font-bold text-slate-400 uppercase">Doses Taken</span>
              <p class="text-3xl font-black text-emerald-600 mt-2">${takenCount}</p>
              <p class="text-xs text-slate-500 mt-1">✓ On schedule</p>
            </div>

            <div class="health-card p-5">
              <span class="text-[10px] font-bold text-slate-400 uppercase">Pending Action</span>
              <p class="text-3xl font-black text-amber-500 mt-2">${pendingCount}</p>
              <p class="text-xs text-slate-500 mt-1">Awaiting confirmation</p>
            </div>

            <div class="health-card p-5">
              <span class="text-[10px] font-bold text-slate-400 uppercase">Upcoming Doses</span>
              <p class="text-3xl font-black text-indigo-600 mt-2">${upcomingCount}</p>
              <p class="text-xs text-slate-500 mt-1">Evening 08:00 PM slot</p>
            </div>
          </div>

          <!-- Low Refill Alert Banner if any -->
          ${lowRefills.length > 0 ? `
            <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-2xl">⚠️</span>
                <div>
                  <h4 class="font-bold text-xs uppercase text-amber-900">Medication Refill Warning (${lowRefills.length} items low)</h4>
                  <p class="text-xs text-amber-900 mt-0.5">
                    ${lowRefills.map(m => `<strong>${m.name}</strong> (${m.refillDaysLeft} days left for ${CareBridgeStore.getMemberName(m.memberId)})`).join(' • ')}
                  </p>
                </div>
              </div>
              <button onclick="NotificationUtil.showToast('Refill Reminder', 'Doctor prescription refill alert queued.', 'info')" class="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold text-xs shadow hover:bg-amber-700">
                Order Refill
              </button>
            </div>
          ` : ''}

          <!-- Time Slot Filter Bar -->
          <div class="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200">
            <div class="flex items-center gap-2">
              <button onclick="MedicationsView.setTimeSlot('all')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedTimeSlot === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                All Slots (${medications.length})
              </button>
              <button onclick="MedicationsView.setTimeSlot('08:00 AM')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedTimeSlot === '08:00 AM' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                🌅 Morning (08:00 AM)
              </button>
              <button onclick="MedicationsView.setTimeSlot('01:00 PM')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedTimeSlot === '01:00 PM' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                ☀️ Afternoon (01:00 PM)
              </button>
              <button onclick="MedicationsView.setTimeSlot('08:00 PM')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedTimeSlot === '08:00 PM' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                🌙 Evening (08:00 PM)
              </button>
            </div>

            <div class="text-xs text-slate-400 font-mono">
              MEDICATION AGENT ADHERENCE LOG: ACTIVE
            </div>
          </div>

          <!-- Medication Cards List -->
          <div class="space-y-4">
            ${filteredMeds.map(med => {
              const member = CareBridgeStore.getMember(med.memberId);
              return `
                <div class="health-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 ${med.status === 'taken' ? 'border-l-emerald-500 bg-white' : med.status === 'pending' ? 'border-l-amber-500 bg-amber-50/10' : 'border-l-indigo-500 bg-white'}">
                  <div class="flex items-start sm:items-center gap-4">
                    <img src="${member.avatar}" class="w-11 h-11 rounded-2xl object-cover border border-slate-200" />
                    <div>
                      <div class="flex items-center gap-2">
                        <h4 class="font-extrabold text-base text-slate-900">${med.name}</h4>
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">${med.dosage}</span>
                        <span class="text-xs font-bold px-2 py-0.5 rounded-full ${med.status === 'taken' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : med.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'}">
                          ${med.status === 'taken' ? '✓ Taken' : med.status === 'pending' ? '○ Pending' : '⏱ Upcoming'}
                        </span>
                      </div>
                      <p class="text-xs text-slate-500 mt-1">
                        For: <strong class="text-slate-800">${member.name}</strong> • Scheduled: <strong class="text-teal-700 font-mono">${med.timeSlot}</strong> (${med.frequency})
                      </p>
                      <p class="text-[11px] text-slate-500 mt-0.5">
                        Prescribed for <em>${med.purpose}</em> by ${med.prescribedBy} • 🔥 <strong>${med.streakDays} days streak</strong>
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center gap-3">
                    <span class="text-xs font-mono text-slate-500 hidden md:inline-block">${med.refillDaysLeft}d supply</span>
                    <button 
                      onclick="CareBridgeStore.toggleMedicationStatus('${med.id}'); MedicationsView.render();" 
                      class="px-4 py-2 rounded-xl font-bold text-xs shadow-sm transition flex items-center gap-1.5 ${med.status === 'taken' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100' : 'bg-teal-600 text-white hover:bg-teal-700'}"
                    >
                      <span>${med.status === 'taken' ? '✓ Dose Taken' : 'Mark as Taken'}</span>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Strict Safety Advisory -->
          <div class="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 flex items-start gap-3">
            <span class="text-base">🛡️</span>
            <div>
              <strong>Medication Safety Policy:</strong> CareBridge AI and the Medication Agent strictly manage schedules and adherence. The system <strong>never</strong> alters dosages, stops, or introduces new pharmaceutical compounds without direct physician authorization.
            </div>
          </div>
        </div>

        <!-- Add Medication Modal Container -->
        <div id="add-med-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-scaleUp text-left">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 class="text-lg font-black text-slate-900">Add Prescribed Medication</h3>
              <button onclick="MedicationsView.closeAddMedModal()" class="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
            </div>

            <form onsubmit="MedicationsView.handleAddMedSubmit(event)" class="mt-4 space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Family Member</label>
                <select id="new-med-member" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl">
                  ${members.map(m => `<option value="${m.id}">${m.name} (${m.relation})</option>`).join('')}
                </select>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Medicine Name</label>
                  <input type="text" id="new-med-name" placeholder="e.g. Telmisartan" required class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Dosage</label>
                  <input type="text" id="new-med-dosage" placeholder="e.g. 40 mg" required class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Scheduled Time</label>
                  <select id="new-med-timeslot" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl">
                    <option value="08:00 AM">08:00 AM (Morning)</option>
                    <option value="01:00 PM">01:00 PM (Afternoon)</option>
                    <option value="08:00 PM">08:00 PM (Night)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Frequency</label>
                  <input type="text" id="new-med-frequency" placeholder="e.g. Once Daily" required class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl" />
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Purpose / Indication</label>
                <input type="text" id="new-med-purpose" placeholder="e.g. Hypertension Regulation" required class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Prescribing Doctor</label>
                <input type="text" id="new-med-doctor" placeholder="e.g. Dr. Arvind Rao" required class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl" />
              </div>

              <div class="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button type="button" onclick="MedicationsView.closeAddMedModal()" class="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" class="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow">Save Prescription</button>
              </div>
            </form>
          </div>
        </div>
      `;
    },

    setTimeSlot(slot) {
      selectedTimeSlot = slot;
      window.App.renderCurrentView();
    },

    openAddMedModal() {
      const modal = document.getElementById('add-med-modal');
      if (modal) modal.classList.remove('hidden');
    },

    closeAddMedModal() {
      const modal = document.getElementById('add-med-modal');
      if (modal) modal.classList.add('hidden');
    },

    handleAddMedSubmit(e) {
      e.preventDefault();
      const memberId = document.getElementById('new-med-member').value;
      const name = document.getElementById('new-med-name').value;
      const dosage = document.getElementById('new-med-dosage').value;
      const timeSlot = document.getElementById('new-med-timeslot').value;
      const frequency = document.getElementById('new-med-frequency').value;
      const purpose = document.getElementById('new-med-purpose').value;
      const prescribedBy = document.getElementById('new-med-doctor').value;

      window.CareBridgeStore.addMedication({
        memberId,
        name,
        dosage,
        timeSlot,
        frequency,
        purpose,
        prescribedBy
      });

      this.closeAddMedModal();
      NotificationUtil.playChime();
      NotificationUtil.showToast('Prescription Added', `${name} scheduled for ${timeSlot}.`, 'success');
      window.App.renderCurrentView();
    }
  };

  window.MedicationsView = MedicationsView;
})(window);
