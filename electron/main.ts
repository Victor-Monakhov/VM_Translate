import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from 'electron';
import * as fs from 'node:fs';
import path from 'path';

import { EEvents } from './electron.enum';


export class Main {
  private static isMacOS = process.platform === 'darwin';
  private static statePath = path.resolve(app.getPath('userData'), 'vm-translate-save.json');

  static run(): void {
    app.on(EEvents.Ready, Main.onReady);
    app.on(EEvents.Close, Main.onClose);
  }

  static onReady(): void {
    Main.addStateLoading();
    Main.addStateSaving();
    Main.createWindow();
  }

  static onClose(): void {
    app.quit();
  }

  private static createWindow(): void {
    const preloadPath = path.resolve(__dirname, '../electron-preload/main.js');
    const renderPath = path.resolve(__dirname, '../vm-translate/browser/index.html');
    const mainWindow = new BrowserWindow({
      width: 1000,
      height: 600,
      titleBarStyle: 'default',
      frame: Main.isMacOS,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
        preload: preloadPath,
      },
    });

    mainWindow.loadFile(renderPath).then();
    mainWindow.webContents.openDevTools({ mode: 'right' });
  }

  private static addStateLoading(): void {
    ipcMain.handle('load-state', () => {
      try {
        if (!fs.existsSync(Main.statePath)) {
          return null;
        }
        const stateString = fs.readFileSync(Main.statePath, 'utf-8');
        return JSON.parse(stateString);
      } catch {
        console.error('Failed to load user state:');
        return null;
      }
    });
  }

  private static addStateSaving(): void {
    ipcMain.handle('save-state', (event: IpcMainInvokeEvent, state: IState) => {
      try {
        fs.writeFileSync(Main.statePath, JSON.stringify(state));
        return { success: true };
      } catch {
        console.error('Failed to save user state:');
        return { success: false };
      }
    });
  }
}
