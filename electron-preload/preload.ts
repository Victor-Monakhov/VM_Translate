import { contextBridge, ipcRenderer } from 'electron';
import * as fs from 'fs';

contextBridge.exposeInMainWorld('file', {
  mkFileReadonly: (path: string): void => fs.chmodSync(path, 0o444),
  mkFileWritable: (path: string): void => fs.chmodSync(path, 0o777),
  mkFileAvailable: (path: string): void => fs.chmodSync(path, 0o666),
  mkDir: (path: string): void => fs.mkdirSync(path),
  writeFile: (path: string, data: string): void => fs.writeFileSync(path, data),
  readFile: (path: string): string => fs.readFileSync(path).toString(),
  pathExists: (path: string): boolean => fs.existsSync(path),
});

contextBridge.exposeInMainWorld('state', {
  save: (state: IState): Promise<{ success: boolean }> => ipcRenderer.invoke('save-state', state),
  load: (): Promise<IState> => ipcRenderer.invoke('load-state'),
});
