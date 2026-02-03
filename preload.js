const { contextBridge } = require('electron');

// Expose APIs to the renderer process
contextBridge.exposeInMainWorld('electron', {
  // Add any Electron APIs you need to expose
  platform: process.platform,
  nodeVersion: process.versions.node,
  chromeVersion: process.versions.chrome,
  electronVersion: process.versions.electron
});
