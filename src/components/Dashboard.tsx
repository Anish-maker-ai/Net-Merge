import React, { useState } from 'react';
import { 
  NetworkAdapter, 
  NetworkFlow, 
  SystemLog 
} from '../types';
import { 
  Wifi, 
  Network, 
  Smartphone, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity, 
  Zap, 
  Shield, 
  RefreshCw, 
  Plus, 
  Power, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle,
  Cpu,
  Globe,
  Radio
} from 'lucide-react';

interface DashboardProps {
  adapters: NetworkAdapter[];
  setAdapters: React.Dispatch<React.SetStateAction<NetworkAdapter[]>>;
  flows: NetworkFlow[];
  logs: SystemLog[];
  mergePaused: boolean;
  totalSpeed: number;
  onRunSpeedTest: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  adapters,
  setAdapters,
  flows,
  logs,
  mergePaused,
  totalSpeed,
  onRunSpeedTest,
}) => {
  const [showAddAdapterModal, setShowAddAdapterModal] = useState(false);
  const [newAdapterName, setNewAdapterName] = useState('');
  const [newAdapterType, setNewAdapterType] = useState<'wifi' | 'hotspot' | 'cellular'>('hotspot');
  const [newAdapterSpeed, setNewAdapterSpeed] = useState(150);

  const toggleAdapterStatus = (id: string) => {
    setAdapters(prev =>
      prev.map(adapter => {
        if (adapter.id === id) {
          const nextStatus = adapter.status === 'active' ? 'standby' : 'active';
          return { ...adapter, status: nextStatus };
        }
        return adapter;
      })
    );
  };

  const handleAddAdapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdapterName) return;

    const newAdapter: NetworkAdapter = {
      id: `adapter-${Date.now()}`,
      name: newAdapterName,
      type: newAdapterType,
      status: 'active',
      ip: `192.168.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 200)}`,
      speedDown: Number(newAdapterSpeed),
      speedUp: Number((newAdapterSpeed * 0.3).toFixed(1)),
      latency: Math.floor(Math.random() * 25) + 10,
      weight: 6,
      bytesTransferred: '120 MB',
      flowsCount: Math.floor(Math.random() * 5) + 2,
    };

    setAdapters([...adapters, newAdapter]);
    setNewAdapterName('');
    setShowAddAdapterModal(false);
  };

  const activeAdaptersCount = adapters.filter(a => a.status === 'active').length;
  const totalDown = adapters
    .filter(a => a.status === 'active' && !mergePaused)
    .reduce((sum, a) => sum + a.speedDown, 0);
  const totalUp = adapters
    .filter(a => a.status === 'active' && !mergePaused)
    .reduce((sum, a) => sum + a.speedUp, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Hero stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Speed */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Activity className="w-20 h-20 text-cyan-400" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Combined Speed</span>
            <span className={`w-2.5 h-2.5 rounded-full ${mergePaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`}></span>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
              {mergePaused ? '0.0' : totalDown.toFixed(1)}
            </span>
            <span className="text-sm font-semibold text-cyan-400">Mbps Down</span>
          </div>
          <div className="mt-2 flex items-center text-xs text-slate-400 space-x-2">
            <span className="text-emerald-400 font-medium flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              {mergePaused ? '0.0' : totalUp.toFixed(1)} Mbps Up
            </span>
            <span>• {activeAdaptersCount} links active</span>
          </div>
        </div>

        {/* Card 2: Active Flows */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Zap className="w-20 h-20 text-blue-400" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Flows</span>
            <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 font-mono">TCP / UDP</span>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
              {adapters.reduce((acc, a) => acc + (a.status === 'active' && !mergePaused ? a.flowsCount : 0), 0)}
            </span>
            <span className="text-sm font-semibold text-blue-400">connections</span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            Smart load balancing across all adapters
          </div>
        </div>

        {/* Card 3: CPU & Memory Overhead */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Cpu className="w-20 h-20 text-emerald-400" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Daemon Overhead</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">Ultra-light</span>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">0.18</span>
            <span className="text-sm font-semibold text-emerald-400">CPU Cores</span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            ~14 MB RAM usage • Zero proxy lag
          </div>
        </div>

        {/* Card 4: Security & Privacy */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Shield className="w-20 h-20 text-indigo-400" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Privacy Mode</span>
            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 font-mono">No Server</span>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white font-mono tracking-tight">Direct</span>
            <span className="text-sm font-semibold text-indigo-400">P2P Routing</span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            No accounts, no VPN overhead
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Adapters Management */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center">
                  <Network className="w-5 h-5 mr-2 text-cyan-400" />
                  Active Network Adapters
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  net-merge automatically distributes outgoing connections across all enabled interfaces.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowAddAdapterModal(true)}
                  className="flex items-center space-x-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-3 py-1.5 rounded-xl text-xs transition-all shadow-md shadow-cyan-500/10"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Link</span>
                </button>
              </div>
            </div>

            {/* Adapters List */}
            <div className="mt-4 grid grid-cols-1 gap-4">
              {adapters.map(adapter => {
                const isActive = adapter.status === 'active';
                return (
                  <div
                    key={adapter.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isActive && !mergePaused
                        ? 'bg-slate-800/60 border-cyan-500/30 shadow-lg shadow-cyan-500/5'
                        : 'bg-slate-900/40 border-slate-800/80 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2.5 rounded-xl ${
                          adapter.type === 'ethernet' 
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : adapter.type === 'wifi'
                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {adapter.type === 'ethernet' ? <Network className="w-5 h-5" /> :
                           adapter.type === 'wifi' ? <Wifi className="w-5 h-5" /> :
                           <Smartphone className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-sm font-bold text-white">{adapter.name}</h3>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase ${
                              isActive && !mergePaused
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {mergePaused ? 'paused' : adapter.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3 mt-1 text-xs text-slate-400 font-mono">
                            <span>IP: {adapter.ip}</span>
                            <span>•</span>
                            <span>Latency: {adapter.latency}ms</span>
                            <span>•</span>
                            <span>Flows: {adapter.flowsCount}</span>
                          </div>
                        </div>
                      </div>

                      {/* Speed and Toggle */}
                      <div className="flex items-center space-x-4">
                        <div className="text-right hidden sm:block">
                          <div className="text-sm font-bold font-mono text-cyan-400">
                            {mergePaused ? '0.0' : adapter.speedDown} Mbps
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {adapter.bytesTransferred} transferred
                          </div>
                        </div>

                        <button
                          onClick={() => toggleAdapterStatus(adapter.id)}
                          className={`p-2 rounded-xl transition-all border ${
                            isActive
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                              : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'
                          }`}
                          title={isActive ? 'Disable Adapter' : 'Enable Adapter'}
                        >
                          <Power className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Progress bar representing speed share */}
                    <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500"
                        style={{ width: `${isActive && !mergePaused ? Math.min(100, (adapter.speedDown / 400) * 100) : 0}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Flows / Connections Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-blue-400" />
                  Active Multiplexed Flows
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time applications and sockets split across your bonded links.
                </p>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {flows.length} active sockets
              </span>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Application</th>
                    <th className="py-2.5 px-3">Destination Domain</th>
                    <th className="py-2.5 px-3">Adapter Link</th>
                    <th className="py-2.5 px-3">Protocol</th>
                    <th className="py-2.5 px-3 text-right">Flow Speed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
                  {flows.map(flow => {
                    const adapter = adapters.find(a => a.id === flow.adapterId);
                    return (
                      <tr key={flow.id} className="hover:bg-slate-800/30 transition-all">
                        <td className="py-3 px-3 font-semibold text-white font-sans flex items-center">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></span>
                          {flow.appName}
                        </td>
                        <td className="py-3 px-3 text-slate-300">{flow.domain}</td>
                        <td className="py-3 px-3">
                          <span className="bg-slate-800 text-cyan-300 px-2 py-0.5 rounded border border-slate-700 text-[11px]">
                            {adapter ? adapter.name : flow.adapterId}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${flow.protocol === 'TCP' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'}`}>
                            {flow.protocol}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right text-emerald-400 font-bold">
                          {flow.speed} Mbps
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: Logs & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center">
              <Sliders className="w-4 h-4 mr-2 text-cyan-400" />
              Quick Actions
            </h3>

            <div className="space-y-2.5">
              <button
                onClick={onRunSpeedTest}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition-all text-xs font-semibold"
              >
                <span className="flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-cyan-400" />
                  Run Speed Bonding Test
                </span>
                <span className="text-[10px] bg-cyan-500 text-slate-950 px-2 py-0.5 rounded font-bold">Launch</span>
              </button>

              <button
                onClick={() => {
                  const newLog: SystemLog = {
                    id: `log-${Date.now()}`,
                    timestamp: new Date().toLocaleTimeString(),
                    level: 'success',
                    message: 'DNS cache flushed and route tables re-optimized successfully.',
                  };
                  logs.unshift(newLog);
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-slate-700/80 hover:text-white transition-all text-xs font-medium"
              >
                <span className="flex items-center">
                  <RefreshCw className="w-4 h-4 mr-2 text-slate-400" />
                  Flush DNS & Re-bind Routes
                </span>
                <span className="text-[10px] text-slate-400 font-mono">OK</span>
              </button>

              <button
                onClick={() => {
                  const hotspot: NetworkAdapter = {
                    id: `hotspot-${Date.now()}`,
                    name: 'Secondary Phone Tether 5G',
                    type: 'cellular',
                    status: 'active',
                    ip: '192.168.43.55',
                    speedDown: 110.0,
                    speedUp: 30.0,
                    latency: 24,
                    weight: 8,
                    bytesTransferred: '45 MB',
                    flowsCount: 5,
                  };
                  setAdapters([...adapters, hotspot]);
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-slate-700/80 hover:text-white transition-all text-xs font-medium"
              >
                <span className="flex items-center">
                  <Radio className="w-4 h-4 mr-2 text-emerald-400" />
                  Simulate Phone Hotspot Connection
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">+110 Mbps</span>
              </button>
            </div>
          </div>

          {/* System Logs */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center">
                <Activity className="w-4 h-4 mr-2 text-cyan-400" />
                Daemon Event Log
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Live</span>
            </div>

            <div className="mt-4 space-y-3 max-h-[320px] overflow-y-auto pr-1">
              {logs.map(log => (
                <div key={log.id} className="text-xs space-y-1 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center">
                      {log.level === 'success' && <CheckCircle2 className="w-3 h-3 text-emerald-400 mr-1" />}
                      {log.level === 'warn' && <AlertTriangle className="w-3 h-3 text-amber-400 mr-1" />}
                      {log.level === 'info' && <Globe className="w-3 h-3 text-cyan-400 mr-1" />}
                      {log.timestamp}
                    </span>
                    <span className="uppercase text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">{log.level}</span>
                  </div>
                  <p className="text-slate-300 font-sans">{log.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Adapter Modal */}
      {showAddAdapterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center">
              <Plus className="w-5 h-5 mr-2 text-cyan-400" />
              Add New Network Interface
            </h3>
            <p className="text-xs text-slate-400">
              Connect a Wi-Fi adapter, USB tether, or phone hotspot to instantly boost your bonded bandwidth.
            </p>

            <form onSubmit={handleAddAdapter} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Interface Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Guest Wi-Fi 5GHz or USB Ethernet"
                  value={newAdapterName}
                  onChange={e => setNewAdapterName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Interface Type</label>
                <select
                  value={newAdapterType}
                  onChange={e => setNewAdapterType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                >
                  <option value="wifi">Wi-Fi Adapter</option>
                  <option value="hotspot">Mobile Hotspot (Wi-Fi)</option>
                  <option value="cellular">USB Tethering / Cellular</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Speed (Mbps): {newAdapterSpeed}</label>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={newAdapterSpeed}
                  onChange={e => setNewAdapterSpeed(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddAdapterModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20"
                >
                  Connect & Bond
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
