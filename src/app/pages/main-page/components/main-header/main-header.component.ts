import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SelectLanguageComponent } from '../../../../shared/components/select-language/select-language.component';

@Component({
  selector: 'vmt-welcome-header',
  imports: [
    NgOptimizedImage,
    SelectLanguageComponent,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent {

  addKeyClick = output<void>();

  onAddKeyClick(): void {
    this.addKeyClick.emit();
  }

  onSaveClick(): void {

  }
}
