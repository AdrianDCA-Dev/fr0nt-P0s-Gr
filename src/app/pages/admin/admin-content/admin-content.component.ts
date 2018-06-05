import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {ContentService} from '../../../services/content/content.service';
import {ModuleService} from '../../../services/module/module.service';

declare var $: any;

@Component({
  selector: 'ngx-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.scss'],
})
export class AdminContentComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  public myForm: FormGroup;
  public editForm: FormGroup;

  id: number;
  data: any[];
  model: any;
  dataModuleActive: any[];

  constructor(private contentService: ContentService, private moduleActiveService: ModuleService, private fb: FormBuilder) { }

  ngOnInit() {
    this.contentService.getContent().subscribe(data => {
      this.data = data.contenido;
      this.dtTrigger.next();
      console.log('contenido', this.data);
    });
    this.moduleActiveService.getModuleActive().subscribe(data => {
      this.dataModuleActive = data.moduleactive;
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
      },
    };
    this.myForm = this.fb.group({
      id: [null, Validators.required],
      nomcontenido: [null, Validators.required],
      modulo_id: [null, Validators.required],
    });
    this.editForm = this.fb.group({
      id: [null, Validators.required],
      nomcontenido: [null, Validators.required],
      modulo_id: [null, Validators.required],
    });
  }
  post(model: any) {
    console.log(model);
    this.contentService.postContent(model).subscribe(data => {
      this.data.push(data.contenido);
      $('#myModal').modal('hide');
      swal('¡Buen trabajo!', '¡Hiciste clic en el botón!', 'success');
    });
    this.myForm.reset();
  }
  show(formData) {
    console.log('formData', formData);
    this.id = formData.id;
    this.editForm.controls['id'].setValue(formData.id);
    this.editForm.controls['nomcontenido'].setValue(formData.nombre);
    this.editForm.controls['modulo_id'].setValue(formData.modulo_id);
  }

  edit(model: any) {
    const formValue = this.editForm.getRawValue();
    const index = this.data.findIndex( data => data.id == formValue.id);

    this.model = model;
    this.model.id = this.id;
    this.contentService.putContent(this.model.id, this.model).subscribe( data => {
      console.log(data);
      this.data[index].nomcontenido = formValue.nomcontenido;
      this.data[index].modulo_id = formValue.modulo_id;
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
        this.contentService.deleteContent(this.id).subscribe(data => {
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
