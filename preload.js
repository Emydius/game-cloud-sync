const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // called in renderer.js when file is added, file is received in main.js
  sendFileArray: (fileArray) => ipcRenderer.send('sendFiles', fileArray)
})