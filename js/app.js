// CareBridge AI - Main Application Controller
(function(window) {
  'use strict';

  class AppController {
    constructor() {
      this.store = window.CareBridgeStore;
      this.currentView = 'landing';
    }

    init() {
      this.store.subscribe((state) => {
        if (state.activeView !== this.currentView) {
          this.currentView = state.activeView;
          this.render();
        }
      });

      this.currentView = this.store.getState().activeView;
      this.render();
      console.log('CareBridge AI Initialized.');
    }

    render() {
      const state = this.store.getState();
      const appRoot = document.getElementById('app-root');
      if (!appRoot) return;

      // Fullscreen presentation view
      if (state.activeView === 'presentation') {
        appRoot.innerHTML = window.PresentationView.render();
        return;
      }

      // Landing page view
      if (state.activeView === 'landing') {
        appRoot.innerHTML = window.LandingView.render();
        return;
      }

      // Auth view
      if (state.activeView === 'auth') {
        appRoot.innerHTML = window.AuthView.render();
        return;
      }

      // Standard SaaS App Shell with Left Sidebar & Top Navbar
      appRoot.innerHTML = `
        <div class="min-h-screen bg-slate-50 flex flex-col md:flex-row">
          <!-- Left Sidebar Navigation -->
          <aside class="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between flex-shrink-0 sticky top-0 md:h-screen z-30">
            <div>
              <!-- Logo / Brand Header -->
              <div class="p-5 border-b border-slate-100 flex items-center justify-between cursor-pointer" onclick="CareBridgeStore.setView('dashboard')">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 via-teal-500 to-emerald-500 flex items-center justify-center text-white font-black text-xl shadow-md">
                    CB
                  </div>
                  <div>
                    <span class="font-extrabold text-lg text-slate-900 tracking-tight">CareBridge <span class="text-teal-600">AI</span></span>
                    <span class="text-[10px] text-slate-400 block font-mono">MULTI-AGENT HEALTH</span>
                  </div>
                </div>
              </div>

              <!-- Navigation Menu Items -->
              <nav class="p-3 space-y-1 text-xs font-bold text-slate-600">
                <button onclick="CareBridgeStore.setView('dashboard')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${state.activeView === 'dashboard' ? 'bg-teal-50 text-teal-700 font-extrabold shadow-sm' : 'hover:bg-slate-100 hover:text-slate-900'}">
                  <span class="text-base">📊</span>
                  <span>Family Dashboard</span>
                </button>

                <button onclick="CareBridgeStore.setView('assistant')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${state.activeView === 'assistant' ? 'bg-teal-50 text-teal-700 font-extrabold shadow-sm' : 'hover:bg-slate-100 hover:text-slate-900'}">
                  <span class="text-base">🧠</span>
                  <span>AI Health Assistant</span>
                  <span class="ml-auto w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                </button>

                <button onclick="CareBridgeStore.setView('family')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${state.activeView === 'family' ? 'bg-teal-50 text-teal-700 font-extrabold shadow-sm' : 'hover:bg-slate-100 hover:text-slate-900'}">
                  <span class="text-base">👨‍👩‍👧‍👦</span>
                  <span>Family Members</span>
                </button>

                <button onclick="CareBridgeStore.setView('reports')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${state.activeView === 'reports' ? 'bg-teal-50 text-teal-700 font-extrabold shadow-sm' : 'hover:bg-slate-100 hover:text-slate-900'}">
                  <span class="text-base">📄</span>
                  <span>Medical Reports</span>
                </button>

                <button onclick="CareBridgeStore.setView('medications')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${state.activeView === 'medications' ? 'bg-teal-50 text-teal-700 font-extrabold shadow-sm' : 'hover:bg-slate-100 hover:text-slate-900'}">
                  <span class="text-base">💊</span>
                  <span>Medication Tracker</span>
                </button>

                <button onclick="CareBridgeStore.setView('timeline')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${state.activeView === 'timeline' ? 'bg-teal-50 text-teal-700 font-extrabold shadow-sm' : 'hover:bg-slate-100 hover:text-slate-900'}">
                  <span class="text-base">📅</span>
                  <span>Health Timeline</span>
                </button>

                <button onclick="CareBridgeStore.setView('welfare')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${state.activeView === 'welfare' ? 'bg-teal-50 text-teal-700 font-extrabold shadow-sm' : 'hover:bg-slate-100 hover:text-slate-900'}">
                  <span class="text-base">🏛️</span>
                  <span>Welfare Schemes</span>
                </button>

                <button onclick="CareBridgeStore.setView('emergency')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${state.activeView === 'emergency' ? 'bg-red-50 text-red-700 font-extrabold shadow-sm' : 'hover:bg-slate-100 text-red-600'}">
                  <span class="text-base">🚨</span>
                  <span>Emergency Center</span>
                </button>

                <div class="pt-2 border-t border-slate-100 my-2"></div>

                <button onclick="CareBridgeStore.setView('agents')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${state.activeView === 'agents' ? 'bg-indigo-50 text-indigo-700 font-extrabold shadow-sm' : 'hover:bg-slate-100 text-indigo-700'}">
                  <span class="text-base">⚡</span>
                  <span>AI Agent Activity</span>
                  <span class="ml-auto text-[10px] font-mono bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">7 Live</span>
                </button>

                <button onclick="CareBridgeStore.setView('settings')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${state.activeView === 'settings' ? 'bg-slate-100 text-slate-900' : 'hover:bg-slate-100 hover:text-slate-900'}">
                  <span class="text-base">⚙️</span>
                  <span>Settings</span>
                </button>
              </nav>
            </div>

            <!-- Bottom User Pill & Presentation Trigger -->
            <div class="p-4 border-t border-slate-100 space-y-3">
              <button onclick="CareBridgeStore.setView('presentation')" class="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2">
                <span>🎪 Pitch Deck Mode</span>
              </button>

              <div class="flex items-center gap-3 pt-2">
                <img src="${state.user.avatar}" class="w-9 h-9 rounded-xl object-cover border border-slate-200" />
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-extrabold text-slate-900 truncate">${state.user.name}</p>
                  <p class="text-[10px] text-slate-500 truncate">${state.user.role}</p>
                </div>
                <button onclick="CareBridgeStore.setView('landing')" class="text-slate-400 hover:text-slate-700 text-xs" title="Sign Out">
                  🚪
                </button>
              </div>
            </div>
          </aside>

          <!-- Main Content Area -->
          <div class="flex-1 flex flex-col min-w-0 overflow-y-auto">
            <!-- Top App Bar -->
            <header class="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
              <!-- Breadcrumbs / Active Context -->
              <div class="flex items-center gap-2 text-xs">
                <span class="text-slate-400 font-semibold cursor-pointer" onclick="CareBridgeStore.setView('landing')">CareBridge AI</span>
                <span class="text-slate-300">/</span>
                <span class="text-slate-900 font-bold capitalize">${state.activeView.replace(/([A-Z])/g, ' $1')}</span>
              </div>

              <!-- Top Controls: Active Family Member Switcher, Notification Bell, Hackathon Demo Bar -->
              <div class="flex items-center gap-3">
                <!-- Member Pill -->
                <div class="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
                  <span class="text-slate-400">Context:</span>
                  <select onchange="CareBridgeStore.setActiveMember(this.value)" class="bg-transparent font-bold text-teal-700 focus:outline-none cursor-pointer">
                    ${state.familyMembers.map(m => `<option value="${m.id}" ${m.id === state.activeMemberId ? 'selected' : ''}>${m.name}</option>`).join('')}
                  </select>
                </div>

                <!-- Notifications Dropdown Trigger -->
                <div class="relative">
                  <button onclick="App.toggleNotifDropdown()" class="p-2 rounded-xl text-slate-600 hover:bg-slate-100 relative">
                    <span>🔔</span>
                    ${state.notifications.some(n => !n.read) ? `
                      <span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
                    ` : ''}
                  </button>

                  <div id="notif-dropdown" class="hidden absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 text-left animate-scaleUp">
                    <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span class="text-xs font-black text-slate-900">Notifications</span>
                      <button onclick="CareBridgeStore.markAllNotificationsRead(); App.renderCurrentView();" class="text-[10px] font-bold text-teal-600 hover:underline">Mark all read</button>
                    </div>
                    <div class="space-y-2 mt-2 max-h-60 overflow-y-auto">
                      ${state.notifications.map(n => `
                        <div class="p-2.5 rounded-xl ${n.read ? 'bg-slate-50' : 'bg-teal-50/50 border border-teal-200'} text-xs">
                          <p class="font-bold text-slate-900">${n.title}</p>
                          <p class="text-slate-600 text-[11px] mt-0.5">${n.message}</p>
                          <span class="text-[9px] text-slate-400 block mt-1">${n.time}</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <!-- 1-Click Quick Demo Launcher -->
                <button onclick="DemoScenarios.runScenario('scenario_blood_report')" class="px-3 py-1.5 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-900 font-bold text-xs border border-teal-300 transition flex items-center gap-1.5 shadow-sm">
                  <span>🎯 Demo Mode</span>
                </button>
              </div>
            </header>

            <!-- Dynamic View Container -->
            <main class="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto pb-24">
              ${this.getViewContent(state.activeView)}
            </main>
          </div>
        </div>

        <!-- Floating Hackathon Demo Bar -->
        <div class="floating-demo-bar hidden sm:flex items-center gap-2 p-2 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700 text-white shadow-2xl text-xs font-semibold">
          <span class="px-2 text-teal-400 font-bold flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            🎯 Hackathon Scenarios:
          </span>
          <button onclick="DemoScenarios.runScenario('scenario_blood_report')" class="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition">
            1. Blood Report Analysis
          </button>
          <button onclick="DemoScenarios.runScenario('scenario_emergency')" class="px-2.5 py-1.5 rounded-xl bg-red-600/60 hover:bg-red-600 transition">
            2. Emergency Intercept
          </button>
          <button onclick="DemoScenarios.runScenario('scenario_welfare')" class="px-2.5 py-1.5 rounded-xl bg-amber-600/60 hover:bg-amber-600 transition">
            3. Welfare Match
          </button>
          <button onclick="DemoScenarios.runScenario('scenario_medication')" class="px-2.5 py-1.5 rounded-xl bg-emerald-600/60 hover:bg-emerald-600 transition">
            4. Med Schedule
          </button>
        </div>
      `;
    }

    getViewContent(viewName) {
      switch (viewName) {
        case 'dashboard': return window.DashboardView.render();
        case 'assistant': return window.AssistantView.render();
        case 'family': return window.FamilyView.render();
        case 'reports': return window.ReportsView.render();
        case 'medications': return window.MedicationsView.render();
        case 'timeline': return window.TimelineView.render();
        case 'welfare': return window.WelfareView.render();
        case 'emergency': return window.EmergencyView.render();
        case 'agents': return window.AgentActivityView.render();
        case 'settings': return window.SettingsView.render();
        default: return window.DashboardView.render();
      }
    }

    renderCurrentView() {
      this.render();
    }

    toggleNotifDropdown() {
      const dropdown = document.getElementById('notif-dropdown');
      if (dropdown) dropdown.classList.toggle('hidden');
    }
  }

  window.App = new AppController();

  document.addEventListener('DOMContentLoaded', () => {
    window.App.init();
  });
})(window);
