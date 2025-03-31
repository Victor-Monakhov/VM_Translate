
import { app, BrowserWindow } from 'electron/main';

const isMacOS = process.platform === 'darwin';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    titleBarStyle: 'default',
    frame: isMacOS,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('dist/vm-translate/browser/index.html').then();

  win.webContents.openDevTools({ mode: 'right' });

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
