export interface SystemInfo {
  cpu: CPUInfo;
  mem: MemoryInfo;
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
  socket: string;
  virtualization: boolean;
}

export interface MemoryInfo {
  total: number;
  used: number;
  free: number;
}

export interface GraphicsInfo {
  controllers: ControllerInfo[];
  displays: unknown[];
}

export interface OSInfo {
  platform: string;
  distro: string;
  release: string;
  codename: string;
  hostname: string;
  serial: string;
  arch: string;
}

export interface DiskInfo {
  fs: string;
  size: number;
  used: number;
  available: number;
}

export interface ControllerInfo{
  vendor: string;
  model: string;
  vram: number;
  driverVersion: string;
  name: string;
  memoryTotal: number;
  memoryFree: number;
  memoryUsed: number;
}