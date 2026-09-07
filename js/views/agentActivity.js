// View 11: AI Agent Activity Center (The Signature Hackathon Showpiece)
(function(window) {
  'use strict';

  let simulationRunning = false;
  let simulatedTask = 'Explain uploaded blood report (CBC & Iron Profile)';
  let simulatedSteps = [
    { label: 'Request received from family user', status: 'completed' },
    { label: 'Health Coordinator Agent activated & intent classified', status: 'completed' },
    { label: 'Medical Report Agent analyzing document & reference ranges', status: 'completed' },
    { label: 'Emergency Safety Agent reviewing outputs for clinical guardrails', status: 'completed' },
    { label: 'Health Summary Agent generating doctor consultation guide', status: 'completed' },
    { label: 'Final structured response delivered to family dashboard', status: 'completed' }
  ];

  const AgentActivityView = {
    render() {
      const state = window.CareBridgeStore.getState();
      const agents = state.agents;
      const logs = state.agentLogs;

      return `
        <div class="space-y-8 animate-fadeIn">
          <!-- Header -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold mb-1">
                <span>⚡ Multi-Agent Runtime & Telemetry</span>
              </div>
              <h1 class="text-3xl font-black text-slate-900 tracking-tight">AI Agent Activity & Orchestration Center</h1>
              <p class="text-xs text-slate-500 mt-1">Real-time inspection of autonomous multi-agent task decomposition, execution trace, and event streaming.</p>
            </div>

            <div class="flex items-center gap-3">
              <button onclick="AgentActivityView.triggerLiveSimulation()" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2 ${simulationRunning ? 'opacity-50 cursor-not-allowed' : ''}" ${simulationRunning ? 'disabled' : ''}>
                <span>${simulationRunning ? '⚡ Running Simulation...' : '▶ Simulate Agent Workflow'}</span>
              </button>
            </div>
          </div>

          <!-- Current Active Task / Animated Workflow Pipeline -->
          <div class="health-card p-6 sm:p-8 bg-slate-900 text-white shadow-2xl relative overflow-hidden">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span class="text-[10px] font-bold text-teal-400 uppercase tracking-widest block">ACTIVE ORCHESTRATION PIPELINE</span>
                <h3 class="text-xl font-black text-white mt-1">Task: “${simulatedTask}”</h3>
              </div>
              <span class="text-xs font-mono px-3 py-1 rounded-full ${simulationRunning ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}">
                ${simulationRunning ? 'ORCHESTRATING SUB-AGENTS...' : '● PIPELINE COMPLETE (100%)'}
              </span>
            </div>

            <!-- Visual Flow Stages -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              ${simulatedSteps.map((step, idx) => `
                <div class="p-4 rounded-2xl ${step.status === 'completed' ? 'bg-slate-800/90 border border-teal-500/50' : step.status === 'active' ? 'bg-indigo-900/60 border-2 border-indigo-400 agent-pulse-active' : 'bg-slate-800/30 border border-slate-800'} text-left transition duration-300">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-mono font-bold ${step.status === 'completed' ? 'text-teal-400' : step.status === 'active' ? 'text-amber-400' : 'text-slate-500'}">
                      STAGE 0${idx + 1}
                    </span>
                    <span class="text-xs font-bold ${step.status === 'completed' ? 'text-emerald-400' : step.status === 'active' ? 'text-amber-400' : 'text-slate-500'}">
                      ${step.status === 'completed' ? '✓ DONE' : step.status === 'active' ? '⚡ RUNNING' : 'PENDING'}
                    </span>
                  </div>
                  <p class="text-xs font-medium text-slate-200 mt-2">${step.label}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 7 Active Agent Roster Cards Grid -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-black text-slate-900">7 Registered Autonomous Agents</h3>
              <span class="text-xs font-mono text-emerald-600 font-bold">ALL AGENTS ONLINE (100% HEALTH)</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              ${agents.map(agent => `
                <div class="health-card p-5 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between">
                      <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ONLINE
                      </span>
                    </div>
                    <h4 class="font-extrabold text-sm text-slate-900 mt-3">${agent.name}</h4>
                    <p class="text-[11px] font-semibold text-teal-700 mt-0.5">${agent.role}</p>
                    <p class="text-xs text-slate-500 mt-2 line-clamp-3">${agent.description}</p>
                  </div>

                  <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Latency: <strong>${agent.latency}</strong></span>
                    <span>Done: <strong>${agent.tasksCompleted}</strong></span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Live Event Bus / Agent Log Feed -->
          <div class="health-card p-6 bg-white shadow-md space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <span class="text-lg">📡</span>
                <h3 class="text-base font-black text-slate-900">Live Agent Event Stream & Telemetry</h3>
              </div>
              <button onclick="CareBridgeStore.addAgentLog('Health Coordinator Agent', 'Manual telemetry ping check.', 'completed', '24ms'); AgentActivityView.render();" class="text-xs font-bold text-teal-600 hover:underline">
                Send Telemetry Ping
              </button>
            </div>

            <div class="space-y-2 max-h-80 overflow-y-auto font-mono text-xs pr-2">
              ${logs.map(log => `
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-100/80 transition">
                  <div class="flex items-center gap-2.5">
                    <span class="text-[10px] text-slate-400">[${log.timestamp}]</span>
                    <strong class="text-slate-900">${log.agent}:</strong>
                    <span class="text-slate-700 font-sans">${log.action}</span>
                  </div>
                  <div class="flex items-center gap-2 text-[10px] flex-shrink-0">
                    <span class="px-2 py-0.5 rounded font-bold ${log.status === 'critical' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}">
                      ${log.status.toUpperCase()}
                    </span>
                    <span class="text-slate-400">${log.latency}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    },

    async triggerLiveSimulation() {
      if (simulationRunning) return;
      simulationRunning = true;
      NotificationUtil.playChime();
      NotificationUtil.showToast('Workflow Simulator', 'Initiating multi-agent pipeline simulation...', 'info');

      // Reset steps
      simulatedSteps.forEach(s => s.status = 'pending');
      window.App.renderCurrentView();

      for (let i = 0; i < simulatedSteps.length; i++) {
        simulatedSteps[i].status = 'active';
        window.App.renderCurrentView();
        await new Promise(r => setTimeout(r, 600));
        simulatedSteps[i].status = 'completed';
        window.App.renderCurrentView();
      }

      simulationRunning = false;
      NotificationUtil.playChime();
      NotificationUtil.showToast('Simulation Complete', 'All 7 agents executed and audited successfully.', 'success');
      window.App.renderCurrentView();
    }
  };

  window.AgentActivityView = AgentActivityView;
})(window);
