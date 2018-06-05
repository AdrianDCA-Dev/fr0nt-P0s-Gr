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
  dataModuleEval: any[];
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

  mostrarModulos(id: any) {
    console.log('idddd', id.programa_academico_id);
    this.evaluacion.getModuleEval(this.authService.getUs().persona.id, id.programa_academico_id).subscribe(data => {
      this.dataModuleEval = data.moduleval;
      this.dtTrigger.next();
      console.log('mostrar', this.dataModuleEval);
    });
  }

}
