import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const checkPass: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const pass = control.get('firstPass');
  const repeat = control.get('repeatPass');

  //   console.log(control);

  const hasDiff = pass !== repeat;

  if (hasDiff) {
    repeat?.setErrors({ notSame: true });
  }

  return !hasDiff ? { identityRevealed: true } : null;
};
