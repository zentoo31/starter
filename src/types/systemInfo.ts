export interface SystemInfo {
  cpu: CPUInfo;
  memory: MemoryInfo;
  graphics: GraphicsInfo;
  os: OSInfo;
  disks: DiskInfo[];
}

export interface CPUInfo {
  manufacturer: string;
  brand: string;
  speed: string;
  cores: number;
  physicalCores: number;
}

export interface MemoryInfo {
  total: number;
  used: number;
  free: number;
}

export interface GraphicsInfo {
  controllers: unknown[];
  displays: unknown[];
}

export interface OSInfo {
  platform: string;
  distro: string;
  release: string;
  arch: string;
}

export interface DiskInfo {
  fs: string;
  size: number;
  used: number;
  available: number;
}