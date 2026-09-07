// View 5: Family Members Directory & Detail Modal
(function(window) {
  'use strict';

  let selectedMemberId = null;
  let activeTab = 'vitals'; // 'vitals', 'medications', 'appointments', 'allergies'

  const FamilyView = {
    render() {
      const state = window.CareBridgeStore.getState();
      const members = state.familyMembers;
      const current = members.find(m => m.id === (selectedMemberId || state.activeMemberId)) || members[0];
      selectedMemberId = current.id;

      const memberMeds = state.medications.filter(m => m.memberId === current.id);
      const memberReports = state.medicalReports.filter(m => m.memberId === current.id);

      return `
        <div class="space-y-8 animate-fadeIn">
          <!-- Header -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 class="text-3xl font-black text-slate-900 tracking-tight">Family Members Directory</h1>
              <p class="text-xs text-slate-500 mt-1">Manage family health records, allergies, doctor appointments, and vital metrics.</p>
            </div>
            <button onclick="FamilyView.openAddMemberModal()" class="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2">
              <span>+ Add Family Member</span>
            </button>
          </div>

          <!-- Members Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            ${members.map(m => `
              <div 
                onclick="FamilyView.selectMember('${m.id}')"
                class="health-card p-5 cursor-pointer transition border-2 ${m.id === current.id ? 'border-teal-500 bg-teal-50/20 shadow-md' : 'border-slate-200 hover:border-slate-300'}"
              >
                <div class="flex items-center gap-3">
                  <img src="${m.avatar}" class="w-12 h-12 rounded-2xl object-cover border border-slate-200" />
                  <div class="flex-1 min-w-0">
                    <h4 class="font-black text-sm text-slate-900 truncate">${m.name}</h4>
                    <p class="text-xs text-slate-500">${m.relation} • ${m.age} yrs</p>
                  </div>
                </div>
                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${m.status === 'Healthy' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">${m.status}</span>
                  <span class="font-mono text-slate-600 font-bold">Blood: ${m.bloodGroup}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Detailed Profile View for Selected Member -->
          <div class="health-card p-6 sm:p-8 bg-white shadow-xl">
            <!-- Profile Top Bar -->
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-200">
              <div class="flex items-center gap-4">
                <img src="${current.avatar}" class="w-20 h-20 rounded-3xl object-cover border-2 border-teal-500 shadow-md" />
                <div>
                  <div class="flex items-center gap-3">
                    <h2 class="text-2xl font-black text-slate-900">${current.name}</h2>
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
                      ${current.relation}
                    </span>
                  </div>
                  <p class="text-xs text-slate-500 mt-1">
                    Age: <strong>${current.age}</strong> • Gender: <strong>${current.gender}</strong> • Blood Group: <strong>${current.bloodGroup}</strong>
                  </p>
                  <p class="text-xs text-slate-600 mt-1">
                    🚨 Emergency Contact: <strong class="text-slate-900 font-mono">${current.emergencyContact}</strong>
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-3">
                <button onclick="CareBridgeStore.setActiveMember('${current.id}'); CareBridgeStore.setView('assistant');" class="px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-xl font-bold text-xs hover:bg-indigo-100 transition flex items-center gap-1.5">
                  <span>🧠 Ask Agent About ${current.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>

            <!-- Profile Tabs -->
            <div class="flex items-center gap-2 border-b border-slate-200 pt-4 overflow-x-auto no-scrollbar">
              <button onclick="FamilyView.setTab('vitals')" class="px-4 py-2.5 text-xs font-bold border-b-2 transition ${activeTab === 'vitals' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-900'}">
                📊 Vitals & Health Notes
              </button>
              <button onclick="FamilyView.setTab('medications')" class="px-4 py-2.5 text-xs font-bold border-b-2 transition ${activeTab === 'medications' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-900'}">
                💊 Medications (${memberMeds.length})
              </button>
              <button onclick="FamilyView.setTab('appointments')" class="px-4 py-2.5 text-xs font-bold border-b-2 transition ${activeTab === 'appointments' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-900'}">
                🩺 Doctors & Consultations
              </button>
              <button onclick="FamilyView.setTab('allergies')" class="px-4 py-2.5 text-xs font-bold border-b-2 transition ${activeTab === 'allergies' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-900'}">
                🛡️ Allergies & Vaccines
              </button>
            </div>

            <!-- Tab Contents -->
            <div class="pt-6">
              ${activeTab === 'vitals' ? `
                <div class="space-y-6">
                  <div class="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span class="text-[10px] font-bold text-slate-400 uppercase">Blood Pressure</span>
                      <p class="text-lg font-black text-slate-900 mt-1">${current.vitals.bp}</p>
                      <span class="text-[10px] text-emerald-600 font-semibold">Normal Range</span>
                    </div>
                    <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span class="text-[10px] font-bold text-slate-400 uppercase">Heart Pulse</span>
                      <p class="text-lg font-black text-slate-900 mt-1">${current.vitals.pulse}</p>
                      <span class="text-[10px] text-emerald-600 font-semibold">Resting Rhythm</span>
                    </div>
                    <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span class="text-[10px] font-bold text-slate-400 uppercase">SpO2 Oxygen</span>
                      <p class="text-lg font-black text-slate-900 mt-1">${current.vitals.spo2}</p>
                      <span class="text-[10px] text-emerald-600 font-semibold">Optimal</span>
                    </div>
                    <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span class="text-[10px] font-bold text-slate-400 uppercase">Weight</span>
                      <p class="text-lg font-black text-slate-900 mt-1">${current.vitals.weight}</p>
                      <span class="text-[10px] text-slate-500 font-semibold">Stable</span>
                    </div>
                    <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span class="text-[10px] font-bold text-slate-400 uppercase">Body Mass Index</span>
                      <p class="text-lg font-black text-slate-900 mt-1">${current.vitals.bmi}</p>
                      <span class="text-[10px] text-emerald-600 font-semibold">Healthy BMI</span>
                    </div>
                  </div>

                  <div class="p-4 rounded-2xl bg-teal-50/50 border border-teal-200">
                    <h4 class="font-bold text-xs text-teal-900 uppercase">Clinical Summary & Background Notes</h4>
                    <p class="text-xs text-teal-950 mt-1 leading-relaxed">${current.notes}</p>
                  </div>
                </div>
              ` : ''}

              ${activeTab === 'medications' ? `
                <div class="space-y-4">
                  ${memberMeds.length > 0 ? memberMeds.map(med => `
                    <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                          💊
                        </div>
                        <div>
                          <h4 class="font-bold text-sm text-slate-900">${med.name} <span class="text-xs text-slate-500">(${med.dosage})</span></h4>
                          <p class="text-xs text-slate-500">${med.frequency} • Time: <strong>${med.timeSlot}</strong></p>
                          <p class="text-[11px] text-teal-700 mt-0.5">Purpose: ${med.purpose} • Prescribed by: ${med.prescribedBy}</p>
                        </div>
                      </div>
                      <div class="flex items-center gap-3">
                        <button onclick="CareBridgeStore.toggleMedicationStatus('${med.id}'); FamilyView.render();" class="px-3 py-1.5 rounded-xl font-bold text-xs ${med.status === 'taken' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}">
                          ${med.status === 'taken' ? '✓ Taken' : 'Mark Taken'}
                        </button>
                      </div>
                    </div>
                  `).join('') : `
                    <div class="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl">
                      No active daily medications recorded for ${current.name}.
                    </div>
                  `}
                </div>
              ` : ''}

              ${activeTab === 'appointments' ? `
                <div class="space-y-4">
                  <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <h4 class="font-bold text-sm text-slate-900">Primary Treating Doctor</h4>
                    <p class="text-xs text-slate-600 mt-1">${current.doctor}</p>
                    <div class="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                      <span class="text-xs font-semibold text-slate-700">Upcoming Visit: <strong>${current.upcomingAppointment}</strong></span>
                      <button onclick="CareBridgeStore.setActiveMember('${current.id}'); CareBridgeStore.setView('assistant');" class="text-xs font-bold text-teal-700 hover:underline">
                        Generate Consultation Topics →
                      </button>
                    </div>
                  </div>
                </div>
              ` : ''}

              ${activeTab === 'allergies' ? `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="p-5 rounded-2xl bg-red-50 border border-red-200">
                    <h4 class="font-bold text-xs text-red-900 uppercase">Known Drug / Food Allergies</h4>
                    <div class="mt-3 flex flex-wrap gap-2">
                      ${current.allergies.map(a => `
                        <span class="px-3 py-1 rounded-full bg-red-100 text-red-800 font-bold text-xs border border-red-200">
                          ⚠️ ${a}
                        </span>
                      `).join('')}
                    </div>
                  </div>

                  <div class="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <h4 class="font-bold text-xs text-emerald-900 uppercase">Vaccination Status</h4>
                    <p class="text-xs text-emerald-900 mt-2">Up to date on all routine age-appropriate immunization boosters.</p>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Add Member Modal Container -->
        <div id="add-member-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-scaleUp text-left">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 class="text-lg font-black text-slate-900">Add Family Member</h3>
              <button onclick="FamilyView.closeAddMemberModal()" class="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
            </div>

            <form onsubmit="FamilyView.handleAddMemberSubmit(event)" class="mt-4 space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input type="text" id="new-mem-name" placeholder="e.g. Kavya Sharma" required class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Relation</label>
                  <input type="text" id="new-mem-relation" placeholder="e.g. Daughter / Sister" required class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Age</label>
                  <input type="number" id="new-mem-age" placeholder="e.g. 16" required class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                  <select id="new-mem-gender" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl">
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Blood Group</label>
                  <select id="new-mem-blood" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl">
                    <option>B+</option>
                    <option>O+</option>
                    <option>A+</option>
                    <option>AB+</option>
                    <option>B-</option>
                    <option>O-</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Emergency Contact</label>
                <input type="text" id="new-mem-contact" placeholder="e.g. +91 98765 43210" required class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Known Allergies (comma-separated)</label>
                <input type="text" id="new-mem-allergies" placeholder="e.g. Dust, Penicillin" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl" />
              </div>

              <div class="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button type="button" onclick="FamilyView.closeAddMemberModal()" class="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" class="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      `;
    },

    selectMember(memberId) {
      selectedMemberId = memberId;
      window.CareBridgeStore.setActiveMember(memberId);
      window.App.renderCurrentView();
    },

    setTab(tab) {
      activeTab = tab;
      window.App.renderCurrentView();
    },

    openAddMemberModal() {
      const modal = document.getElementById('add-member-modal');
      if (modal) modal.classList.remove('hidden');
    },

    closeAddMemberModal() {
      const modal = document.getElementById('add-member-modal');
      if (modal) modal.classList.add('hidden');
    },

    handleAddMemberSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('new-mem-name').value;
      const relation = document.getElementById('new-mem-relation').value;
      const age = parseInt(document.getElementById('new-mem-age').value, 10);
      const gender = document.getElementById('new-mem-gender').value;
      const bloodGroup = document.getElementById('new-mem-blood').value;
      const emergencyContact = document.getElementById('new-mem-contact').value;
      const allergies = document.getElementById('new-mem-allergies').value.split(',').map(s => s.trim()).filter(Boolean);

      window.CareBridgeStore.addFamilyMember({
        name,
        relation,
        age,
        gender,
        bloodGroup,
        emergencyContact,
        allergies: allergies.length ? allergies : ['None reported'],
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        doctor: 'Primary Care Physician',
        upcomingAppointment: 'Pending scheduling',
        notes: 'Newly enrolled family member profile.'
      });

      this.closeAddMemberModal();
      NotificationUtil.playChime();
      NotificationUtil.showToast('Member Added', `${name} successfully added to family registry.`, 'success');
      window.App.renderCurrentView();
    }
  };

  window.FamilyView = FamilyView;
})(window);
