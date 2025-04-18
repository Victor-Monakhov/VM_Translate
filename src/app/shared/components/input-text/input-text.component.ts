import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { LoaderComponent } from '../loader/loader.component';
import { ValidationService } from '../validation/validation-service/validation.service';

import { InputHeightPipe } from './input-height-pipe/input-height.pipe';

type TTextInputType = 'text' | 'password' | 'email';

enum ETextInputType {
  Text = 'text',
  Password = 'password',
  Email = 'email',
}

@Component({
  selector: 'vm-input-text',
  imports: [
    FormsModule,
    InputHeightPipe,
    ReactiveFormsModule,
    NgClass,
    LoaderComponent,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputTextComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => InputTextComponent),
    },
  ],
})
export class InputTextComponent implements OnInit, ControlValueAccessor, Validator {

  private readonly validationService = inject(ValidationService);

  inputType = input<TTextInputType>(ETextInputType.Text);
  placeholder = input<string>('');

  label = input<string>('');
  focused = signal<boolean>(false);
  invalid = signal<boolean>(false);
  pending = signal<boolean>(false);
  innerInputType = signal<TTextInputType>(ETextInputType.Password);

  formControl = new FormControl<string>('', { nonNullable: true });
  parentFormControl!: FormControl;
  types = ETextInputType;

  ngOnInit(): void {
    this.innerInputType.set(this.inputType());
    this.validationService.dependentControlValid(this.formControl, this.invalid);
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  onFocusIn(): void {
    this.focused.set(true);
  }

  onFocusOut(): void {
    this.focused.set(false);
    this.onTouched();
    this.parentFormControl.updateValueAndValidity();
    this.updateInvalidState();
  }

  onPasswordTypeChange(): void {
    const inputType: ETextInputType =
      this.innerInputType() === ETextInputType.Password ? ETextInputType.Text : ETextInputType.Password;
    this.innerInputType.set(inputType);
  }

  writeValue(value: string): void {
    this.formControl.patchValue(value);
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    disabled ? this.formControl.disable() : this.formControl.enable();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.parentFormControl) {
      this.parentFormControl = control as FormControl;
    }
    setTimeout(() => this.updateInvalidState(), 0);
    return null;
  }

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  private updateInvalidState(): void {
    this.pending.set(!!this.parentFormControl.errors?.['pending']);
    this.invalid.set(!!this.parentFormControl.errors && this.parentFormControl.touched);
    this.formControl.updateValueAndValidity();
  }
}
