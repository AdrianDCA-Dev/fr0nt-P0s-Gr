import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolEstado',
})
export class BoolEstadoPipe implements PipeTransform {

  transform(value: number): string {
    return value === 1 ? 'Activo' : 'Inactivo';
  }

}
