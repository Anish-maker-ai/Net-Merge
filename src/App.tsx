/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { initialAdapters, initialFlows, initialLogs, defaultSettings } from './mockData';
import { NetworkAdapter, NetworkFlow, SystemLog, AppSettings } from './types';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { SpeedTest } from './components/SpeedTest';
import { AppRouter } from './components/AppRouter';
import { InstallGuide } from './components/InstallGuide';
import { TerminalSimulator } from './components/TerminalSimulator';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [adapters, setAdapters] = useState<NetworkAdapter[]>(initialAdapters);
  const [flows] = useState<NetworkFlow[]>(initialFlows);
  const [logs] = useState<SystemLog[]>(initialLogs);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const activeAdaptersCount = adapters.filter(a => a.status === 'active').length;
  const totalSpeed = adapters
    .filter(a => a.status === 'active' && !settings.mergePaused)
    .reduce((sum, a) => sum + a.speedDown, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mergePaused={settings.mergePaused}
        setMergePaused={(paused) => setSettings({ ...settings, mergePaused: paused })}
        totalSpeed={totalSpeed}
        activeAdaptersCount={activeAdaptersCount}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'dashboard' && (
          <Dashboard
            adapters={adapters}
            setAdapters={setAdapters}
            flows={flows}
            logs={logs}
            mergePaused={settings.mergePaused}
            totalSpeed={totalSpeed}
            onRunSpeedTest={() => setActiveTab('speedtest')}
          />
        )}

        {activeTab === 'speedtest' && (
          <SpeedTest adapters={adapters} />
        )}

        {activeTab === 'router' && (
          <AppRouter />
        )}

        {activeTab === 'terminal' && (
          <TerminalSimulator />
        )}

        {activeTab === 'install' && (
          <InstallGuide />
        )}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        setSettings={setSettings}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-400">net-merge v2.4</span> — Use all your internet connections at the same time.
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <button onClick={() => setActiveTab('install')} className="hover:text-cyan-400 transition-colors">Install Guide</button>
            <a href="https://github.com/net-merge/net-merge" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">GitHub Repository</a>
            <button onClick={() => setIsSettingsOpen(true)} className="hover:text-cyan-400 transition-colors">Daemon Settings</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
