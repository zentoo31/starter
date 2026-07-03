export {};

declare global {
  interface Window {
    electronAPI: {
      getSystemInfo: () => Promise<any>;
      checkWinget: () => Promise<{ installed: boolean; version: string | null; error: string | null }>;
      checkProgramInstalled: (program: any) => Promise<{ available: boolean; installed: boolean }>;
      installProgram: (program: any) => Promise<{ success: boolean; code: number | null; stdout: string; stderr: string }>;
      uninstallProgram: (program: any) => Promise<{ success: boolean; code: number | null; stdout: string; stderr: string }>;
      onInstallLog: (callback: (payload: any) => void) => () => void;
    };
  }
}