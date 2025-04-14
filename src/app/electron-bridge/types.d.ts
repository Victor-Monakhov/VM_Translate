
export {};

declare global {

  interface Window {
    file: IFileManager;
    state: IStateManager;
  }

  interface IFileManager {
    mkFileReadonly: (filePath: string) => void;
    mkFileWritable: (filePath: string) => void;
    mkFileAvailable: (filePath: string) => void;
    mkDir: (path: string) => void;
    writeFile: (path: string, data: string) => void;
    readFile: (path: string) => string;
    pathExists: (path: string) => boolean;
  }

  interface IStateManager {
    save: (state: IState) => Promise<{ success: boolean }>;
    load: () => Promise<IState>;
  }

  interface IState {
    projects: IProject[];
  }

  interface IProject {
    name: string;
    path?: string;
    files: string[];
  }
}
