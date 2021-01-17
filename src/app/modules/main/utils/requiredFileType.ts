import { AbstractControl } from '@angular/forms';

export const requiredFileType = (type: string) => (control: AbstractControl) => {
  const file = control.value;
  if (file) {
    if (file.name) {
      const ext = file.name.split('.')[1].toLowerCase();
      if (type.toLowerCase() === ext) {
        return null
      }
    }
  }
  return {
    requiredFileType: true
  }
}
