import { app, ipcMain, BrowserWindow } from 'electron';
import { EEvents } from './electron.enum';


export class Main {
  private static isMacOS = process.platform === 'darwin';

  static run(): void {
    app.on(EEvents.Ready, Main.onReady);
    app.on(EEvents.Close, Main.onClose);
  }

  static onReady(): void {
    Main.createWindow();
  }

  static onClose(): void {
    app.quit();
  }

  private static createWindow(): void {
    const mainWindow = new BrowserWindow({
      width: 1000,
      height: 600,
      titleBarStyle: 'default',
      frame: Main.isMacOS,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    mainWindow.loadFile('../vm-translate/browser/index.html').then();
    mainWindow.webContents.openDevTools({ mode: 'right' });
  }
}
