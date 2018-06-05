import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {PersonService} from '../../../services/person/person.service';
import swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'ngx-admin-person',
  templateUrl: './admin-person.component.html',
  styleUrls: ['./admin-person.component.scss'],
})
export class AdminPersonComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  public myForm: FormGroup;
  public editForm: FormGroup;

  id: number;
  data: any[];
  model: any;

  constructor(private personService: PersonService, private fb: FormBuilder) { }

  ngOnInit() {
    this.personService.getPerson().subscribe(data => {
      this.data = data.persona;
      this.dtTrigger.next();
      /*console.log('persona', this.data);*/
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
      },
    };
    this.myForm = this.fb.group({
      id: [null, Validators.required],
      dni: [null, [Validators.required, Validators.maxLength(11), Validators.minLength(7)]],
      nombres: [null, [Validators.required, Validators.maxLength(25)]],
      app: [null, [Validators.required, Validators.maxLength(25)]],
      apm: [null, [Validators.required, Validators.maxLength(25)]],
      sexo: [null, Validators.required],
      fechaNac: [null, Validators.required],
      direccion: [null, Validators.required],
      fono: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(5)]],
    });
    this.editForm = this.fb.group({
      id: [null, Validators.required],
      dni: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(5)]],
      nombres: [null, [Validators.required, Validators.maxLength(60), Validators.minLength(5)]],
      app: [null, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      apm: [null, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      sexo: [null, Validators.required],
      fechaNac: [null, Validators.required],
      direccion: [null, Validators.required],
      fono: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(5)]],
    });
  }
  post(model: any) {
    console.log(model);
    this.personService.postPerson(model).subscribe(data => {
      this.data.push(data.persona);
      $('#myModal').modal('hide');
      swal('¡Buen trabajo!', '¡Hiciste clic en el botón!', 'success');
    });
    this.myForm.reset();
  }
  show(formData) {
    console.log('formData', formData);
    this.id = formData.id;
    this.editForm.controls['id'].setValue(formData.id);
    this.editForm.controls['dni'].setValue(formData.dni);
    this.editForm.controls['nombres'].setValue(formData.nombres);
    this.editForm.controls['app'].setValue(formData.app);
    this.editForm.controls['apm'].setValue(formData.apm);
    this.editForm.controls['sexo'].setValue(formData.sexo);
    this.editForm.controls['fechaNac'].setValue(formData.fechaNac);
    this.editForm.controls['direccion'].setValue(formData.direccion);
    this.editForm.controls['fono'].setValue(formData.fono);
  }

  edit(model: any) {
    const formValue = this.editForm.getRawValue();
    const index = this.data.findIndex( data => data.id == formValue.id);

    this.model = model;
    this.model.id = this.id;
    this.personService.putPerson(this.model.id, this.model).subscribe( data => {
      console.log(data);
      this.data[index].dni = formValue.dni;
      this.data[index].nombres = formValue.nombres;
      this.data[index].app = formValue.app;
      this.data[index].apm = formValue.apm;
      this.data[index].sexo = formValue.sexo;
      this.data[index].fechaNac = formValue.fechaNac;
      this.data[index].direccion = formValue.direccion;
      this.data[index].fono = formValue.fono;
      $('#myModalEdit').modal('hide');
      swal('¡Buen trabajo!', '¡Hiciste clic en el botón!', 'success');
    });
    this.editForm.reset();
  }

  remove(model: any) {
    this.id = model.id;
    const index = this.data.indexOf(model);
    swal({
      title: '¿Estás seguro?',
      text: 'Una vez eliminada, ¡no podrá recuperar este archivo!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ¡bórralo!',
    }).then((willDelete) => {
      if (willDelete.value) {
        this.personService.deletePerson(this.id).subscribe(data => {
          console.log(data);
          if (index > -1) {
            this.data.splice(index, 1);
          }
          swal(
            'Poof!',
            '¡Tu archivo ha sido eliminado!',
            'success',
          );
        });
      }
    });
  }
}
