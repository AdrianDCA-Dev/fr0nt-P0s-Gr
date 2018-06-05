import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {ModuleService} from '../../../services/module/module.service';
import {AcademicProgramService} from '../../../services/academic-program/academic-program.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

declare var $: any;

@Component({
  selector: 'ngx-admin-module',
  templateUrl: './admin-module.component.html',
  styleUrls: ['./admin-module.component.scss'],
})
export class AdminModuleComponent implements OnInit {
  config: ToasterConfig;
  position = 'toast-top-right';
  animationType = 'fade';
  title = '¡Registrado!';
  content = `¡Buen trabajo!`;
  timeout = 5000;
  toastsLimit = 5;
  type = 'default';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtTriggers: Subject<any> = new Subject();
  public myForm: FormGroup;
  public editForm: FormGroup;

  id: number;
  data: any[];
  dataContent: any[];
  model: any;
  ids: number;
  dataProgramAcademicActive: any[];

  constructor(private moduleService: ModuleService, private programAcademicActiveService: AcademicProgramService,
              private toasterService: ToasterService, private fb: FormBuilder) { }

  ngOnInit() {
    this.moduleService.getModule().subscribe(data => {
      this.data = data.modulo;
      this.dtTrigger.next();
      console.log('modulo', this.data);
    });
    this.programAcademicActiveService.getProgramActive().subscribe(data => {
      this.dataProgramAcademicActive = data.programacademic;
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
      },
    };
    this.myForm = this.fb.group({
      id: [null, Validators.required],
      nombre: [null, Validators.required],
      numCredito: [null, [Validators.required, Validators.maxLength(50)]],
      valido: [null],
      programa_academico_id: [null, Validators.required],
      nomcontenido: [null, Validators.required],
    });
    this.editForm = this.fb.group({
      id: [null, Validators.required],
      nombre: [null, Validators.required],
      numCredito: [null, [Validators.required, Validators.maxLength(50)]],
      valido: [null],
      programa_academico_id: [null, Validators.required],
      nomcontenido: [null, Validators.required],
    });
  }
  post(model: any) {
    console.log(model);
    this.moduleService.postModule(model).subscribe(data => {
      this.data.push(data.modulo);
      this.showToast(this.type, this.title, this.content);
      /*$('#myModal').modal('hide');
      swal('¡Buen trabajo!', '¡Hiciste clic en el botón!', 'success');*/
    });
    this.myForm.reset();
  }
  show(formData) {
    console.log('formData', formData);
    this.id = formData.id;
    this.editForm.controls['id'].setValue(formData.id);
    this.editForm.controls['nombre'].setValue(formData.nombre);
    this.editForm.controls['numCredito'].setValue(formData.numCredito);
    this.editForm.controls['valido'].setValue(formData.valido);
    this.editForm.controls['programa_academico_id'].setValue(formData.programa_academico_id);
  }

  showContent(formData) {
    this.ids = formData.id;
    this.editForm.controls['id'].setValue(formData.id);
    this.editForm.controls['nomcontenido'].setValue(formData.nomcontenido);
  }
  edit(model: any) {
    const formValue = this.editForm.getRawValue();
    const index = this.data.findIndex( data => data.id == formValue.id);

    this.model = model;
    this.model.id = this.id;
    this.moduleService.putModule(this.model.id, this.model).subscribe( data => {
      console.log(data);
      this.data[index].nombre = formValue.nombre;
      this.data[index].numCredito = formValue.numCredito;
      this.data[index].valido = formValue.valido;
      this.data[index].programa_academico_id = formValue.programa_academico_id;
      this.data[index].nomcontenido = formValue.nomcontenido;
      $('#myModalEdit').modal('hide');
      swal('¡Buen trabajo!', '¡Hiciste clic en el botón!', 'success');
    });
    this.editForm.reset();
  }
  conten(model: any) {
    this.id = model.id;
    this.moduleService.getContenModule(this.id).subscribe(data => {
      this.dataContent = data.contenido;
      this.dtTriggers.next();
      console.log('dataContent', this.dataContent);
    });
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
        this.moduleService.deleteModule(this.id).subscribe(data => {
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
  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }
}
