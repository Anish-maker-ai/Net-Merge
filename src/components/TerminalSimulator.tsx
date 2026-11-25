import React, { useState } from 'react';
import { Terminal as TerminalIcon, Send, Play } from 'lucide-react';

interface HistoryItem {
  command: string;
  output: string;
}

export const TerminalSimulator: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'net-merge status',
      output: '✓ net-merge daemon v2.4 running (PID 4820)\n-> Active adapters: 3 (eth0: 380 Mbps, en0: 124.5 Mbps, feth0: 85 Mbps)\n-> Total bonded throughput: 589.5 Mbps\n-> Privacy: Direct P2P multiplexing active',
    },
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let output = '';

    if (cmd === 'net-merge status' || cmd === 'status') {
      output = '✓ net-merge daemon running\n-> eth0 (Gigabit Ethernet) [IP: 192.168.1.50] - 380 Mbps\n-> en0 (Wi-Fi 5GHz) [IP: 192.168.1.105] - 124.5 Mbps\n-> feth0 (USB Tether) [IP: 192.168.42.129] - 85 Mbps\nTotal Bonded Speed: 589.5 Mbps';
    } else if (cmd === 'net-merge stats' || cmd === 'stats') {
      output = '=== net-merge Traffic Statistics ===\nTotal Data Transferred: 24.5 GB\nActive TCP Sockets: 54\nActive UDP Sockets: 12\nCPU Usage: 0.18 Cores\nUptime: 4 days, 12 hours';
    } else if (cmd === 'net-merge pause' || cmd === 'pause') {
      output = '⏸ net-merge bonding paused. Traffic routed through default gateway only.';
    } else if (cmd === 'net-merge resume' || cmd === 'resume') {
      output = '▶ net-merge bonding resumed. All adapters re-engaged.';
    } else if (cmd === 'help' || cmd === 'net-merge help') {
      output = 'Available commands:\n  net-merge status   - Show active adapters and speeds\n  net-merge stats    - Show traffic statistics and CPU usage\n  net-merge pause    - Pause bonding temporarily\n  net-merge resume   - Resume bonding\n  clear              - Clear terminal window';
    } else if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else {
      output = `command not found: ${cmd}. Type 'net-merge help' for available commands.`;
    }

    setHistory([...history, { command: input, output }]);
    setInput('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <TerminalIcon className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white">Interactive CLI Shell</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">bash / zsh / powershell</span>
        </div>

        {/* Terminal Screen */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 min-h-[350px] max-h-[450px] overflow-y-auto space-y-4 shadow-inner">
          <div className="text-slate-500">
            net-merge interactive CLI v2.4. Type commands below (e.g. <span className="text-cyan-400">net-merge status</span>, <span className="text-cyan-400">net-merge stats</span>, <span className="text-cyan-400">help</span>).
          </div>

          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center space-x-2 text-cyan-400">
                <span>$</span>
                <span className="text-white font-bold">{item.command}</span>
              </div>
              <pre className="text-slate-300 whitespace-pre-wrap font-mono text-xs leading-relaxed pl-4 border-l-2 border-slate-800">
                {item.output}
              </pre>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleCommand} className="flex items-center space-x-2">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-cyan-400 font-mono font-bold">$</span>
            <input
              type="text"
              placeholder="Type net-merge status, stats, help..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-cyan-500 shadow-inner"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center space-x-1.5"
          >
            <span>Run</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
