import React, { useState } from 'react';
import { BookOpen, Copy, Check, Terminal, Shield, Download, Smartphone } from 'lucide-react';

export const InstallGuide: React.FC = () => {
  const [selectedOS, setSelectedOS] = useState<'macos' | 'linux' | 'windows' | 'android'>('macos');
  const [copied, setCopied] = useState(false);

  const scripts = {
    macos: 'curl -fsSL https://raw.githubusercontent.com/net-merge/net-merge/main/install.sh | sh',
    linux: 'curl -fsSL https://raw.githubusercontent.com/net-merge/net-merge/main/install.sh | sh',
    windows: 'irm https://raw.githubusercontent.com/net-merge/net-merge/main/install.ps1 | iex',
    android: 'pkg install curl && curl -fsSL https://raw.githubusercontent.com/net-merge/net-merge/main/install.sh | sh',
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-xl text-center relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Official Installation Guide</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Install net-merge on Your Device
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-lg mx-auto">
          Free, open-source, lightweight daemon. No accounts, no VPN subscription, no server required.
        </p>

        {/* OS Tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedOS('macos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedOS === 'macos' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            macOS
          </button>
          <button
            onClick={() => setSelectedOS('linux')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedOS === 'linux' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Linux
          </button>
          <button
            onClick={() => setSelectedOS('windows')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedOS === 'windows' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Windows
          </button>
          <button
            onClick={() => setSelectedOS('android')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedOS === 'android' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Android
          </button>
        </div>
      </div>

      {/* Terminal Command Box */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center font-mono">
            <Terminal className="w-4 h-4 mr-2 text-cyan-400" />
            {selectedOS === 'windows' ? 'PowerShell Command' : 'Terminal Command'} ({selectedOS.toUpperCase()})
          </h3>
          <button
            onClick={() => handleCopy(scripts[selectedOS])}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-medium transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Command'}</span>
          </button>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 font-mono text-xs text-cyan-300 overflow-x-auto">
          <code>{scripts[selectedOS]}</code>
        </div>

        <p className="text-xs text-slate-400">
          {selectedOS === 'windows' 
            ? 'Paste this command into an Administrator PowerShell window. Antivirus blocked it? You can download net-merge-setup.exe directly.'
            : selectedOS === 'android'
            ? 'Run inside Termux with storage and root privileges enabled, or install the Android APK release.'
            : 'Paste this command into your terminal. Homebrew or system package managers will handle updates automatically.'}
        </p>
      </div>

      {/* Adding a second connection guide */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center">
          <Smartphone className="w-5 h-5 mr-2 text-cyan-400" />
          How to Add a Second Connection
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <div className="font-bold text-cyan-400">1. USB Tethering</div>
            <p className="text-slate-400 leading-relaxed">
              Connect your Android or iPhone via USB cable to your computer and enable USB Tethering in your phone settings.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <div className="font-bold text-cyan-400">2. Wi-Fi + Ethernet</div>
            <p className="text-slate-400 leading-relaxed">
              Keep both your Wi-Fi connected to your home router and plug in an Ethernet cable. net-merge detects both simultaneously.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <div className="font-bold text-cyan-400">3. Secondary Hotspot</div>
            <p className="text-slate-400 leading-relaxed">
              Join a second Wi-Fi network or portable 5G hotspot. net-merge automatically adds its bandwidth to your downloads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
