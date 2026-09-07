// View 10: Emergency Center Component
(function(window) {
  'use strict';

  const EmergencyView = {
    render() {
      const state = window.CareBridgeStore.getState();
      const contacts = state.emergencyContacts;

      return `
        <div class="space-y-8 animate-fadeIn">
          <!-- Header -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200 text-xs font-bold mb-1">
                <span>🚨 Critical Safety Watchdog Active</span>
              </div>
              <h1 class="text-3xl font-black text-slate-900 tracking-tight">Family Emergency Center</h1>
              <p class="text-xs text-slate-500 mt-1">Instant medical emergency protocol, official helpline routing, and family broadcast tools.</p>
            </div>
          </div>

          <!-- Prominent Red Alert Warning Card -->
          <div class="health-card p-6 sm:p-8 bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-2xl space-y-6">
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-black flex-shrink-0">
                🚨
              </div>
              <div>
                <h2 class="text-2xl font-black uppercase tracking-tight">Immediate Medical Emergency Notice</h2>
                <p class="text-sm text-red-100 mt-1 leading-relaxed">
                  If someone is experiencing severe chest pressure, sudden breathing difficulty, loss of consciousness, speech slurring, or heavy bleeding, <strong>seek immediate professional emergency care</strong>.
                </p>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-4 pt-2">
              <a href="tel:108" class="px-6 py-3.5 bg-white text-red-700 hover:bg-red-50 font-black text-sm rounded-2xl shadow-xl transition flex items-center gap-2">
                <span>📞 Call Ambulance (108)</span>
              </a>
              <a href="tel:112" class="px-6 py-3.5 bg-slate-900 text-white hover:bg-slate-800 font-black text-sm rounded-2xl shadow-xl transition flex items-center gap-2">
                <span>🛡️ National Helpline (112)</span>
              </a>
              <button onclick="EmergencyView.simulateBroadcast()" class="px-6 py-3.5 bg-red-800/80 hover:bg-red-900 text-white font-bold text-sm rounded-2xl border border-white/20 transition flex items-center gap-2">
                <span>📡 Broadcast SOS to Family Contacts</span>
              </button>
            </div>
          </div>

          <!-- Emergency Helplines & Verified Numbers Grid -->
          <div class="space-y-4">
            <h3 class="text-xl font-black text-slate-900">National & Local Emergency Helplines</h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              ${contacts.map(c => `
                <div class="health-card p-5 flex flex-col justify-between bg-white border border-slate-200 shadow-sm">
                  <div>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">${c.type}</span>
                    <h4 class="font-extrabold text-base text-slate-900 mt-2">${c.name}</h4>
                    <p class="text-2xl font-mono font-black text-red-600 mt-2">${c.number}</p>
                  </div>
                  <a href="tel:${c.number.replace(/\s+/g, '')}" class="mt-4 w-full py-2 bg-slate-100 hover:bg-red-50 text-slate-800 hover:text-red-700 font-bold text-xs rounded-xl text-center transition block">
                    Tap to Dial →
                  </a>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Nearest Emergency Hospital Protocol -->
          <div class="health-card p-6 bg-white shadow-md space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 class="font-black text-base text-slate-900 flex items-center gap-2">
                <span>🏥</span> Family Primary Emergency Hospital
              </h4>
              <span class="text-xs font-bold text-emerald-600 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                Distance: ~3.2 km
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
              <div>
                <p class="font-bold text-slate-900 text-sm">Manipal Hospital & 24/7 Trauma Care</p>
                <p class="text-slate-500 mt-0.5">HAL Airport Road, Kodihalli, Bengaluru, Karnataka 560017</p>
                <p class="mt-2">🚨 Emergency Hotline: <strong class="font-mono text-slate-900">+91 80 2502 4444</strong></p>
              </div>
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <p>Equipped with 24-hour Cardiac Cath Lab, Adult & Pediatric ICU, and Level 1 Trauma Resuscitation.</p>
                <div class="mt-3 flex items-center gap-2">
                  <a href="https://maps.google.com/?q=Manipal+Hospital+Bengaluru" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 transition">
                    Get Driving Directions ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Non-Diagnostic Safety Guarantee -->
          <div class="p-4 bg-slate-100 border border-slate-200 rounded-2xl text-xs text-slate-600 italic">
            <strong>CareBridge AI Safety Commitment:</strong> This platform never stalls, defers, or replaces critical emergency care. The Emergency Safety Agent constantly audits all inputs to prevent dangerous delays.
          </div>
        </div>
      `;
    },

    simulateBroadcast() {
      NotificationUtil.playChime();
      NotificationUtil.showToast('SOS Broadcast Sent', 'Simulated SMS & Push Alert dispatched to 4 family emergency contacts.', 'warning');
      window.CareBridgeStore.triggerEmergency('Simulated Family SOS Broadcast initiated from Emergency Center.');
      window.App.renderCurrentView();
    }
  };

  window.EmergencyView = EmergencyView;
})(window);
