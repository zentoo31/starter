export {};

declare global {
  interface Window {
    electronAPI: {
      getSystemInfo: () => Promise<any>;
    };
  }
}