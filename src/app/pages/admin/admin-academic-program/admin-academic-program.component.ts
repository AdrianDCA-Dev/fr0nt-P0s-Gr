import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import swal from 'sweetalert2';
import {AcademicProgramService} from '../../../services/academic-program/academic-program.service';
import {Modalidad} from '../../../models/modalidad';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

declare var $: any;

@Component({
  selector: 'ngx-admin-academic-program',
  templateUrl: './admin-academic-program.component.html',
  styleUrls: ['./admin-academic-program.component.scss'],
})
export class AdminAcademicProgramComponent implements OnInit {
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

  public myForm: FormGroup;
  public editForm: FormGroup;
  public editFormContent: FormGroup;
  public myFormPostContent: FormGroup;

  id: number;
  data: any[];
  dataModulo: any[];
  dataContenido: any[];
  dataTypeActive: any[];
  model: any;
  contenido = [];
  nonModulo = [];
  nombremodulo = [];
  con: any = {};
  cons: any = {};
  temporal = [];
  temporals = [];
  moduleContent = [];
  num = 1;
  n = 1;
  valor: string;
  mas: number;
  titleTipoProgramAcademic: string;
  modality: Modalidad[] = [
    {id: 1, nombre: 'Presencial'},
    {id: 2, nombre: 'Semi Presencial'},
    {id: 3, nombre: 'Virtual'},
  ];
  c = 1;
  constructor(private programaAcademico: AcademicProgramService, private toasterService: ToasterService, private fb: FormBuilder) { }

  ngOnInit() {
    this.programaAcademico.getAcademicProgram().subscribe(data => {
      this.data = data.programa;
     /* this.dataModulo = data.modulo;
      this.dataContenido = data.contenido;*/
      this.dtTrigger.next();
      console.log('persona', this.data);
    });
    this.programaAcademico.getTypeActive().subscribe(data => {
      this.dataTypeActive = data.type;
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
      valido: [null],
      modalidad: [null, Validators.required],
      objetivo: [null, Validators.required],
      duracion: [null, [Validators.required,  Validators.pattern('^[0-9]+$')]],
      tipo_pa_id: [null, Validators.required],
      nombremodulo: [null, Validators.required],
      numero: [null, Validators.required],
      numCredito: [null, [Validators.required,  Validators.pattern('^[0-9]+$')]],
      contenido: [null, Validators.required],
    });
    this.editForm = this.fb.group({
      id: [null, Validators.required],
      nombre: [null, Validators.required],
      valido: [null],
      modalidad: [null, Validators.required],
      objetivo: [null, Validators.required],
      duracion: [null, [Validators.required,  Validators.pattern('^[0-9]+$')]],
      tipo_pa_id: [null, Validators.required],
      nombremodulo: [null, Validators.required],
      numero: [null, Validators.required],
      numCredito: [null, [Validators.required,  Validators.pattern('^[0-9]+$')]],
      contenido: [null, Validators.required],
      content: [null, Validators.required],
    });
    this.editFormContent = this.fb.group({
      content: [null, Validators.required],
    });
    this.myFormPostContent = this.fb.group({
      content: [null, Validators.required],
    });

    this.myForm.controls['numero'].setValue("Modulo " + this.c);
  }
  post(model: any) {
    console.log('post',model);
    this.programaAcademico.postAcademicProgram(model).subscribe(data => {
      this.data.push(data.programa);
      $('#myModal').modal('hide');
      swal('¡Buen trabajo!', '¡Hiciste clic en el botón!', 'success');
    });
    this.myForm.reset();
  }

  agregar(model: any) {
    this.cons.nombre = model.nombre;
    this.cons.modalidad = model.modalidad;
    this.cons.objetivo = model.objetivo;
    //this.cons.duracion_pa = model.duracion_pa;
    this.cons.tipo_pa_id = model.tipo_pa_id;
    this.contenido.push(model.contenido);
    console.log('num', model);
    if (this.num === 1) {
      this.num = 2;
      console.log('repite si', this.num);
      this.moduleContent.push({
        nombremodulo: model.nombremodulo,
        numero: model.numero,
        numCredito: model.numCredito,
        duracion: model.duracion + " horas",
        contenido: this.contenido,
      });
    }
    this.cons.modulecontent = this.moduleContent;

    for (let i = 0; i < this.modality.length; i++) {
      if (model.tipo_pa_id === this.modality[i].id) {
          this.titleTipoProgramAcademic = this.modality[i].nombre;
      }
    }

    $('#stop').prop('disabled', true);
    $('#stop1').prop('disabled', true);
    $('#stop2').prop('disabled', true);
    $('#stop3').prop('disabled', true);
    $('#stop4').prop('disabled', true);
    $('#stop5').prop('disabled', true);
    $('#stop6').prop('disabled', true);
    $('#stop7').prop('disabled', true);
    console.log('contenidoModulo', this.moduleContent);
    this.myForm.controls['contenido'].reset();
  }
  agregarModulos() {
    this.num = 1;
    this.contenido = [];
    $('#stop3').prop('disabled', false);
    $('#stop4').prop('disabled', false);
    $('#stop6').prop('disabled', false);
    $('#stop7').prop('disabled', false);
    this.myForm.controls['nombremodulo'].reset();
    this.myForm.controls['numCredito'].reset();
    this.myForm.controls['contenido'].reset();
    this.myForm.controls['numero'].reset();
    this.myForm.controls['duracion'].reset();

    this.c = this.c +1;
    console.log('cntador', this.c);
    this.myForm.controls['numero'].setValue("Modulo " + this.c);
  }
  enviar() {
    console.log('temporal', this.cons);
    this.c = 1;

    swal({
      title: '¿Estás seguro?',
      text: 'Una vez eliminada, ¡no podrá recuperar este archivo!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ¡Guardar!',
    }).then((willDelete) => {
      if (willDelete.value) {
        this.programaAcademico.postAcademicProgram(this.cons).subscribe(data => {
          this.data.push(data.programa);
          $('#stop').prop('disabled', false);
          $('#stop1').prop('disabled', false);
          $('#stop2').prop('disabled', false);
          $('#stop3').prop('disabled', false);
          $('#stop4').prop('disabled', false);
          $('#stop5').prop('disabled', false);
          $('#stop6').prop('disabled', false);
          $('#stop7').prop('disabled', false);
          this.showToast(this.type, this.title, this.content);
          $('#myModal').modal('hide');
          swal(
            'Poof!',
            '¡Tu archivo ha sido guardado!',
            'success',
          );
          this.myForm.controls['numero'].setValue("Modulo " + this.c);
          this.contenido = [];
          this.moduleContent = [];
          this.cons = {};
          this.myForm.reset();
        });
      }
    });
  }
  removeTemporal(model: any) {
    console.log('removeTemporal', model);
    /*const index = this.moduleContent.indexOf(model.contenido);*/
   /* const index = this.moduleContent.indexOf(this.cons.modulecontent);*/
   this.n = 1;
   for (let i = 0; i < this.moduleContent.length; i++) {
      const index = this.moduleContent[i].contenido.indexOf(model);
      console.log('loco', this.moduleContent[i].contenido);
      console.log('INDEX', index);
      if (index > -1 && this.n === 1) {
        console.log('INDEX2', index);
        this.n = 2;
        this.moduleContent[i].contenido.splice(index, 1);
      }
    }
  }
  show(formData) {
    console.log('formData', formData);
    this.id = formData.id;
    this.editForm.controls['id'].setValue(formData.id);
    this.editForm.controls['nombre'].setValue(formData.nombre);
    this.editForm.controls['valido'].setValue(formData.valido);
    this.editForm.controls['modalidad'].setValue(formData.modalidad);
    this.editForm.controls['tipo_pa_id'].setValue(formData.tipo_pa_id);
  }
  showContent(data) {
    console.log('formData', data);
    this.valor = data;
    this.editFormContent.controls['content'].setValue(data);
  }
  editContent(model: any) {
    const formValue = this.editFormContent.getRawValue();
    console.log('formValue', formValue);
    console.log('model', model.content);
    this.n = 1;
    for (let i = 0; i < this.moduleContent.length; i++) {
      const index = this.moduleContent[i].contenido.indexOf(this.valor);
      console.log('loco', formValue.content);
      console.log('INDEX', index);
      if (index > -1 && this.n === 1) {
        console.log('INDEX2', index);
        this.n = 2;
        this.moduleContent[i].contenido[index] = formValue.content;
      }
    }
    $('#myModalEditContent').modal('hide');
  }
  postContent(model: any) {
    const index = this.moduleContent.indexOf(model);
    swal({
      title: 'Agregar +Contenido al Modulo:' + model.nombremodulo,
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
        swal({
          type: 'success',
          title: 'Nuevo Contenido!',
          html: 'Se agrego: ' + result.value
        })
        this.moduleContent[index].contenido.push(result.value);
      }
    });
   /* console.log('models', model.nombremodulo);
    console.log('models', model);
    console.log('moduleContent', this.moduleContent);
    const index = this.moduleContent.indexOf(model);
    this.mas = index;
    console.log('index', index);*/
  }
/*  enviarPostContent(model: any) {
    const formValue = this.myFormPostContent.getRawValue();
    console.log('formValue', formValue);
    console.log('formValuecontent', formValue.content);
    console.log('model', model);
    this.moduleContent[this.mas].contenido.push(model.content);
    $('#myModalPostContent').modal('hide');
    this.myFormPostContent.controls['content'].reset();
  }*/
  edit(model: any) {
    const formValue = this.editForm.getRawValue();
    const index = this.data.findIndex( data => data.id == formValue.id);

    this.model = model;
    this.model.id = this.id;
    this.programaAcademico.putAcademicProgram(this.model.id, this.model).subscribe( data => {
      console.log(data);
      this.data[index].nombre = formValue.nombre;
      this.data[index].valido = formValue.valido;
      this.data[index].modalidad = formValue.modalidad;
      this.data[index].tipo_pa_id = formValue.tipo_pa_id;
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
        this.programaAcademico.deleteAcademicProgram(this.id).subscribe(data => {
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

  showconten(model: any) {
    this.id = model.id;
    this.programaAcademico.getContenidos(this.id).subscribe(data => {
      this.dataContenido = data.contenido;
    });
  }

  showmodule(model: any) {
    this.id = model.id;
    this.programaAcademico.getModulos(this.id).subscribe(data => {
      this.dataModulo = data.modulo;
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
