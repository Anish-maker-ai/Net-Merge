import React from 'react';
import { 
  Network, 
  Activity, 
  Pause, 
  Play, 
  Settings, 
  Terminal, 
  BookOpen, 
  ShieldCheck, 
  Zap,
  Gauge
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mergePaused: boolean;
  setMergePaused: (paused: boolean) => void;
  totalSpeed: number;
  activeAdaptersCount: number;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  mergePaused,
  setMergePaused,
  totalSpeed,
  activeAdaptersCount,
  onOpenSettings,
}) => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-white/20">
              <Network className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-white tracking-tight">net-merge</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20">
                  v2.4 Pro
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Combine all your internet connections</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-800/60 p-1 rounded-xl border border-slate-700/50">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('speedtest')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'speedtest'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Gauge className="w-4 h-4" />
              <span>Bonding Test</span>
            </button>

            <button
              onClick={() => setActiveTab('router')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'router'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>App Routing</span>
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'terminal'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>CLI Terminal</span>
            </button>

            <button
              onClick={() => setActiveTab('install')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'install'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Install & Guide</span>
            </button>
          </nav>

          {/* Right Status & Controls */}
          <div className="flex items-center space-x-3">
            {/* Live Speed Badge */}
            <div className="hidden lg:flex items-center space-x-2 bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs text-slate-300 font-mono">
                <strong className="text-emerald-400 font-bold">{totalSpeed.toFixed(1)}</strong> Mbps
              </span>
              <span className="text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">
                {activeAdaptersCount} links
              </span>
            </div>

            {/* Pause / Resume Button */}
            <button
              onClick={() => setMergePaused(!mergePaused)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                mergePaused
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
              }`}
              title={mergePaused ? 'Resume net-merge bonding' : 'Pause net-merge bonding'}
            >
              {mergePaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{mergePaused ? 'Paused' : 'Active'}</span>
            </button>

            {/* Settings */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Subheader Navigation */}
      <div className="md:hidden flex overflow-x-auto space-x-1 px-4 py-2 border-t border-slate-800 bg-slate-950/50">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('speedtest')}
          className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${activeTab === 'speedtest' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
        >
          Bonding Test
        </button>
        <button
          onClick={() => setActiveTab('router')}
          className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${activeTab === 'router' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
        >
          App Routing
        </button>
        <button
          onClick={() => setActiveTab('terminal')}
          className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${activeTab === 'terminal' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
        >
          CLI Terminal
        </button>
        <button
          onClick={() => setActiveTab('install')}
          className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${activeTab === 'install' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
        >
          Install
        </button>
      </div>
    </header>
  );
};
