const { ipcRenderer } = require('electron');

window.electronAPI = {
  minimize: () => ipcRenderer.send('minimize-window'),
  maximize: () => ipcRenderer.send('maximize-window'),
  close: () => ipcRenderer.send('close-window'),
  openFileDialog: (options) => ipcRenderer.invoke('open-file-dialog', options),
  openDirectoryDialog: () => ipcRenderer.invoke('open-directory-dialog'),
  saveFileDialog: (defaultName) => ipcRenderer.invoke('save-file-dialog', defaultName),
  saveFile: (filePath, content) => ipcRenderer.invoke('save-file', filePath, content),
  readDirectory: (dirPath) => ipcRenderer.invoke('read-directory', dirPath),
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  readFileBinary: (filePath) => ipcRenderer.invoke('read-file-binary', filePath),
  getHomeDir: () => ipcRenderer.invoke('get-home-dir'),
  pathExists: (p) => ipcRenderer.invoke('path-exists', p),
};

ipcRenderer.on('app-ready', () => {
  window.dispatchEvent(new Event('electron-ready'));
});

const menuEvents = [
  'menu-new-file', 'menu-open-file', 'menu-open-folder', 'menu-save', 'menu-save-as',
  'menu-close-tab', 'menu-close-all', 'menu-undo', 'menu-redo', 'menu-cut', 'menu-copy',
  'menu-paste', 'menu-find', 'menu-replace', 'menu-comment', 'menu-format',
  'menu-toggle-explorer', 'menu-scale', 'menu-zoom-in', 'menu-zoom-out', 'menu-zoom-reset',
  'menu-settings', 'menu-extensions', 'menu-themes', 'menu-about'
];

menuEvents.forEach(event => {
  ipcRenderer.on(event, () => {
    window.dispatchEvent(new CustomEvent(event));
  });
});