// View 4: AI Health Assistant Component (Interactive Multi-Agent Chat)
(function(window) {
  'use strict';

  let currentWorkingStep = null;
  let isGenerating = false;

  const AssistantView = {
    render() {
      const state = window.CareBridgeStore.getState();
      const activeMember = state.familyMembers.find(m => m.id === state.activeMemberId) || state.familyMembers[0];
      const messages = state.chatMessages;

      return `
        <div class="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6 animate-fadeIn">
          <!-- Left: Active Agent Pipeline Status Panel -->
          <div class="w-full md:w-80 flex-shrink-0 flex flex-col gap-4">
            <!-- Family Member Context Card -->
            <div class="health-card p-4">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Active Member Context</span>
              <div class="flex items-center gap-3">
                <img src="${activeMember.avatar}" class="w-11 h-11 rounded-2xl object-cover border border-slate-200" />
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-extrabold text-slate-900 truncate">${activeMember.name}</h4>
                  <p class="text-xs text-slate-500">${activeMember.relation} • ${activeMember.age} yrs • Blood ${activeMember.bloodGroup}</p>
                </div>
              </div>
              <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <span class="text-slate-500">Switch context:</span>
                <select onchange="CareBridgeStore.setActiveMember(this.value)" class="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 rounded-lg px-2 py-1 focus:outline-none">
                  ${state.familyMembers.map(m => `
                    <option value="${m.id}" ${m.id === activeMember.id ? 'selected' : ''}>${m.name} (${m.relation})</option>
                  `).join('')}
                </select>
              </div>
            </div>

            <!-- Live Agent Orchestration Mesh Status -->
            <div class="health-card p-4 flex-1 flex flex-col justify-between bg-slate-900 text-white">
              <div>
                <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span class="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full ${isGenerating ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}"></span>
                    <span>Orchestrator Status</span>
                  </span>
                  <span class="text-[10px] font-mono text-slate-400">${isGenerating ? 'EXECUTING' : 'IDLE / READY'}</span>
                </div>

                <div class="mt-4 space-y-3 text-xs" id="agent-pipeline-steps">
                  ${this.renderAgentStatusPills()}
                </div>
              </div>

              <div class="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                <div class="flex items-center justify-between">
                  <span>Safety Guardrails:</span>
                  <span class="text-emerald-400 font-bold">100% ENFORCED</span>
                </div>
                <div class="flex items-center justify-between mt-1">
                  <span>Clinical Directives:</span>
                  <span class="text-slate-300">Prohibited</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Main Chat Interface -->
          <div class="flex-1 health-card flex flex-col overflow-hidden bg-white shadow-xl">
            <!-- Chat Header -->
            <div class="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-lg font-bold shadow-md">
                  🧠
                </div>
                <div>
                  <h2 class="text-base font-black text-slate-900">CareBridge AI Assistant</h2>
                  <p class="text-xs text-slate-500">Ask about reports, medications, symptom clarification & welfare schemes.</p>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button onclick="CareBridgeStore.resetToDemoData(); NotificationUtil.showToast('Reset', 'Chat session refreshed.', 'info');" class="px-2.5 py-1 text-xs text-slate-500 hover:text-slate-800 font-semibold border border-slate-200 rounded-lg">
                  Clear
                </button>
              </div>
            </div>

            <!-- Messages Stream -->
            <div id="chat-messages-container" class="flex-1 p-6 overflow-y-auto space-y-6">
              ${messages.map(msg => this.renderMessageBubble(msg)).join('')}

              ${isGenerating ? `
                <div class="flex items-start gap-3 animate-pulse" id="typing-indicator">
                  <div class="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow">
                    🧠
                  </div>
                  <div class="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-700 max-w-lg space-y-2">
                    <div class="flex items-center gap-2 font-bold text-indigo-700">
                      <span class="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
                      <span>Health Coordinator Agent delegating tasks...</span>
                    </div>
                    <p class="text-slate-500 text-[11px]" id="live-step-description">${currentWorkingStep ? currentWorkingStep.message : 'Analyzing clinical context...'}</p>
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- Quick Action Prompts Carousel -->
            <div class="p-3 bg-slate-50 border-t border-slate-100 overflow-x-auto flex gap-2 no-scrollbar">
              <button onclick="AssistantView.sendQuickPrompt('Explain grandfather’s CBC blood test report and flagged values.')" class="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-teal-500 hover:text-teal-700 transition whitespace-nowrap shadow-sm">
                📄 Explain Ramesh's CBC Report
              </button>
              <button onclick="AssistantView.sendQuickPrompt('What questions should we ask Dr. Arvind Rao at our upcoming cardiology review?')" class="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-teal-500 hover:text-teal-700 transition whitespace-nowrap shadow-sm">
                🩺 Doctor Questions for Dr. Rao
              </button>
              <button onclick="AssistantView.sendQuickPrompt('Show our family medication schedule and check for refill shortages.')" class="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-teal-500 hover:text-teal-700 transition whitespace-nowrap shadow-sm">
                💊 Check Medication Schedule
              </button>
              <button onclick="AssistantView.sendQuickPrompt('Find welfare schemes that may be relevant to my family in Karnataka.')" class="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-teal-500 hover:text-teal-700 transition whitespace-nowrap shadow-sm">
                🏛️ Match Welfare Schemes
              </button>
            </div>

            <!-- Input Box -->
            <div class="p-4 border-t border-slate-200 bg-white">
              <form onsubmit="AssistantView.handleSubmit(event)" class="flex items-center gap-3">
                <input 
                  type="text" 
                  id="chat-input-field" 
                  placeholder="Ask about reports, symptoms, medications, or welfare schemes for ${activeMember.name}..." 
                  class="flex-1 px-4 py-3 text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-inner"
                  ${isGenerating ? 'disabled' : ''}
                />
                <button 
                  type="submit" 
                  id="chat-send-btn" 
                  class="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-2xl shadow-md transition flex items-center gap-2 disabled:opacity-50"
                  ${isGenerating ? 'disabled' : ''}
                >
                  <span>Send</span>
                  <span>↗</span>
                </button>
              </form>
              <div class="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>⚡ Multi-Agent Pipeline with Real-time Safety Guardrails</span>
                <span>Press Enter to send</span>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    renderAgentStatusPills() {
      const agents = [
        { name: 'Health Coordinator Agent', desc: 'Central Task Dispatcher', color: 'indigo' },
        { name: 'Medical Report Agent', desc: 'Diagnostic & Lab OCR', color: 'teal' },
        { name: 'Health Assessment Agent', desc: 'Symptom Triage & Questions', color: 'blue' },
        { name: 'Medication Agent', desc: 'Adherence & Schedule Guard', color: 'emerald' },
        { name: 'Family Wellness Agent', desc: 'Preventive Milestones', color: 'rose' },
        { name: 'Welfare Scheme Agent', desc: 'Public Scheme Matcher', color: 'amber' },
        { name: 'Emergency Safety Agent', desc: 'Watchdog & SOS Protocol', color: 'red' },
        { name: 'Health Summary Agent', desc: 'Synthesis & Action Plan', color: 'cyan' }
      ];

      return agents.map(a => `
        <div class="flex items-center justify-between p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full ${isGenerating && currentWorkingStep && currentWorkingStep.agent === a.name ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}"></span>
            <div>
              <p class="font-bold text-slate-200 text-xs">${a.name}</p>
              <p class="text-[10px] text-slate-400">${a.desc}</p>
            </div>
          </div>
          <span class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${isGenerating && currentWorkingStep && currentWorkingStep.agent === a.name ? 'bg-amber-400/20 text-amber-300' : 'bg-emerald-500/10 text-emerald-400'}">
            ${isGenerating && currentWorkingStep && currentWorkingStep.agent === a.name ? 'ACTIVE' : 'READY'}
          </span>
        </div>
      `).join('');
    },

    renderMessageBubble(msg) {
      if (msg.sender === 'user') {
        return `
          <div class="flex items-start justify-end gap-3">
            <div class="chat-bubble-user p-4 max-w-xl text-xs sm:text-sm text-white shadow-md">
              <p>${msg.text}</p>
              <span class="text-[10px] opacity-75 block text-right mt-1">${msg.timestamp}</span>
            </div>
            <div class="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
              👤
            </div>
          </div>
        `;
      }

      // Agent multi-agent structured output
      return `
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow">
            🧠
          </div>
          <div class="chat-bubble-agent p-5 max-w-2xl text-xs sm:text-sm text-slate-800 shadow-md space-y-4 flex-1">
            <!-- Header with agents involved badge -->
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-1.5">
                <span class="font-extrabold text-slate-900">${msg.agentName || 'Health Coordinator Agent'}</span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">Orchestrated</span>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="AssistantView.speakText('${(msg.text || '').replace(/'/g, "\\'")}')" class="p-1 text-slate-400 hover:text-slate-700" title="Read Aloud">🔊</button>
                <span class="text-[10px] text-slate-400 font-mono">${msg.timestamp}</span>
              </div>
            </div>

            <!-- Agents Activated Bar -->
            ${msg.agentsInvolved && msg.agentsInvolved.length > 0 ? `
              <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center gap-1.5 text-[11px]">
                <span class="font-bold text-slate-600">Agents Activated:</span>
                ${msg.agentsInvolved.map(agent => `
                  <span class="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    ${agent}
                  </span>
                `).join('')}
              </div>
            ` : ''}

            <!-- Main Message Text -->
            <div class="prose prose-sm text-slate-700 leading-relaxed">
              ${this.formatMarkdown(msg.text)}
            </div>

            <!-- Structured Findings / Doctor Questions Collapsible -->
            ${msg.structuredData && msg.structuredData.questionsForDoctor && msg.structuredData.questionsForDoctor.length > 0 ? `
              <div class="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-teal-950 space-y-2">
                <h5 class="font-black text-xs uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
                  <span>🩺</span> Questions Suggested for Your Doctor Consultation:
                </h5>
                <ul class="list-disc list-inside space-y-1 text-xs text-teal-900">
                  ${msg.structuredData.questionsForDoctor.map(q => `<li>${q}</li>`).join('')}
                </ul>
              </div>
            ` : ''}

            <!-- Out of Range Diagnostics Box if present -->
            ${msg.structuredData && msg.structuredData.outOfRangeDetails && msg.structuredData.outOfRangeDetails.length > 0 ? `
              <div class="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-2">
                <h5 class="font-black text-xs uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <span>📊</span> Lab Parameter Deviation Summary:
                </h5>
                <div class="space-y-1.5">
                  ${msg.structuredData.outOfRangeDetails.map(d => `
                    <div class="text-xs p-2 rounded-lg bg-white/80 border border-amber-200 flex items-center justify-between">
                      <div>
                        <strong>${d.parameter}:</strong> <span class="font-mono text-amber-700">${d.observedValue}</span>
                        <span class="text-[10px] text-slate-500 ml-1">(Ref: ${d.referenceRange})</span>
                      </div>
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">${d.variance}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Mandatory Safety Disclaimer Note -->
            <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] text-slate-500 italic flex items-start gap-2">
              <span>🛡️</span>
              <span><strong>Safety Guardrail Verified:</strong> Educational analysis only. CareBridge AI does not diagnose illnesses or adjust medications. Please consult your physician.</span>
            </div>
          </div>
        </div>
      `;
    },

    formatMarkdown(text) {
      if (!text) return '';
      return text
        .replace(/### (.*)/g, '<h4 class="font-black text-slate-900 text-sm mt-3 mb-1">$1</h4>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        .replace(/\n\n/g, '<br/><br/>')
        .replace(/\n/g, '<br/>');
    },

    speakText(text) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const clean = text.replace(/<[^>]*>?/gm, '').replace(/[*#]/g, '');
        const utter = new SpeechSynthesisUtterance(clean);
        utter.rate = 1.0;
        window.speechSynthesis.speak(utter);
        NotificationUtil.showToast('Audio Readout', 'Reading response aloud.', 'info');
      } else {
        NotificationUtil.showToast('Speech Not Supported', 'Browser does not support TTS.', 'warning');
      }
    },

    async sendQuickPrompt(promptText) {
      const input = document.getElementById('chat-input-field');
      if (input) {
        input.value = promptText;
        const btn = document.getElementById('chat-send-btn');
        if (btn) btn.click();
      }
    },

    async handleSubmit(e) {
      e.preventDefault();
      const input = document.getElementById('chat-input-field');
      if (!input || !input.value.trim() || isGenerating) return;

      const query = input.value.trim();
      input.value = '';

      const store = window.CareBridgeStore;
      const member = store.getActiveMember();

      // Add user message to store
      store.addChatMessage({
        sender: 'user',
        text: query,
        memberId: member.id
      });

      isGenerating = true;
      currentWorkingStep = { agent: 'Health Coordinator Agent', message: 'Decomposing query...' };
      
      // Update view to show typing indicator
      window.App.renderCurrentView();

      try {
        const result = await window.HealthCoordinator.executePipeline(query, member.id, (stepInfo) => {
          currentWorkingStep = stepInfo;
          const liveDesc = document.getElementById('live-step-description');
          if (liveDesc) liveDesc.textContent = `${stepInfo.agent}: ${stepInfo.message}`;
        });

        isGenerating = false;
        currentWorkingStep = null;

        if (result.isEmergency) {
          store.addChatMessage({
            sender: 'agent',
            agentName: 'Emergency Safety Agent',
            text: result.finalText,
            agentsInvolved: result.agentsActivated
          });
          NotificationUtil.showToast('Emergency Alert', 'Critical symptoms detected. SOS dispatched.', 'error');
        } else {
          // Construct rich narrative
          let narrative = `### Multi-Agent Assessment for ${member.name}\n\n`;
          narrative += `${result.summaryResult.summaryTitle}.\n\n`;
          
          if (result.agentOutputs.medicalReport) {
            narrative += `**Diagnostic Analysis:** Analyzed "${result.agentOutputs.medicalReport.reportTitle}". Extracted ${result.agentOutputs.medicalReport.totalParametersExtracted} laboratory indices. ${result.agentOutputs.medicalReport.outOfRangeCount} parameter(s) require clinical review with Dr. ${member.doctor.split('(')[0]}.\n\n`;
          }

          if (result.agentOutputs.medication) {
            narrative += `**Medication Protocol:** Adherence stands at ${result.agentOutputs.medication.todayAdherence}. All scheduled doses are tracked.\n\n`;
          }

          if (result.agentOutputs.healthAssessment && result.agentOutputs.healthAssessment.observations.length > 0) {
            narrative += `**Symptom Observations:** ${result.agentOutputs.healthAssessment.observations.join(' ')}\n\n`;
          }

          if (result.agentOutputs.welfareScheme && result.agentOutputs.welfareScheme.totalSchemesMatched > 0) {
            narrative += `**Welfare Benefits:** Identified ${result.agentOutputs.welfareScheme.totalSchemesMatched} applicable healthcare assistance schemes for ${member.name}.\n\n`;
          }

          narrative += `**Summary Action Items:**\n` + result.summaryResult.keyTakeaways.map(k => `* ${k}`).join('\n');

          store.addChatMessage({
            sender: 'agent',
            agentName: 'Health Coordinator Agent',
            text: narrative,
            agentsInvolved: result.agentsActivated,
            structuredData: {
              questionsForDoctor: result.summaryResult.questionsForDoctor,
              outOfRangeDetails: result.agentOutputs.medicalReport ? result.agentOutputs.medicalReport.outOfRangeDetails : []
            }
          });

          NotificationUtil.playChime();
          NotificationUtil.showToast('Response Ready', `Processed by ${result.agentsActivated.length} agents in ${result.executionTime}.`, 'success');
        }
      } catch (err) {
        console.error('Agent Pipeline Error:', err);
        isGenerating = false;
        currentWorkingStep = null;
        NotificationUtil.showToast('Error', 'Agent execution failed: ' + err.message, 'error');
      }

      window.App.renderCurrentView();

      // Scroll to bottom
      const container = document.getElementById('chat-messages-container');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  };

  window.AssistantView = AssistantView;
})(window);
