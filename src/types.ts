export type AdapterType = 'wifi' | 'ethernet' | 'hotspot' | 'cellular';

export interface NetworkAdapter {
  id: string;
  name: string;
  type: AdapterType;
  status: 'active' | 'standby' | 'disconnected';
  ip: string;
  speedDown: number; // in Mbps
  speedUp: number; // in Mbps
  latency: number; // in ms
  weight: number; // 1-10
  bytesTransferred: string;
  flowsCount: number;
}

export interface NetworkFlow {
  id: string;
  appName: string;
  domain: string;
  adapterId: string;
  speed: number; // Mbps
  protocol: 'TCP' | 'UDP';
  timestamp: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'success' | 'error';
  message: string;
}

export interface AppSettings {
  ipv6Enabled: boolean;
  mergePaused: boolean;
  autoStart: boolean;
  weightedBalancing: boolean;
  maxConnectionsPerApp: number;
  dnsServer: string;
  theme: 'dark' | 'light';
}

export interface SpeedTestResult {
  singleSpeed: number;
  mergedSpeed: number;
  improvementPercent: number;
  timestamp: string;
}
