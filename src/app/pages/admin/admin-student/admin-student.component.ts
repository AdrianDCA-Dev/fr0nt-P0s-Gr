import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {EvaluationService} from '../../../services/evaluation/evaluation.service';
import {NbAuthService} from '../../../auth/services/auth.service';
import swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'ngx-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.scss'],
})
export class AdminStudentComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtTriggers: Subject<any> = new Subject();

  id: number;
  data: any[];
  model: any;
  dataModuleEval = [];
  dataEvalCriterio: any = [];
  dataPro: any = [];
  dataUnion: any = {};
  dataP: any = [];
  dataDetalleEstudiante: any[];
  evaluaciones: any = [];
  prueba = [
    {
      inscripcion_id: '',
      detalle_cronograma_id: '',
      valor: ''
    }
  ];
  constructor(private evaluacion: EvaluationService, private authService: NbAuthService) { }

  ngOnInit() {
    this.evaluacion.getProgramModule(this.authService.getUs().persona.id).subscribe(data => {
      this.data = data.programacademic;
      console.log(this.data);
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
      },
    };
  }
  guardarCriterios() {
    this.dataP = this.dataPro;
    this.dtTrigger.next();
    console.log('guardar', this.dataP);
  }

  mostrarModulos(id: any) {
    console.log('idddd', id.id);
    this.evaluacion.getModuleEval(this.authService.getUs().persona.id, id.id).subscribe(data => {
      this.dataModuleEval = data.moduleval;
      for (let i = 0; i < this.dataModuleEval.length; i++) {
        this.evaluacion.getEvalCriterio(this.authService.getUs().persona.id, this.dataModuleEval[i].modulo_id).subscribe(data => {
          this.dataEvalCriterio = data.criterioEstudiante;
          this.dataPro.push({
            'nombremodulo': this.dataModuleEval[i].nombremodulo,
            'modalidad': this.dataModuleEval[i].modalidad,
            'grupo' : this.dataModuleEval[i].grupo,
            'nombre' : this.dataModuleEval[i].nombre,
            'criterio': this.dataEvalCriterio,
          });
        });
      }
    });
    this.guardarCriterios();
  }
  estudiantes(data: any){
    this.evaluacion.getDetalleEstudiante(data.detalle_cronograma_id).subscribe(data => {
      this.dataDetalleEstudiante = data.inscripcion;
      this.dtTriggers.next();
      console.log('DetalleEstudiante', this.dataDetalleEstudiante);
    });
  }

  postEvaluacion(model: any) {
    const data = [{
      "Rolo Rolo": "60",
      "lula lula": "50",
    }];
    console.log('postEval', data);
  }
}
