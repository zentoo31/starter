export {};

declare global {
  interface Window {
    electronAPI: {
      getSystemInfo: () => Promise<any>;
      checkWinget: () => Promise<{ installed: boolean; version: string | null; error: string | null }>;
      checkProgramInstalled: (program: any) => Promise<{ available: boolean; installed: boolean }>;
      downloadOpenProgram: (program: any) => Promise<{ success: boolean; message: string }>;
      openNiniteDownload: (selectedIds: string[]) => Promise<{ success: boolean; url: string | null; error: string | null }>;
      installProgram: (program: any) => Promise<{ success: boolean; code: number | null; stdout: string; stderr: string }>;
      uninstallProgram: (program: any) => Promise<{ success: boolean; code: number | null; stdout: string; stderr: string }>;
      executeMassgrave: () => Promise<{ success: boolean; error: string | null }>;
      onInstallLog: (callback: (payload: any) => void) => () => void;
    };
  }
}