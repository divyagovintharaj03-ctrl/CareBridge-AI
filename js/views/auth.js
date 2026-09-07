// View 2: Authentication & Demo Login
(function(window) {
  'use strict';

  const AuthView = {
    render() {
      return `
        <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 flex items-center justify-center p-4">
          <div class="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
            <div class="text-center">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 via-teal-500 to-emerald-500 flex items-center justify-center text-white font-black text-2xl mx-auto shadow-lg">
                CB
              </div>
              <h2 class="text-2xl font-black text-slate-900 mt-4">Welcome to CareBridge AI</h2>
              <p class="text-xs text-slate-500 mt-1">Multi-Agent Family Health & Welfare Assistant</p>
            </div>

            <!-- Demo Account Fast Login Box for Hackathon Judges -->
            <div class="mt-6 p-4 rounded-2xl bg-teal-50 border border-teal-200 text-left">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-teal-800 uppercase tracking-wider">🎯 Hackathon Demo Account</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-200 text-teal-900">PRELOADED</span>
              </div>
              <p class="text-xs text-teal-900 mt-1">Log in immediately as <strong>Sanjay Sharma</strong> (Family Admin with 4 members pre-configured).</p>
              <button onclick="AuthView.loginAsDemo()" class="mt-3 w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2">
                <span>1-Click Demo Login (Sanjay Sharma)</span>
                <span>👋</span>
              </button>
            </div>

            <div class="relative my-6 text-center">
              <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-200"></div></div>
              <span class="relative px-3 bg-white text-xs text-slate-400 font-medium">Or enter credentials</span>
            </div>

            <form onsubmit="AuthView.handleCustomLogin(event)" class="space-y-4 text-left">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input type="email" id="auth-email" value="sanjay.sharma@example.com" class="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500" required />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <input type="password" id="auth-password" value="••••••••••••" class="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500" required />
              </div>

              <div class="flex items-center justify-between text-xs text-slate-500">
                <label class="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked class="rounded text-teal-600 focus:ring-teal-500" />
                  <span>Remember family profile</span>
                </label>
                <a href="#" onclick="alert('Demo Mode: Click 1-Click Demo Login to enter directly.'); return false;" class="text-teal-600 hover:underline">Forgot password?</a>
              </div>

              <button type="submit" class="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow transition">
                Sign In to Family Hub
              </button>
            </form>

            <p class="text-center text-xs text-slate-500 mt-6">
              Don't have an account? <a href="#" onclick="AuthView.loginAsDemo(); return false;" class="text-teal-600 font-bold hover:underline">Start Demo Trial</a>
            </p>
          </div>
        </div>
      `;
    },

    loginAsDemo() {
      window.NotificationUtil.playChime();
      window.NotificationUtil.showToast('Welcome Sanjay!', 'Logged into CareBridge AI Family Hub.', 'success');
      window.CareBridgeStore.setView('dashboard');
    },

    handleCustomLogin(e) {
      e.preventDefault();
      this.loginAsDemo();
    }
  };

  window.AuthView = AuthView;
})(window);
