import React, { useState } from 'react';
import { AppSettings } from '../types';
import { Settings as SettingsIcon, X, Check, Shield, Zap } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  setSettings,
}) => {
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);
  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(localSettings);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center">
            <SettingsIcon className="w-5 h-5 mr-2 text-cyan-400" />
            net-merge Daemon Settings
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800 cursor-pointer">
              <div>
                <div className="text-sm font-bold text-white">IPv6 Dual-Stack Routing</div>
                <div className="text-xs text-slate-400">Route IPv6 sockets across bonded interfaces</div>
              </div>
              <input
                type="checkbox"
                checked={localSettings.ipv6Enabled}
                onChange={e => setLocalSettings({ ...localSettings, ipv6Enabled: e.target.checked })}
                className="w-4 h-4 accent-cyan-500 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800 cursor-pointer">
              <div>
                <div className="text-sm font-bold text-white">Start at System Sign-in</div>
                <div className="text-xs text-slate-400">Launch daemon in background tray/menu bar</div>
              </div>
              <input
                type="checkbox"
                checked={localSettings.autoStart}
                onChange={e => setLocalSettings({ ...localSettings, autoStart: e.target.checked })}
                className="w-4 h-4 accent-cyan-500 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800 cursor-pointer">
              <div>
                <div className="text-sm font-bold text-white">Weighted Speed Balancing</div>
                <div className="text-xs text-slate-400">Assign more connections to faster links automatically</div>
              </div>
              <input
                type="checkbox"
                checked={localSettings.weightedBalancing}
                onChange={e => setLocalSettings({ ...localSettings, weightedBalancing: e.target.checked })}
                className="w-4 h-4 accent-cyan-500 rounded"
              />
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Primary DNS Server</label>
            <select
              value={localSettings.dnsServer}
              onChange={e => setLocalSettings({ ...localSettings, dnsServer: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="1.1.1.1 (Cloudflare)">1.1.1.1 (Cloudflare - Fast & Private)</option>
              <option value="8.8.8.8 (Google Public DNS)">8.8.8.8 (Google Public DNS)</option>
              <option value="9.9.9.9 (Quad9)">9.9.9.9 (Quad9 - Malware Blocking)</option>
              <option value="System Default">System Default Gateway</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Max Connections Per App: {localSettings.maxConnectionsPerApp}</label>
            <input
              type="range"
              min="4"
              max="64"
              step="4"
              value={localSettings.maxConnectionsPerApp}
              onChange={e => setLocalSettings({ ...localSettings, maxConnectionsPerApp: Number(e.target.value) })}
              className="w-full accent-cyan-500"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
            {savedToast && (
              <span className="text-xs text-emerald-400 flex items-center font-mono animate-fadeIn">
                <Check className="w-3.5 h-3.5 mr-1" /> Saved!
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
