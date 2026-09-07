// CareBridge AI - Toast & Sound Utilities
(function(window) {
  'use strict';

  const NotificationUtil = {
    showToast(title, message, type = 'info', duration = 4000) {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      const colors = {
        success: 'bg-emerald-600 text-white border-emerald-500',
        error: 'bg-red-600 text-white border-red-500',
        warning: 'bg-amber-500 text-white border-amber-400',
        info: 'bg-slate-900 text-white border-slate-700'
      };
      
      const icons = {
        success: '✓',
        error: '🚨',
        warning: '⚠️',
        info: 'ℹ️'
      };

      toast.className = `flex items-start gap-3 p-4 rounded-xl shadow-xl border ${colors[type] || colors.info} transform transition-all duration-300 translate-y-2 opacity-0 text-sm max-w-md w-full pointer-events-auto`;
      toast.innerHTML = `
        <span class="text-base font-bold">${icons[type] || 'ℹ️'}</span>
        <div class="flex-1">
          <p class="font-semibold text-sm">${title}</p>
          <p class="text-xs opacity-90 mt-0.5">${message}</p>
        </div>
        <button class="text-xs opacity-70 hover:opacity-100 font-bold ml-2" onclick="this.parentElement.remove()">✕</button>
      `;

      container.appendChild(toast);

      // Trigger animation
      requestAnimationFrame(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
      });

      setTimeout(() => {
        toast.classList.add('translate-y-2', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
      }, duration);
    },

    playChime() {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } catch (e) {
        // AudioContext not allowed before user interaction
      }
    }
  };

  window.NotificationUtil = NotificationUtil;
})(window);
