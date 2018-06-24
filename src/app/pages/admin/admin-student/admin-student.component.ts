import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
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

  public myForm: FormGroup;
  public editForm: FormGroup;

  id: number;
  data: any[];
  model: any;
  dataModuleEval = [];
  dataEvalCriterio: any = [];
  dataPro: any = [];
  dataUnion: any = {};
  dataP: any = [];
  constructor(private evaluacion: EvaluationService, private authService: NbAuthService, private fb: FormBuilder) { }

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
  mosff(data: any){
    console.log('mosssssss', data.id);
    this.dataUnion = data.id;
  }
  evalCriterio(id: any) {
    this.evaluacion.getEvalCriterio(this.authService.getUs().persona.id, id).subscribe(data => {
      this.dataEvalCriterio = data.criterioEstudiante;
      console.log('entro');
      this.guardarCriterios()
    });
  }
  guardarCriterios() {
    this.dataP = this.dataPro;
    console.log('guardar', this.dataP);
  }
  verfuncion() {
    for (let i = 0; i < this.dataModuleEval.length; i++) {
      this.evalCriterio(this.dataModuleEval[i].modulo_id);
      console.log('crrr', this.guardarCriterios());
      this.dataPro.push({
        'nombremodulo': this.dataModuleEval[i].nombremodulo,
        'modalidad': this.dataModuleEval[i].modalidad,
        'grupo' : this.dataModuleEval[i].grupo,
        'nombre' : this.dataModuleEval[i].nombre,
        'criterio': this.dataP,
      });
    }
  }
  mostrarModulos(id: any) {
    console.log('idddd', id.id);
    this.evaluacion.getModuleEval(this.authService.getUs().persona.id, id.id).subscribe(data => {
      this.dataModuleEval = data.moduleval;
      this.dtTrigger.next();
   /*   console.log('mostrar', this.dataModuleEval);
      this.verfuncion();*/
      for (let i = 0; i < this.dataModuleEval.length; i++) {
        //this.evalCriterio(this.dataModuleEval[i].modulo_id);
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
}
