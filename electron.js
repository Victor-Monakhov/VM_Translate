const { app, BrowserWindow } = require('electron/main');

const isMacOS = process.platform === 'darwin';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: isMacOS ? 'hiddenInset' : 'default',
    frame: isMacOS,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('dist/vm-translate/browser/index.html').then();

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
    app.quit();
})
