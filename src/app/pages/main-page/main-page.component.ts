import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { filter, Subject, switchMap } from 'rxjs';

import { MainHeaderComponent } from './components/main-header/main-header.component';
import { NewProjectDialogComponent } from './components/new-project-dialog/new-project-dialog.component';

@Component({
  selector: 'vmt-main-page',
  imports: [
    NgClass,

    MainHeaderComponent,
    MatButtonModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {

  projects = signal<string[]>([]);

  newProject$ = new Subject<void>();

  private readonly dialog = inject(MatDialog);
  private readonly dr = inject(DestroyRef);

  ngOnInit(): void {
    this.observeNewProject();
  }

  onNewProject(): void {
    this.newProject$.next();
  }

  private observeNewProject(): void {
    this.newProject$.pipe(
      switchMap(() => this.dialog.open(NewProjectDialogComponent, {
        hasBackdrop: true,
        panelClass: 'vmt-dialog',
      }).afterClosed()),
      filter(projectData => !!projectData),
      takeUntilDestroyed(this.dr),
    ).subscribe(projectData => {
      console.log(projectData);
    });
  }
}
