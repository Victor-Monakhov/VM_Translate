import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { BehaviorSubject, debounceTime, filter, map, of, Subject, switchMap } from 'rxjs';

import { ElectronService } from '../../../../electron-bridge/electron.service';

@Injectable()
export class StateService {

  private readonly electronService = inject(ElectronService);
  private readonly dr = inject(DestroyRef);

  state$ = new BehaviorSubject<IState>({ projects: [] });
  loadState$ = new Subject<void>();
  saveState$ = new Subject<IState>();

  constructor() {
    this.observeLoadState();
    this.observeSaveState();
  }

  private observeLoadState(): void {
    this.loadState$.pipe(
      debounceTime(500),
      switchMap(() => this.electronService.stateManager.load()),
      switchMap(state => {
        if (!state) {
          const newState = this.state$.value;
          return this.electronService.stateManager.save(newState).pipe(
            map(result => {
              if (result.success) {
                this.loadState$.next();
              }
              return null;
            }),
          );
        }
        return of(state);
      }),
      filter(state => !!state),
      takeUntilDestroyed(this.dr),
    ).subscribe(state => {
      this.state$.next(state);
      console.log(state);
    });
  }

  private observeSaveState(): void {
    this.saveState$.pipe(
      switchMap(state => this.electronService.stateManager.save(state)),
      takeUntilDestroyed(this.dr),
    ).subscribe(result => {
      console.log(result);
    });
  }
}
