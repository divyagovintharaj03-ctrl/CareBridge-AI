// View 13: Hackathon Presentation Mode (Fullscreen Pitch Deck)
(function(window) {
  'use strict';

  let currentSlide = 0;

  const slides = [
    {
      title: 'CareBridge AI',
      subtitle: 'One Family. One Health Intelligence.',
      category: 'HACKATHON PITCH • HEALTH & FAMILY WELFARE',
      content: `
        <div class="space-y-6 text-center max-w-3xl mx-auto py-8">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/40">
            <span>🚀 Hackathon 2026 Grand Finalist</span>
          </div>
          <h1 class="text-5xl sm:text-7xl font-black text-white tracking-tight leading-tight">
            CareBridge <span class="text-teal-400">AI</span>
          </h1>
          <p class="text-2xl sm:text-3xl font-extrabold text-slate-300">
            “One Family. One Health Intelligence.”
          </p>
          <p class="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The first autonomous multi-agent healthcare coordination ecosystem designed to organize multi-generational health records, demystify diagnostic reports, track medications, and match public welfare schemes.
          </p>

          <div class="grid grid-cols-3 gap-4 pt-6 text-left">
            <div class="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span class="text-2xl block mb-1">🧠</span>
              <strong class="text-white text-sm block">7 Specialized Agents</strong>
              <span class="text-xs text-slate-400">Coordinated by central Health Orchestrator</span>
            </div>
            <div class="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span class="text-2xl block mb-1">🛡️</span>
              <strong class="text-white text-sm block">Strict Clinical Ethics</strong>
              <span class="text-xs text-slate-400">100% Non-diagnostic with instant SOS intercept</span>
            </div>
            <div class="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span class="text-2xl block mb-1">🏛️</span>
              <strong class="text-white text-sm block">Welfare Navigator</strong>
              <span class="text-xs text-slate-400">Directly maps PM-JAY & State health programs</span>
            </div>
          </div>
        </div>
      `
    },
    {
      title: 'The Problem: Fragmented Healthcare',
      subtitle: 'Families are overwhelmed and underserved by disconnected health tools',
      category: 'PROBLEM STATEMENT',
      content: `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 text-left">
          <div class="p-6 rounded-3xl bg-red-950/40 border border-red-800/60 flex flex-col justify-between">
            <div>
              <span class="text-3xl mb-3 block">📄</span>
              <h3 class="text-xl font-bold text-red-200">Cryptic Lab Reports</h3>
              <p class="text-xs text-slate-300 mt-2 leading-relaxed">
                Patients receive complex pathology documents with arcane abbreviations (Hb, MCV, TSH) and cannot contextualize what requires immediate medical discussion.
              </p>
            </div>
            <span class="text-[11px] text-red-400 font-mono mt-4">82% of patients feel anxious reading raw reports</span>
          </div>

          <div class="p-6 rounded-3xl bg-amber-950/40 border border-amber-800/60 flex flex-col justify-between">
            <div>
              <span class="text-3xl mb-3 block">💊</span>
              <h3 class="text-xl font-bold text-amber-200">Medication Chaos</h3>
              <p class="text-xs text-slate-300 mt-2 leading-relaxed">
                Multi-generational families juggle 10+ daily prescriptions across grandparents, parents, and children, leading to missed doses and dangerous duplicate timings.
              </p>
            </div>
            <span class="text-[11px] text-amber-400 font-mono mt-4">50% chronic medicine non-adherence rate globally</span>
          </div>

          <div class="p-6 rounded-3xl bg-indigo-950/40 border border-indigo-800/60 flex flex-col justify-between">
            <div>
              <span class="text-3xl mb-3 block">🏛️</span>
              <h3 class="text-xl font-bold text-indigo-200">Unclaimed Welfare Benefits</h3>
              <p class="text-xs text-slate-300 mt-2 leading-relaxed">
                Billions in government health insurance (Ayushman Bharat, RVY senior aid) go unclaimed simply because families don't know they are eligible.
              </p>
            </div>
            <span class="text-[11px] text-indigo-400 font-mono mt-4">60%+ eligible seniors lack program awareness</span>
          </div>
        </div>
      `
    },
    {
      title: 'Our Innovation: Autonomous Multi-Agent Mesh',
      subtitle: 'Why a single LLM chatbot fails—and why specialized agents win',
      category: 'INNOVATION & ARCHITECTURE',
      content: `
        <div class="space-y-6 py-4 text-left">
          <div class="p-6 rounded-3xl bg-white/5 border border-white/10">
            <h4 class="text-sm font-bold text-teal-400 uppercase tracking-wider mb-3">The Multi-Agent Advantage</h4>
            <p class="text-xs text-slate-300 leading-relaxed">
              Standard chatbots hallucinate dangerous medical advice. CareBridge AI replaces monolithic models with a **Hub-and-Spoke Mesh** of 7 specialized autonomous agents, each bounded by strict domain instructions and verified by an independent Emergency Safety Watchdog.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div class="p-3 rounded-2xl bg-indigo-900/40 border border-indigo-700/60">
              <strong class="text-white block font-bold">1. Coordinator Agent</strong>
              <span class="text-slate-400 text-[11px]">Intent & task decomposition</span>
            </div>
            <div class="p-3 rounded-2xl bg-teal-900/40 border border-teal-700/60">
              <strong class="text-white block font-bold">2. Medical Report Agent</strong>
              <span class="text-slate-400 text-[11px]">OCR & Reference range math</span>
            </div>
            <div class="p-3 rounded-2xl bg-emerald-900/40 border border-emerald-700/60">
              <strong class="text-white block font-bold">3. Medication Agent</strong>
              <span class="text-slate-400 text-[11px]">Schedule & refill guardian</span>
            </div>
            <div class="p-3 rounded-2xl bg-rose-900/40 border border-rose-700/60">
              <strong class="text-white block font-bold">4. Family Wellness Agent</strong>
              <span class="text-slate-400 text-[11px]">Vaccines & checkup milestones</span>
            </div>
            <div class="p-3 rounded-2xl bg-amber-900/40 border border-amber-700/60">
              <strong class="text-white block font-bold">5. Welfare Scheme Agent</strong>
              <span class="text-slate-400 text-[11px]">Government benefit matcher</span>
            </div>
            <div class="p-3 rounded-2xl bg-red-900/40 border border-red-700/60">
              <strong class="text-white block font-bold">6. Emergency Watchdog</strong>
              <span class="text-slate-400 text-[11px]">Acute red-flag intercept</span>
            </div>
            <div class="p-3 rounded-2xl bg-cyan-900/40 border border-cyan-700/60">
              <strong class="text-white block font-bold">7. Health Summary Agent</strong>
              <span class="text-slate-400 text-[11px]">Doctor discussion preparation</span>
            </div>
            <div class="p-3 rounded-2xl bg-emerald-800/40 border border-emerald-500/60">
              <strong class="text-white block font-bold">Family Action Plan</strong>
              <span class="text-slate-400 text-[11px]">Safe, unified family dashboard</span>
            </div>
          </div>
        </div>
      `
    },
    {
      title: 'Live Hackathon Demonstration Flow',
      subtitle: 'Witness autonomous multi-agent delegation in real time',
      category: 'LIVE DEMO FLOW',
      content: `
        <div class="py-6 space-y-6 text-left max-w-3xl mx-auto">
          <div class="p-6 rounded-3xl bg-gradient-to-r from-teal-900/60 to-indigo-900/60 border border-teal-500/50 space-y-4">
            <span class="text-xs font-bold text-teal-300 uppercase">Primary Scenario</span>
            <h3 class="text-xl font-bold text-white">Grandfather Ramesh's CBC Blood Report Analysis</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              1. Ramesh's CBC test is uploaded.<br/>
              2. <strong>Coordinator</strong> routes to <strong>Medical Report Agent</strong>.<br/>
              3. Flagged: Hemoglobin 10.2 g/dL (Low), Serum Ferritin 18 ng/mL (Low).<br/>
              4. <strong>Safety Agent</strong> ensures zero unauthorized diagnosis.<br/>
              5. <strong>Summary Agent</strong> formats questions for his diabetologist.<br/>
              6. <strong>Welfare Agent</strong> matches Rashtriya Vayoshri senior benefits.
            </p>

            <button onclick="CareBridgeStore.setView('dashboard'); DemoScenarios.runScenario('scenario_blood_report');" class="px-6 py-3 bg-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-lg hover:bg-teal-300 transition flex items-center gap-2">
              <span>▶ Launch Scenario 1 Live Demo</span>
            </button>
          </div>
        </div>
      `
    },
    {
      title: 'Impact & Future Roadmap',
      subtitle: 'Transforming family welfare into proactive, safe intelligence',
      category: 'IMPACT & SCALABILITY',
      content: `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 text-left">
          <div class="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-3">
            <h4 class="text-base font-bold text-emerald-400">Social & Healthcare Impact</h4>
            <ul class="space-y-2 text-xs text-slate-300">
              <li>✓ <strong>Democratizes Medical Literacy:</strong> Translates complex lab values into plain English with doctor questions.</li>
              <li>✓ <strong>Increases Welfare Uptake:</strong> Bridges low and middle-income families to government healthcare entitlements.</li>
              <li>✓ <strong>Prevents Drug Errors:</strong> Safeguards elderly medication schedules and flags refill shortages early.</li>
            </ul>
          </div>

          <div class="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-3">
            <h4 class="text-base font-bold text-teal-400">Production Roadmap</h4>
            <ul class="space-y-2 text-xs text-slate-300">
              <li>● <strong>ABDM (Ayushman Bharat Digital Mission) FHIR Connector:</strong> Direct sync with Government Electronic Health Records.</li>
              <li>● <strong>WhatsApp / Voice Bot Integration:</strong> Voice agent for vernacular regional language support for seniors.</li>
              <li>● <strong>IoT Vitals Integration:</strong> Real-time BP & Glucose telemetry streaming.</li>
            </ul>
          </div>
        </div>
      `
    }
  ];

  const PresentationView = {
    render() {
      const slide = slides[currentSlide];

      return `
        <div class="pitch-deck-container flex flex-col justify-between p-6 sm:p-12 animate-fadeIn select-none">
          <!-- Top Bar -->
          <div class="flex items-center justify-between border-b border-white/10 pb-4">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-teal-500 text-slate-950 font-black flex items-center justify-center text-sm shadow">
                CB
              </div>
              <div>
                <span class="font-extrabold text-sm text-white">CareBridge AI Pitch Deck</span>
                <span class="text-[10px] text-teal-400 block font-mono">${slide.category}</span>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <button onclick="CareBridgeStore.setView('dashboard')" class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/10 transition">
                Exit Deck to App ✕
              </button>
            </div>
          </div>

          <!-- Slide Core Body -->
          <div class="flex-1 flex flex-col justify-center my-6">
            <div class="max-w-5xl mx-auto w-full">
              <div class="text-center mb-6">
                <span class="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">${slide.category}</span>
                <h2 class="text-3xl sm:text-5xl font-black text-white mt-1">${slide.title}</h2>
                <p class="text-sm sm:text-base text-slate-400 mt-2">${slide.subtitle}</p>
              </div>

              ${slide.content}
            </div>
          </div>

          <!-- Bottom Slide Controller -->
          <div class="flex items-center justify-between border-t border-white/10 pt-4">
            <div class="flex items-center gap-2">
              ${slides.map((_, idx) => `
                <button onclick="PresentationView.goToSlide(${idx})" class="w-3 h-3 rounded-full transition ${idx === currentSlide ? 'bg-teal-400 w-8' : 'bg-white/20 hover:bg-white/40'}"></button>
              `).join('')}
            </div>

            <div class="flex items-center gap-3">
              <span class="text-xs font-mono text-slate-400 mr-2">Slide ${currentSlide + 1} of ${slides.length}</span>
              <button onclick="PresentationView.prev()" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition ${currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : ''}" ${currentSlide === 0 ? 'disabled' : ''}>
                ← Previous
              </button>
              <button onclick="PresentationView.next()" class="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition">
                ${currentSlide === slides.length - 1 ? 'Start Live Demo ▶' : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      `;
    },

    goToSlide(idx) {
      currentSlide = idx;
      window.App.renderCurrentView();
    },

    prev() {
      if (currentSlide > 0) {
        currentSlide--;
        window.App.renderCurrentView();
      }
    },

    next() {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        window.App.renderCurrentView();
      } else {
        window.CareBridgeStore.setView('dashboard');
      }
    }
  };

  // Keyboard navigation for pitch deck
  window.addEventListener('keydown', (e) => {
    if (window.CareBridgeStore && window.CareBridgeStore.getState().activeView === 'presentation') {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        PresentationView.next();
      } else if (e.key === 'ArrowLeft') {
        PresentationView.prev();
      } else if (e.key === 'Escape') {
        window.CareBridgeStore.setView('dashboard');
      }
    }
  });

  window.PresentationView = PresentationView;
})(window);
