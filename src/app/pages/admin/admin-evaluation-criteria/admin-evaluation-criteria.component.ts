import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import swal from 'sweetalert2';
import {EvaluationCriteriaService} from '../../../services/evaluation-criteria/evaluation-criteria.service';
import {InscriptionService} from '../../../services/inscription/inscription.service';
import {Observable} from 'rxjs/Observable';
import {TypeEvaluation} from '../../../models/type-evaluation';

declare var $: any;

@Component({
  selector: 'ngx-admin-evaluation-criteria',
  templateUrl: './admin-evaluation-criteria.component.html',
  styleUrls: ['./admin-evaluation-criteria.component.scss'],
})
export class AdminEvaluationCriteriaComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  public myForm: FormGroup;
  public editForm: FormGroup;

  id: number;
  data: any[];
  model: any;
  dataDetalleCronograma: any[];
  dataCriterio = [];
  dataNotas: any = [];

  typeEvaluation: TypeEvaluation[] = [
    {id: 1, nombre: 'Docente'},
    {id: 2, nombre: 'Estudiante'},
  ];
  constructor(private evaluationCriteriaService: EvaluationCriteriaService, private detalleCronogramaService: InscriptionService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.evaluationCriteriaService.getEvaluationCriteria().subscribe(data => {
      this.data = data.criterio;
      this.dtTrigger.next();
      console.log('evalucion-criterio', this.data);
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
      },
      columnDefs: [
        { "width": "15%", "targets": 1 },
        { "width": "10%", "targets": 2 },
        { "width": "10%", "targets": 3 },
        { "width": "15%", "targets": 4 },
        { "width": "20%", "targets": 5 },
        { "width": "10%", "targets": 6 },
        { "width": "10%", "targets": 7 },
        { "width": "10%", "targets": 8 },
      ]
    };
    this.detalleCronogramaService.getInscriptionDetalleCronograma().subscribe(data => {
      this.dataDetalleCronograma = data.detallecronogrma;
      console.log('detallecronograma', this.dataDetalleCronograma);
    });
    this.myForm = this.fb.group({
      id: [null, Validators.required],
      fecha: [null, Validators.required],
      nombre: [null, Validators.required],
      porcentaje: [null, Validators.required],
      tipo_evaluacion: [null, Validators.required],
      valido: [null],
      detalle_cronograma_id: [null, Validators.required],
    });
    this.editForm = this.fb.group({
      id: [null, Validators.required],
      fecha: [null, Validators.required],
      nombre: [null, Validators.required],
      porcentaje: [null, Validators.required],
      tipo_evaluacion: [null, Validators.required],
      valido: [null],
      detalle_cronograma_id: [null, Validators.required],
    });
  }
  post(model: any) {
    console.log('criterio POST', model);
    this.evaluationCriteriaService.postEvaluationCriteria(model).subscribe(data => {
      this.data.push(data.criterio);
      $('#myModal').modal('hide');
      swal('¡Buen trabajo!', '¡Hiciste clic en el botón!', 'success');
    });
    this.myForm.reset();
  }

  show(formData) {
    console.log('formData', formData);
    this.id = formData.id;
    this.editForm.controls['id'].setValue(formData.id);
    this.editForm.controls['fecha'].setValue(formData.fecha);
    this.editForm.controls['nombre'].setValue(formData.nombre);
    this.editForm.controls['porcentaje'].setValue(formData.porcentaje);
    this.editForm.controls['tipo_evaluacion'].setValue(formData.tipo_evaluacion);
    this.editForm.controls['valido'].setValue(formData.valido);
    this.editForm.controls['detalle_cronograma_id'].setValue(formData.detalle_cronograma_id);
  }

  edit(model: any) {
    const formValue = this.editForm.getRawValue();
    const index = this.data.findIndex( data => data.id == formValue.id);

    this.model = model;
    this.model.id = this.id;
    this.evaluationCriteriaService.putEvaluationCriteria(this.model.id, this.model).subscribe( data => {
      console.log(data);
      this.data[index].fecha = formValue.fecha;
      this.data[index].nombre = formValue.nombre;
      this.data[index].porcentaje = formValue.porcentaje;
      this.data[index].tipo_evaluacion = formValue.tipo_evaluacion;
      this.data[index].valido = formValue.valido;
      this.data[index].detalle_cronograma_id = formValue.detalle_cronograma_id;
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
        this.evaluationCriteriaService.deleteEvaluationCriteria(this.id).subscribe(data => {
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

}
