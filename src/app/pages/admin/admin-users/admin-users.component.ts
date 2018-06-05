import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { ActivatedRoute } from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user/user.service';
import swal from 'sweetalert2';
import {PersonService} from '../../../services/person/person.service';
import * as jquery from 'jquery';
import * as moment from 'moment';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

declare var $: any;

@Component({
  selector: 'ngx-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  config: ToasterConfig;
  position = 'toast-top-right';
  animationType = 'fade';
  title = '¡Inválido!';
  content = `¡Verificar Fecha de Nacimiento sea la Correcta!`;
  timeout = 5000;
  toastsLimit = 5;
  type = 'default';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;

  public myForm: FormGroup;
  public editForm: FormGroup;
  public mas: FormGroup;
  id: number;
  data: any[];
  model: any;
  dataRole: any[];
  role = [];
  datos: any = {};
  datosArray: any[] = [];
  constructor(private userService: UserService, private toasterService: ToasterService,
              private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.data = data.user;
      console.log('docente', this.data);
      this.dtTrigger.next();
      /*console.log('persona', this.data);*/
    });
    this.userService.getRoles().subscribe(data => {
      this.dataRole = data.role;
      console.log('docente', this.data);
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
      },
    };
    this.route.queryParams
      .subscribe(params => {
        console.log('videne desde inscripcion', params.modal);
        if (params.modal === 'show'){
          params.model = '';
          $('#myModal').modal('show');
        }
      });
    this.myForm = this.fb.group({
      id: [null, Validators.required],
      dni: [null, [Validators.required, Validators.maxLength(15),
        Validators.minLength(7), Validators.pattern('^[0-9]{1,}[0-9]{0,}-[\\w-]{1,}([a-zA-Z]{1,}|[\\w-]{1,}[a-zA-Z]{1,})$')]],
      nombres: [null, [Validators.required, Validators.maxLength(25)]],
      app: [null, [Validators.required, Validators.maxLength(25)]],
      apm: [null, [Validators.required, Validators.maxLength(25)]],
      sexo: [null, Validators.required],
      fechaNac: [null, Validators.required],
      direccion: [null, Validators.required],
      fono: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(5)]],
      // name: [null, [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.maxLength(100), Validators.email]],
      // password: [null, [Validators.required, Validators.maxLength(60), Validators.minLength(8)]],
      // password_confirmation: [null, [Validators.required, Validators.maxLength(60), Validators.minLength(8)]],
      estado: [null, Validators.required],
      role: [null, Validators.required],
      titulo: [null, Validators.required],
      fecEmision: [null, Validators.required],
    });
    this.editForm = this.fb.group({
      id: [null, Validators.required],
      dni: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(7)]],
      nombres: [null, [Validators.required, Validators.maxLength(60), Validators.minLength(5)]],
      app: [null, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      apm: [null, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      sexo: [null, Validators.required],
      fechaNac: [null, Validators.required],
      direccion: [null, Validators.required],
      fono: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(5)]],
      // name: [null, [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.maxLength(100), Validators.email]],
      estado: [null, Validators.required],
      role: [null, Validators.required],
    });
    this.mas = this.fb.group({
      titulo: [null, Validators.required],
      fecEmision: [null, Validators.required],
    });
  }
  masTitul(model: any) {
      this.datosArray.push({
        titulo: model.titulo,
        fecEmision: model.fecEmision,
      });
      console.log('masTitul', this.datosArray);
  }
  post(model: any) {
    console.log('funciona',model);
    const fecha = moment().format('YYYY-MM-DD');
    const fecha1 = moment(fecha);
    const fecha2 = moment(model.fechaNac);

    const datofec = fecha1.diff(fecha2, 'days');

    let anos = moment(fecha).diff(fecha2, 'years');
    console.log('dias', datofec);
    console.log('fecha', anos);
    this.datos.model = model;
    this.masTitul(model);
    this.datos.formacion = this.datosArray;
    console.log('prueba', this.datos)
   /* if (anos >= 18){
      console.log('entro por qui');
      this.userService.postUsers(model).subscribe(data => {
        this.data.push(data.user);
        console.log(data.user);
        $('#myModal').modal('hide');
        swal('¡Buen trabajo!', '¡Hiciste clic en el botón!', 'success');
      });
      this.myForm.reset();
    } else {
      this.showToast(this.type, this.title, this.content);
    }*/
  }
  show(formData) {
    console.log('formData', formData);
    const perFormArray = <FormArray>this.editForm.controls.role;
    this.id = formData.id;
    this.editForm.controls['id'].setValue(formData.persona.id);
    this.editForm.controls['dni'].setValue(formData.persona.dni);
    this.editForm.controls['nombres'].setValue(formData.persona.nombres);
    this.editForm.controls['app'].setValue(formData.persona.app);
    this.editForm.controls['apm'].setValue(formData.persona.apm);
    this.editForm.controls['sexo'].setValue(formData.persona.sexo);
    this.editForm.controls['fechaNac'].setValue(formData.persona.fechaNac);
    this.editForm.controls['direccion'].setValue(formData.persona.direccion);
    this.editForm.controls['fono'].setValue(formData.persona.fono);
    // this.editForm.controls['name'].setValue(formData.name);
    this.editForm.controls['email'].setValue(formData.email);
    this.editForm.controls['estado'].setValue(formData.estado);
    //this.editForm.controls['role'].setValue(formData.role);
    for (let i = 0; i < formData.roles.length; i++) {
      console.log('idRol', formData.roles[i].id);
      //this.editForm.controls['role'].setValue(formData.roles[i].id);
      (this.editForm.get('role') as FormArray).push(new FormControl(formData.roles[i].id));
    }
    /*formData.role.forEach(element => {
      console.log('element',element);
      //(this.editForm.get('role') as FormArray).push(new FormControl(element.id));
      this.editForm.controls['role'].setValue(element.id);
    });*/
  }

  edit(model: any) {
    const formValue = this.editForm.getRawValue();
    const index = this.data.findIndex( data => data.id == formValue.id);
    this.model = model;
    this.model.id = this.id;
    this.userService.putUsers(this.model.id, this.model).subscribe( data => {
      console.log(data);
      console.log('formValue', formValue);
      this.data[index].dni = formValue.dni;
      this.data[index].nombres = formValue.nombres;
      this.data[index].app = formValue.app;
      this.data[index].apm = formValue.apm;
      this.data[index].sexo = formValue.sexo;
      this.data[index].fechaNac = formValue.fechaNac;
      this.data[index].direccion = formValue.direccion;
      this.data[index].fono = formValue.fono;
      // this.data[index].name = formValue.name;
      this.data[index].email = formValue.email;
      this.data[index].estado = formValue.estado;
      $('#myModalEdit').modal('hide');
      swal('¡Buen trabajo!', '¡Hiciste clic en el botón!', 'success');
    });
    this.editForm.reset();
  }

  remove(model: any) {
    this.id = model.id;
    const formValue = this.editForm.getRawValue();
    const index = this.data.findIndex( data => data.id == formValue.id);
    console.log('formValue', formValue);
    if (model.estado === 1){
      const estado: any = {};
      estado.estado = 0;
      swal({
        title: '¿Estás seguro?',
        text: 'Desea inabilitar usuario, ¡usted podrá habilitar mas tarde!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, ¡inhabilitar!',
      }).then((willDelete) => {
        if (willDelete.value) {
          this.userService.putEstado(this.id, estado).subscribe(data => {
            console.log('uqe loco',data);
            swal(
              'Poof!',
              '¡Tu archivo ha sido desabilitado!',
              'success',
            );
          });
        }
      });
    } else {
      const estado: any = {};
      estado.estado = 1;
      swal({
        title: '¿Estás seguro?',
        text: 'Desea habilitar usuario, ¡usted podrá inhabilitar mas tarde!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, ¡habilitar!',
      }).then((willDelete) => {
        if (willDelete.value) {
          this.userService.putEstado(this.id, estado).subscribe(data => {
            console.log('uqe loco',data);
            swal(
              'Poof!',
              '¡Tu archivo ha sido habilitado!',
              'success',
            );
          });
        }
      });
    }
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
