import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MainHeaderComponent } from './components/main-header/main-header.component';

@Component({
  selector: 'vmt-main-page',
  imports: [
    MainHeaderComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
}
