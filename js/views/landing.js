// View 1: Landing Page Component
(function(window) {
  'use strict';

  const LandingView = {
    render() {
      return `
        <div class="min-h-screen bg-slate-50">
          <!-- Top Landing Navigation -->
          <header class="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div class="flex items-center gap-3 cursor-pointer" onclick="CareBridgeStore.setView('landing')">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                  CB
                </div>
                <div>
                  <span class="font-extrabold text-xl tracking-tight text-slate-900">CareBridge <span class="text-teal-600 font-black">AI</span></span>
                  <span class="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">Multi-Agent</span>
                </div>
              </div>

              <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                <a href="#how-it-works" class="hover:text-teal-600 transition">How It Works</a>
                <a href="#agents" class="hover:text-teal-600 transition">Multi-Agent System</a>
                <a href="#features" class="hover:text-teal-600 transition">Key Features</a>
                <a href="#safety" class="hover:text-teal-600 transition">Safety & Ethics</a>
                <a href="#presentation" onclick="CareBridgeStore.setView('presentation')" class="text-indigo-600 font-semibold flex items-center gap-1 hover:text-indigo-700">
                  <span>🎪 Pitch Deck</span>
                </a>
              </nav>

              <div class="flex items-center gap-3">
                <button onclick="CareBridgeStore.setView('presentation')" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition">
                  <span>🎪 Pitch Deck</span>
                </button>
                <button onclick="CareBridgeStore.setView('dashboard')" class="px-4 py-2 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2">
                  <span>Launch Dashboard</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </header>

          <!-- Hero Section -->
          <section class="relative pt-16 pb-20 overflow-hidden bg-gradient-to-b from-white via-sky-50/40 to-slate-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-6">
                <span class="w-2 h-2 rounded-full bg-teal-600 animate-ping"></span>
                <span>Hackathon MVP Ready • Health & Family Welfare</span>
              </div>
              
              <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
                CareBridge <span class="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-sky-600 to-indigo-600">AI</span>
              </h1>
              <p class="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-700 tracking-tight">
                “One Family. One Health Intelligence.”
              </p>
              <p class="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                An intelligent multi-agent platform that helps families understand complex health reports, organize medication schedules, track preventive milestones, and discover eligible government welfare programs—safely and cohesively.
              </p>

              <div class="mt-10 flex flex-wrap justify-center gap-4">
                <button onclick="CareBridgeStore.setView('dashboard')" class="px-8 py-4 text-base font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5 flex items-center gap-3">
                  <span>Get Started (Demo Login)</span>
                  <span class="text-teal-400">👋</span>
                </button>
                <button onclick="CareBridgeStore.setView('agents')" class="px-8 py-4 text-base font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-2xl shadow-sm hover:shadow transition flex items-center gap-2">
                  <span>Explore 7 AI Agents</span>
                  <span class="text-indigo-600">⚡</span>
                </button>
                <button onclick="DemoScenarios.runScenario('scenario_blood_report')" class="px-8 py-4 text-base font-bold text-teal-900 bg-teal-100 hover:bg-teal-200 border border-teal-300 rounded-2xl shadow-sm transition flex items-center gap-2">
                  <span>🎯 Run Hackathon Demo Flow</span>
                </button>
              </div>

              <!-- Safety Disclaimer Banner -->
              <div class="mt-10 max-w-2xl mx-auto p-3.5 bg-amber-50/90 border border-amber-200 rounded-xl text-xs text-amber-900 text-left flex items-start gap-3">
                <span class="text-lg">🛡️</span>
                <div>
                  <strong class="font-bold">Medical Disclaimer:</strong> CareBridge AI is an informational coordination tool designed for family health organization. It does <strong>not</strong> provide medical diagnoses, replace certified doctors, or prescribe treatments.
                </div>
              </div>
            </div>

            <!-- Visual Multi-Agent Architecture Graphic -->
            <div class="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
                <div class="absolute top-0 right-0 p-4 text-xs font-mono font-semibold text-slate-400">
                  ARCHITECTURE: HUB-AND-SPOKE MULTI-AGENT
                </div>

                <div class="text-center mb-8">
                  <span class="text-xs font-bold text-teal-600 uppercase tracking-widest">Autonomous Orchestration</span>
                  <h3 class="text-2xl font-black text-slate-900 mt-1">Multi-Agent Workflow in Action</h3>
                </div>

                <!-- User Node -->
                <div class="flex flex-col items-center">
                  <div class="px-5 py-2.5 rounded-2xl bg-slate-900 text-white font-bold text-sm shadow-md flex items-center gap-2 border border-slate-700">
                    <span>👤 Family User Query / Lab Report</span>
                  </div>
                  <div class="w-0.5 h-8 bg-slate-300"></div>

                  <!-- Coordinator Node -->
                  <div class="px-6 py-3.5 rounded-2xl bg-indigo-600 text-white font-extrabold text-base shadow-xl flex items-center gap-3 border-2 border-indigo-400 agent-pulse-active">
                    <span class="text-xl">🧠</span>
                    <div>
                      <div>HEALTH COORDINATOR AGENT</div>
                      <div class="text-[11px] font-normal opacity-90">Intent Analysis • Task Decomposition • Safety Routing</div>
                    </div>
                  </div>
                  
                  <!-- Connector branches -->
                  <div class="w-0.5 h-6 bg-slate-300"></div>
                  <div class="w-full max-w-4xl h-0.5 bg-slate-300 relative">
                    <div class="absolute -top-1.5 left-1/4 w-3 h-3 rounded-full bg-slate-400"></div>
                    <div class="absolute -top-1.5 left-2/4 w-3 h-3 rounded-full bg-slate-400"></div>
                    <div class="absolute -top-1.5 left-3/4 w-3 h-3 rounded-full bg-slate-400"></div>
                  </div>
                </div>

                <!-- 4 Core Sub-Agents Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <div class="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-left">
                    <div class="flex items-center gap-2 text-sky-700 font-bold text-sm">
                      <span>🩺</span> Health Assessment Agent
                    </div>
                    <p class="text-xs text-slate-600 mt-1.5">Evaluates user symptoms, gauges urgency, and crafts doctor discussion topics.</p>
                  </div>

                  <div class="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-left">
                    <div class="flex items-center gap-2 text-teal-700 font-bold text-sm">
                      <span>📄</span> Medical Report Agent
                    </div>
                    <p class="text-xs text-slate-600 mt-1.5">Performs OCR extraction, checks lab reference ranges, and flags deviations.</p>
                  </div>

                  <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left">
                    <div class="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                      <span>💊</span> Medication Agent
                    </div>
                    <p class="text-xs text-slate-600 mt-1.5">Monitors schedules, calculates adherence, and checks for duplicate timing.</p>
                  </div>

                  <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left">
                    <div class="flex items-center gap-2 text-amber-700 font-bold text-sm">
                      <span>🏛️</span> Welfare Scheme Agent
                    </div>
                    <p class="text-xs text-slate-600 mt-1.5">Matches public welfare programs (PM-JAY, RVY) with family eligibility.</p>
                  </div>
                </div>

                <!-- Safety Filter & Final Plan Nodes -->
                <div class="mt-6 pt-6 border-t border-slate-100 flex flex-col items-center">
                  <div class="w-0.5 h-6 bg-slate-300"></div>
                  <div class="px-6 py-2.5 rounded-2xl bg-red-50 text-red-800 border border-red-200 font-bold text-xs flex items-center gap-2 shadow-sm">
                    <span>🚨</span> Emergency Safety Agent (Red-Flag Watchdog & Non-Diagnostic Filter)
                  </div>
                  <div class="w-0.5 h-6 bg-slate-300"></div>
                  <div class="px-8 py-3 rounded-2xl bg-emerald-600 text-white font-extrabold text-sm shadow-lg flex items-center gap-2">
                    <span>📋</span> Unified Family Health Action Plan & Clinician Questions
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Problem vs Solution Section -->
          <section id="how-it-works" class="py-20 bg-white border-y border-slate-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="text-center max-w-3xl mx-auto">
                <span class="text-xs font-bold text-teal-600 uppercase tracking-widest">Healthcare Fragmented No More</span>
                <h2 class="text-3xl sm:text-4xl font-black text-slate-900 mt-2">Why Families Need CareBridge AI</h2>
                <p class="text-slate-600 mt-4 text-base sm:text-lg">Managing health across 3 generations shouldn't mean drowning in unreadable lab papers, missed doses, and overlooked government benefits.</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
                <!-- Problem Card -->
                <div class="p-8 rounded-3xl bg-red-50/50 border border-red-200 text-left">
                  <div class="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl font-bold mb-6">
                    ✕
                  </div>
                  <h3 class="text-2xl font-extrabold text-red-950">The Problem</h3>
                  <ul class="mt-4 space-y-3 text-sm text-red-900">
                    <li class="flex items-start gap-2.5">
                      <span class="text-red-500 font-bold">●</span>
                      <span><strong>Cryptic Medical Reports:</strong> Families struggle to understand laboratory reference ranges and clinical abbreviations.</span>
                    </li>
                    <li class="flex items-start gap-2.5">
                      <span class="text-red-500 font-bold">●</span>
                      <span><strong>Medication Non-Adherence:</strong> Elderly parents often forget doses or mix up morning and night timings.</span>
                    </li>
                    <li class="flex items-start gap-2.5">
                      <span class="text-red-500 font-bold">●</span>
                      <span><strong>Overlooked Welfare Schemes:</strong> Billions in government health subsidies and assistive aid go unclaimed due to lack of awareness.</span>
                    </li>
                    <li class="flex items-start gap-2.5">
                      <span class="text-red-500 font-bold">●</span>
                      <span><strong>Dangerous Web Self-Diagnosis:</strong> Generic search engines cause panic instead of actionable doctor preparation.</span>
                    </li>
                  </ul>
                </div>

                <!-- Solution Card -->
                <div class="p-8 rounded-3xl bg-emerald-50/50 border border-emerald-200 text-left">
                  <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-bold mb-6">
                    ✓
                  </div>
                  <h3 class="text-2xl font-extrabold text-emerald-950">The CareBridge AI Solution</h3>
                  <ul class="mt-4 space-y-3 text-sm text-emerald-900">
                    <li class="flex items-start gap-2.5">
                      <span class="text-emerald-600 font-bold">●</span>
                      <span><strong>7 Specialized AI Agents:</strong> Coordinated by a central intelligence that delegates tasks to domain experts.</span>
                    </li>
                    <li class="flex items-start gap-2.5">
                      <span class="text-emerald-600 font-bold">●</span>
                      <span><strong>Plain-English Diagnostic Summaries:</strong> Visual gauge bars comparing patient values to reference ranges.</span>
                    </li>
                    <li class="flex items-start gap-2.5">
                      <span class="text-emerald-600 font-bold">●</span>
                      <span><strong>Smart Welfare Discovery:</strong> Automatically matches family demographic profiles against verified state and national schemes.</span>
                    </li>
                    <li class="flex items-start gap-2.5">
                      <span class="text-emerald-600 font-bold">●</span>
                      <span><strong>Emergency Safety Guardrails:</strong> Instant acute red-flag intercept with local trauma helpline routing.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <!-- 7 AI Agents Roster -->
          <section id="agents" class="py-20 bg-slate-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="text-center max-w-3xl mx-auto">
                <span class="text-xs font-bold text-teal-600 uppercase tracking-widest">Multi-Agent Intelligence</span>
                <h2 class="text-3xl sm:text-4xl font-black text-slate-900 mt-2">Meet Your 7 Healthcare Agents</h2>
                <p class="text-slate-600 mt-4">Each agent specializes in a distinct facet of family wellness, working collaboratively under the Health Coordinator.</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
                ${CareBridgeStore.getState().agents.map(agent => `
                  <div class="health-card p-6 text-left relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <div class="flex items-center justify-between">
                        <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl text-teal-600 font-bold">
                          ●
                        </div>
                        <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          ${agent.status.toUpperCase()}
                        </span>
                      </div>
                      <h4 class="text-lg font-bold text-slate-900 mt-4">${agent.name}</h4>
                      <p class="text-xs font-semibold text-teal-700 mb-2">${agent.role}</p>
                      <p class="text-xs text-slate-600 leading-relaxed">${agent.description}</p>
                    </div>
                    <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Avg Latency: ${agent.latency}</span>
                      <span>Tasks: ${agent.tasksCompleted}</span>
                    </div>
                  </div>
                `).join('')}
              </div>

              <div class="mt-12 text-center">
                <button onclick="CareBridgeStore.setView('agents')" class="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition">
                  View Live Agent Activity Center →
                </button>
              </div>
            </div>
          </section>

          <!-- Key Features Grid -->
          <section id="features" class="py-20 bg-white border-y border-slate-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="text-center max-w-3xl mx-auto">
                <span class="text-xs font-bold text-teal-600 uppercase tracking-widest">Built for Real Families</span>
                <h2 class="text-3xl sm:text-4xl font-black text-slate-900 mt-2">Comprehensive Family Health Suite</h2>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
                <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div class="text-3xl mb-4">📄</div>
                  <h4 class="text-lg font-bold text-slate-900">Medical Report OCR & Analysis</h4>
                  <p class="text-sm text-slate-600 mt-2">Upload lab PDFs or photos. Medical Report Agent extracts values and flags out-of-range parameters with visual gauge bars.</p>
                </div>

                <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div class="text-3xl mb-4">💊</div>
                  <h4 class="text-lg font-bold text-slate-900">Interactive Medication Tracker</h4>
                  <p class="text-sm text-slate-600 mt-2">Time-slotted doses (8 AM / 1 PM / 8 PM) with 1-click adherence logging, streak metrics, and low refill warnings.</p>
                </div>

                <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div class="text-3xl mb-4">🏛️</div>
                  <h4 class="text-lg font-bold text-slate-900">Welfare & Subsidy Navigator</h4>
                  <p class="text-sm text-slate-600 mt-2">Discovers government schemes (PM-JAY, Rashtriya Vayoshri, Matru Vandana) with required document checklists and official portal links.</p>
                </div>

                <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div class="text-3xl mb-4">🚨</div>
                  <h4 class="text-lg font-bold text-slate-900">Emergency Center & Watchdog</h4>
                  <p class="text-sm text-slate-600 mt-2">Monitors all interactions for acute symptoms. 1-tap SOS dialer to Ambulance (108), Emergency (112), and local trauma centers.</p>
                </div>

                <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div class="text-3xl mb-4">📅</div>
                  <h4 class="text-lg font-bold text-slate-900">Health Timeline Stream</h4>
                  <p class="text-sm text-slate-600 mt-2">Chronological record of doctor visits, lab reports, vaccinations, and welfare enrollments with multi-member filters.</p>
                </div>

                <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div class="text-3xl mb-4">🎪</div>
                  <h4 class="text-lg font-bold text-slate-900">Hackathon Presentation Mode</h4>
                  <p class="text-sm text-slate-600 mt-2">Integrated 5-slide pitch deck ready for judging presentations with problem, architecture, live demo, and impact metrics.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Safety & Ethics -->
          <section id="safety" class="py-20 bg-slate-900 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="max-w-3xl mx-auto text-center">
                <span class="text-xs font-bold text-teal-400 uppercase tracking-widest">Ethics & Safety By Design</span>
                <h2 class="text-3xl sm:text-4xl font-black mt-2">Healthcare AI That Knows Its Limits</h2>
                <p class="text-slate-400 mt-4 text-base">We prioritize safety, patient dignity, and clinical boundaries above all else.</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
                <div class="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <div class="text-red-400 text-2xl font-bold mb-2">🚫 Zero Diagnosis</div>
                  <p class="text-xs text-slate-300">CareBridge AI explicitly refuses to formulate medical diagnoses, guiding users to licensed clinicians instead.</p>
                </div>

                <div class="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <div class="text-red-400 text-2xl font-bold mb-2">🚫 No Prescribing</div>
                  <p class="text-xs text-slate-300">Agents never suggest altering dosage or stopping prescribed therapy without physician guidance.</p>
                </div>

                <div class="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <div class="text-teal-400 text-2xl font-bold mb-2">⚡ Instant SOS Intercept</div>
                  <p class="text-xs text-slate-300">Acute symptoms immediately trigger emergency helpline numbers (108/112) without delaying care.</p>
                </div>

                <div class="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <div class="text-amber-400 text-2xl font-bold mb-2">🔒 Privacy Shield</div>
                  <p class="text-xs text-slate-300">No real patient data required. Local client encryption with transparent agent audit trails.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Footer CTA -->
          <footer class="bg-white py-12 border-t border-slate-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-sm">
                  CB
                </div>
                <span class="font-bold text-slate-900">CareBridge AI</span>
                <span class="text-xs text-slate-500">© 2026 Hackathon Edition</span>
              </div>
              <div class="flex items-center gap-4">
                <button onclick="CareBridgeStore.setView('dashboard')" class="px-5 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-sm shadow hover:bg-teal-700 transition">
                  Open Family Dashboard
                </button>
              </div>
            </div>
          </footer>
        </div>
      `;
    }
  };

  window.LandingView = LandingView;
})(window);
