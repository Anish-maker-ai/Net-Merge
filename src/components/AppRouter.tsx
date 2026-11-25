import React, { useState } from 'react';
import { Zap, Shield, Plus, Globe, Sliders, Check } from 'lucide-react';

interface AppRule {
  id: string;
  appName: string;
  strategy: 'bond-all' | 'ethernet-only' | 'wifi-primary' | 'hotspot-fallback';
  maxConnections: number;
  priority: 'high' | 'normal' | 'low';
}

export const AppRouter: React.FC = () => {
  const [rules, setRules] = useState<AppRule[]>([
    { id: '1', appName: 'Steam', strategy: 'bond-all', maxConnections: 32, priority: 'high' },
    { id: '2', appName: 'Google Chrome', strategy: 'bond-all', maxConnections: 16, priority: 'normal' },
    { id: '3', appName: 'Zoom / Teams', strategy: 'ethernet-only', maxConnections: 4, priority: 'high' },
    { id: '4', appName: 'BitTorrent / qBittorrent', strategy: 'bond-all', maxConnections: 64, priority: 'low' },
    { id: '5', appName: 'Spotify', strategy: 'wifi-primary', maxConnections: 4, priority: 'normal' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [appName, setAppName] = useState('');
  const [strategy, setStrategy] = useState<'bond-all' | 'ethernet-only' | 'wifi-primary' | 'hotspot-fallback'>('bond-all');

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName) return;

    const newRule: AppRule = {
      id: `rule-${Date.now()}`,
      appName,
      strategy,
      maxConnections: 16,
      priority: 'normal',
    };

    setRules([...rules, newRule]);
    setAppName('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Zap className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">App Routing & Connection Affinity</h2>
              <p className="text-xs text-slate-400">Configure how specific applications distribute their sockets across your adapters.</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-xl text-xs transition-all shadow-md shadow-cyan-500/10"
        >
          <Plus className="w-4 h-4" />
          <span>Add App Override</span>
        </button>
      </div>

      {/* Rules Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Application</th>
                <th className="py-3 px-4">Routing Strategy</th>
                <th className="py-3 px-4">Max Sockets</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {rules.map(rule => (
                <tr key={rule.id} className="hover:bg-slate-800/30 transition-all font-mono">
                  <td className="py-3.5 px-4 font-bold text-white font-sans flex items-center">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2.5"></span>
                    {rule.appName}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${
                      rule.strategy === 'bond-all'
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                        : rule.strategy === 'ethernet-only'
                        ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                        : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                    }`}>
                      {rule.strategy === 'bond-all' ? 'Bond All Links (Max Speed)' :
                       rule.strategy === 'ethernet-only' ? 'Ethernet Only (Low Latency)' :
                       rule.strategy === 'wifi-primary' ? 'Wi-Fi Primary' : 'Hotspot Fallback'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">{rule.maxConnections} max</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      rule.priority === 'high' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      rule.priority === 'normal' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {rule.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setRules(rules.filter(r => r.id !== rule.id))}
                      className="text-slate-500 hover:text-rose-400 text-xs font-sans transition-all"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center">
              <Plus className="w-5 h-5 mr-2 text-cyan-400" />
              Add App Routing Override
            </h3>
            <form onSubmit={handleAddRule} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Application Name / Binary</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HandBrake, Discord, Cyberpunk2077.exe"
                  value={appName}
                  onChange={e => setAppName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Routing Strategy</label>
                <select
                  value={strategy}
                  onChange={e => setStrategy(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                >
                  <option value="bond-all">Bond All Links (Maximum Speed)</option>
                  <option value="ethernet-only">Ethernet Only (Lowest Latency / No drops)</option>
                  <option value="wifi-primary">Wi-Fi Primary with Failover</option>
                  <option value="hotspot-fallback">Cellular Hotspot Fallback</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg"
                >
                  Save Override
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
