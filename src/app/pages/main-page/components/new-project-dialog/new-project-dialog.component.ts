import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { ValidationComponent } from '../../../../shared/components/validation/validation.component';
import { INewProjectForm } from '../../interfaces/main.interface';

@Component({
  selector: 'vmt-new-project-dialog',
  imports: [
    InputTextComponent,
    ValidationComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './new-project-dialog.component.html',
  styleUrl: './new-project-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProjectDialogComponent implements OnInit {

  form!: FormGroup<INewProjectForm>;

  nameControl!: WritableSignal<FormControl<string>>;

  ngOnInit(): void {
    this.initForm();
  }


  private initForm(): void {
    this.form = new FormGroup<INewProjectForm>({
      name: new FormControl<string>('', {
        validators: [
          Validators.required,
        ],
        nonNullable: true,
      }),
      path: new FormControl<string>('', {
        validators: [
          Validators.required,
        ],
        nonNullable: true,
      }),
    });
    this.nameControl = signal(this.form.get('name') as FormControl);
  }

}
