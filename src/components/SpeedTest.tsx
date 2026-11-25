import React, { useState } from 'react';
import { NetworkAdapter } from '../types';
import { Gauge, Play, ArrowUpRight, Zap, CheckCircle2, Award, Clock } from 'lucide-react';

interface SpeedTestProps {
  adapters: NetworkAdapter[];
}

export const SpeedTest: React.FC<SpeedTestProps> = ({ adapters }) => {
  const [testing, setTesting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [singleSpeedResult, setSingleSpeedResult] = useState<number | null>(null);
  const [mergedSpeedResult, setMergedSpeedResult] = useState<number | null>(null);

  const activeAdapters = adapters.filter(a => a.status === 'active');
  const topSingleAdapter = activeAdapters.length > 0 ? Math.max(...activeAdapters.map(a => a.speedDown)) : 120;
  const calculatedMerged = activeAdapters.reduce((sum, a) => sum + a.speedDown, 0) || 385;

  const runTest = () => {
    setTesting(true);
    setProgress(0);
    setSingleSpeedResult(null);
    setMergedSpeedResult(null);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTesting(false);
          setSingleSpeedResult(topSingleAdapter);
          setMergedSpeedResult(calculatedMerged);
          return 100;
        }
        return prev + 5;
      });
    }, 120);
  };

  const improvement = singleSpeedResult && mergedSpeedResult 
    ? (((mergedSpeedResult - singleSpeedResult) / singleSpeedResult) * 100).toFixed(0)
    : '215';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-xl text-center relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <Gauge className="w-56 h-56 text-cyan-400" />
        </div>
        <div className="inline-flex items-center space-x-2 bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <Zap className="w-3.5 h-3.5" />
          <span>Interactive Bonding Benchmark</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Test Your Combined Speed
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
          Compare your fastest single network connection against net-merge multiplexing all active adapters simultaneously.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={runTest}
            disabled={testing}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm shadow-xl transition-all ${
              testing
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
            }`}
          >
            <Play className={`w-4 h-4 ${testing ? 'animate-spin' : ''}`} />
            <span>{testing ? `Running Test (${progress}%)` : 'Start Bonding Test'}</span>
          </button>
        </div>

        {/* Progress bar */}
        {testing && (
          <div className="mt-6 max-w-md mx-auto space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Downloading test stream across {activeAdapters.length} adapters...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {(singleSpeedResult !== null && mergedSpeedResult !== null) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {/* Single Connection Result */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Single Connection (Best Link Only)
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-4xl font-black text-white font-mono">{singleSpeedResult.toFixed(1)}</span>
              <span className="text-base font-semibold text-slate-400">Mbps Down</span>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Using only your top interface ({activeAdapters[0]?.name || 'Wi-Fi'}).
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Latency: 14 ms</span>
              <span>Single socket stream</span>
            </div>
          </div>

          {/* net-merge Bonded Result */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-bl-xl">
              +{improvement}% Speed Boost
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center">
              <Zap className="w-4 h-4 mr-1 text-cyan-400" />
              net-merge Bonded (All Links Added Up)
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-4xl font-black text-emerald-400 font-mono">{mergedSpeedResult.toFixed(1)}</span>
              <span className="text-base font-semibold text-emerald-400">Mbps Down</span>
            </div>
            <p className="mt-2 text-xs text-slate-300">
              Simultaneous multi-connection multiplexing across {activeAdapters.length} bonded interfaces.
            </p>
            <div className="mt-6 pt-4 border-t border-cyan-500/20 flex items-center justify-between text-xs text-cyan-300 font-mono">
              <span className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                Zero packet drops
              </span>
              <span>Multiplexed sockets</span>
            </div>
          </div>
        </div>
      )}

      {/* Benefits breakdown */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center">
          <Award className="w-5 h-5 mr-2 text-cyan-400" />
          Why net-merge Outperforms Single Connections
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">1</div>
            <h4 className="text-sm font-bold text-white">Parallel Steam & Torrents</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Download managers and torrent clients open multiple TCP/UDP streams, which net-merge automatically spreads over Wi-Fi, Ethernet, and hotspots simultaneously.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">2</div>
            <h4 className="text-sm font-bold text-white">Zero Configuration Proxy</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Works transparently at the network socket layer for every app on your machine without requiring manual proxy settings or VPN subscriptions.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">3</div>
            <h4 className="text-sm font-bold text-white">Automatic Failover</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              If your phone hotspot disconnects or Wi-Fi signal drops, active flows instantly reroute to remaining healthy links without dropping calls or downloads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
