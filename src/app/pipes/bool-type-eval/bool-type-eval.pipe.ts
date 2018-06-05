import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolTypeEval'
})
export class BoolTypeEvalPipe implements PipeTransform {

  transform(value: number): string {
    return value === 1 ? 'Estudiante' : 'Docente';
  }

}
