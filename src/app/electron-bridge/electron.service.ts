import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';

const { file, state } = window;

interface ISmartStateManager {
  save: (newState: IState) => Observable<{ success: boolean }>;
  load: () => Observable<IState>;
}

@Injectable({
  providedIn: 'root',
})
export class ElectronService {

  fileManager: IFileManager;
  stateManager: ISmartStateManager;

  constructor() {
    this.fileManager = file;
    this.stateManager = {
      save: (newState: IState): Observable<{ success: boolean }> => from(state.save(newState)),
      load: (): Observable<IState> => from(state.load()),
    };
  }
}
