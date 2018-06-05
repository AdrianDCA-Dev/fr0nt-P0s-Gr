import { Component, OnInit } from '@angular/core';
import {TypeAcademicProgramService} from '../../../services/type-academic-program/type-academic-program.service';
import {FormsModule, FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import swal from 'sweetalert2';
/*declare var jQuery = require('jquery');
declare var f = require('jquery-expander')(jQuery);*/

declare var $: any;

@Component({
  selector: 'ngx-admin-type-academic-program',
  templateUrl: './admin-type-academic-program.component.html',
  styleUrls: ['./admin-type-academic-program.component.scss'],
})
export class AdminTypeAcademicProgramComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  submitted: boolean = false;
  public myForm: FormGroup;
  public editForm: FormGroup;

  id: number;
  data: any[];
  model: any;
  booleanValue: boolean = true;
  constructor(private tipoProgramaAcademicoService: TypeAcademicProgramService, private fb: FormBuilder) { }

  ngOnInit() {
    this.tipoProgramaAcademicoService.getTypeAcademicProgram().subscribe(data => {
      this.data = data.tipo;
      this.dtTrigger.next();
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
      },
     /* mRender: function(data, type, row) {
        var trimmedString = data.substring(0, 6);
        return trimmedString + '...';
      },*/
    };
    this.myForm = this.fb.group({
      id: [null, Validators.required],
      nombre: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      descripcion: [null],
    });
    this.editForm = this.fb.group({
      id: [null, Validators.required],
      nombre: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      valido: [null],
      descripcion: [null],
    });
    //f('expande').expander();
   /* jQuery('#expande').({

    });*/
  }
  cortarTexto(texto: any, limite: any) {
    const puntosSuspensivos = "...";
    if(texto.length > limite)
    {
      texto = texto.substring(0,limite) + puntosSuspensivos;
    }

    return texto;
  }
  post(model: any) {
    console.log(model);
    this.submitted = true;
    this.tipoProgramaAcademicoService.postTypeAcademicProgram(model).subscribe(data => {
      this.submitted = false;
      this.data.push(data.tipo);
      $('#myModal').modal('hide');
      swal('¡Buen trabajo!', '¡Hiciste clic en el botón!', 'success');
    });
    this.myForm.reset();
  }
  show(formData) {
    console.log('formData', formData);
    this.id = formData.id;
    this.editForm.controls['id'].setValue(formData.id);
    this.editForm.controls['nombre'].setValue(formData.nombre);
    this.editForm.controls['valido'].setValue(formData.valido);
    this.editForm.controls['descripcion'].setValue(formData.descripcion);
  }

  edit(model: any) {
    const formValue = this.editForm.getRawValue();
    const index = this.data.findIndex( data => data.id == formValue.id);

    this.model = model;
    this.model.id = this.id;
    this.tipoProgramaAcademicoService.putTypeAcademicProgram(this.model.id, this.model).subscribe( data => {
      console.log(data);
      this.data[index].nombre = formValue.nombre;
      this.data[index].valido = formValue.valido;
      this.data[index].descripcion = formValue.descripcion;
      $('#myModalEdit').modal('hide');
      swal('¡Buen trabajo!', '¡Hiciste clic en el botón!', 'success');
    });
    this.editForm.reset();
  }

  remove(model: any) {
    this.id = model.id;
    const index = this.data.indexOf(model);
    console.log('indexModel', model);
    console.log('index', index);
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
        this.tipoProgramaAcademicoService.deleteTypeAcademicProgram(this.id).subscribe(data => {
          console.log(data);
          if (index > -1) {
            console.log('index2', index);
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
