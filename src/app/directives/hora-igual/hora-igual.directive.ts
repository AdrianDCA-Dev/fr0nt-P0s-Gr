import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators, FormControl } from '@angular/forms';

export function horaIgualValidator(nameRe: RegExp): ValidatorFn {
  return (control: FormControl): {[key: string]: any} => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'horaIgual': {value: control.value}} : null;
  };
}

@Directive({
  selector: '[ngxHoraIgual]',
   providers: [{provide: NG_VALIDATORS, useExisting: HoraIgualDirective, multi: true}],
})
export class HoraIgualDirective implements Validator {
  @Input('ngxHoraIgual') horaIgual: string;

   validate(control: FormControl): {[key: string]: any} {
     return this.horaIgual ? horaIgualValidator(new RegExp(this.horaIgual, 'i'))(control)
                               : null;
   }
}
