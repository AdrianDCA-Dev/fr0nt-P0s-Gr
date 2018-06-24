import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import swal from 'sweetalert2';
import { CampoIndicadoresService } from '../../../services/campo-indicadores/campo-indicadores.service';

declare var $: any;

@Component({
  selector: 'ngx-admin-campo-indicadores',
  templateUrl: './admin-campo-indicadores.component.html',
  styleUrls: ['./admin-campo-indicadores.component.scss'],
})
export class AdminCampoIndicadoresComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  public myForm: FormGroup;
  public editForm: FormGroup;

  id: number;
  data: any[];
  model: any;
  dataIndicadores: any = [];
  datos: any = {};

  constructor(private campoIndicadores: CampoIndicadoresService, private fb: FormBuilder) { }

  ngOnInit() {
    this.campoIndicadores.getCamInd().subscribe(data => {
      this.data = data.registroindicadores;
      this.dtTrigger.next();
      console.log('registroindicadores', this.data);
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
      },
      columnDefs: [
        { "width": "40%", "targets": 1 },
        { "width": "40%", "targets": 2 },
        { "width": "20%", "targets": 3 },
      ]
    };
    this.myForm = this.fb.group({
      id: [null, Validators.required],
      fecha: [null, Validators.required],
      valido: [null],
      tipo: [null, Validators.required],
      detalle: [null, Validators.required],
      valor: [null, Validators.required],
    });
    this.editForm = this.fb.group({
      id: [null, Validators.required],
      fecha: [null, Validators.required],
      valido: [null],
      tipo: [null, Validators.required],
      detalle: [null, Validators.required],
      valor: [null, Validators.required],
    });
  }
  anadir(model: any) {
    console.log(model);
    //this.datos.fecha = model.fecha;
    this.datos.tipo = model.tipo;

    this.dataIndicadores.push({
      detalle: model.detalle,
      valor: model.valor,
    });
    $('#stop1').prop('disabled', true);
    $('#stop2').prop('disabled', true);
    this.myForm.controls['detalle'].reset();
    this.myForm.controls['valor'].reset();
  }
  showEdit(formData) {
    this.id = formData.id;
    this.editForm.controls['id'].setValue(formData.id);
    this.editForm.controls['detalle'].setValue(formData.detalle);
    this.editForm.controls['valor'].setValue(formData.valor);
  }
  post() {
    this.datos.indicadores = this.dataIndicadores;
    console.log('prueba', this.datos);
    this.campoIndicadores.postCamInd(this.datos).subscribe(data => {
      this.data.push(data.registrocampo);
      $('#myModal').modal('hide');
      swal('¡Buen trabajo!', '¡Hiciste clic en el botón!', 'success');
      console.log('campoIndicadores', this.data);
    });
    this.myForm.reset();
  }
  postContent(model: any) {
    const index = this.dataIndicadores.indexOf(model);
    swal({
      title: 'Modificar :',
      input: 'textarea',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
        swal({
          type: 'success',
          title: 'Nuevo Contenido!',
          html: 'Se agrego: ' + result.value,
        })
        this.dataIndicadores[index].detalle.push(result.value);
      }
    });
  }
  removeTemporal(model: any) {
    console.log('model', model);
    const index = this.dataIndicadores.indexOf(model);
    console.log('index', index);
    if (index > -1) {
        this.dataIndicadores.splice(index);
    }
  }
}
