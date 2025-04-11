import { FormControl } from '@angular/forms';

export interface INewProjectData {
  name: string;
  path: string;
}

export interface INewProjectForm {
  name: FormControl<string>;
  path: FormControl<string>;
}
