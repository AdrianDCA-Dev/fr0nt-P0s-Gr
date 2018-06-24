import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import swal from 'sweetalert2';
import {InscriptionService} from '../../../services/inscription/inscription.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';
import {Route, Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'ngx-admin-inscription',
  templateUrl: './admin-inscription.component.html',
  styleUrls: ['./admin-inscription.component.scss'],
})
export class AdminInscriptionComponent implements OnInit {
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

  id: number;
  data: any[];
  model: any;
  dataEstudiante: any[];
  dataDetalleCronograma: any[];
  lin = [{ link: '/admin-users'}];
  constructor(private inscriptionService: InscriptionService, private toasterService: ToasterService,
              protected router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.inscriptionService.getInscription().subscribe(data => {
      this.data = data.inscripcion;
      this.dtTrigger.next();
      console.log('inscripcion', this.data);
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
      },
      columnDefs: [
      { "width": "20%", "targets": 1 },
      { "width": "30%", "targets": 2 },
      { "width": "10%", "targets": 3 },
      { "width": "30%", "targets": 4 },
      { "width": "10%", "targets": 5 },
    ],
    };
    this.inscriptionService.getInscriptionEstudiante().subscribe(data => {
      this.dataEstudiante = data.estudiante;
      console.log('dataEstudiante', this.dataEstudiante);
    });
    this.inscriptionService.getInscriptionDetalleCronograma().subscribe(data => {
      this.dataDetalleCronograma = data.detallecronogrma;
      console.log('dataDetalleCronograma', this.dataDetalleCronograma);
    });
    this.myForm = this.fb.group({
      id: [null, Validators.required],
      fecha: [null, Validators.required],
      valido: [null],
      detalle_cronograma_id: [null, Validators.required],
      persona_id: [null, Validators.required],
    });
    this.editForm = this.fb.group({
      id: [null, Validators.required],
      fecha: [null, Validators.required],
      valido: [null],
      detalle_cronograma_id: [null, Validators.required],
      persona_id: [null, Validators.required],
    });
  }
  post(model: any) {
    console.log(model);
    this.inscriptionService.postInscription(model).subscribe(data => {
      this.data.push(data.inscripcion);
      this.showToast(this.type, this.title, this.content);
    });
    this.myForm.reset();
  }

  show(formData) {
    console.log('formData', formData);
    this.id = formData.id;
    this.editForm.controls['id'].setValue(formData.id);
    this.editForm.controls['fecha'].setValue(formData.fecha);
    this.editForm.controls['valido'].setValue(formData.valido);
    this.editForm.controls['detalle_cronograma_id'].setValue(formData.detalle_cronograma_id);
    this.editForm.controls['persona_id'].setValue(formData.persona_id);
  }

  edit(model: any) {
    const formValue = this.editForm.getRawValue();
    const index = this.data.findIndex( data => data.id == formValue.id);

    this.model = model;
    this.model.id = this.id;
    this.inscriptionService.putInscription(this.model.id, this.model).subscribe( data => {
      console.log(data);
      this.data[index].fecha = formValue.fecha;
      this.data[index].valido = formValue.valido;
      this.data[index].detalle_cronograma_id = formValue.detalle_cronograma_id;
      this.data[index].persona_id = formValue.persona_id;
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
      confirmButtonText: 'Si, ¡bórralo!'
    }).then((willDelete) => {
      if (willDelete.value) {
        this.inscriptionService.deleteInscription(this.id).subscribe(data => {
          console.log(data);
          if (index > -1) {
            this.data.splice(index, 1);
          }
          swal(
            'Poof!',
            '¡Tu archivo ha sido eliminado!',
            'success'
          )
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
  mover(){
    this.router.navigate(['/pages/admin/admin-users'], { queryParams: { modal: 'show' } });
    $('#myModal').modal('hide');
  }
}
