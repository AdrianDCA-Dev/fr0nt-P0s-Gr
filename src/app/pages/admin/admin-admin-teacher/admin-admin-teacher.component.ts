import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {NbAuthService} from '../../../auth/services/auth.service';
import swal from 'sweetalert2';
import {EvaluationAdminDocenteService} from "../../../services/evaluation-admin-docente/evaluation-admin-docente.service";
import {Eval} from "../../../models/eval";
import * as $ from "jquery";

@Component({
  selector: 'ngx-admin-admin-teacher',
  templateUrl: './admin-admin-teacher.component.html',
  styleUrls: ['./admin-admin-teacher.component.scss'],
})
export class AdminAdminTeacherComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  id: number;
  data: any[];
  model: any;
  dataIndicadores: any[];
  eval: Eval[] = [
    {id: 1, nombre: 'NUNCA', valor: 0},
    {id: 2, nombre: 'POCAS VECES', valor: 2},
    {id: 3, nombre: 'REGULARMENTE', valor: 3},
    {id: 4, nombre: 'GENERALMENTE', valor: 4},
    {id: 5, nombre: 'SIEMPRE', valor: 5},
  ];
  constructor(private evalAdminDocente: EvaluationAdminDocenteService) { }

  ngOnInit() {
    this.evalAdminDocente.getAmdinDocete().subscribe(data => {
      this.data = data.admindocente;
      this.dtTrigger.next();
      console.log('admindocente', this.data);
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
      },
      /*columnDefs: [
        { "width": "10%", "targets": 1 },
        { "width": "10%", "targets": 2 },
        { "width": "10%", "targets": 3 },
        { "width": "20%", "targets": 4 },
        { "width": "20%", "targets": 5 },
        { "width": "20%", "targets": 6 },
        { "width": "10%", "targets": 7 },
      ]*/
    };
    $(document).ready(function () {

      var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

      allWells.hide();

      navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
          $item = $(this);

        if (!$item.hasClass('disabled')) {
          navListItems.removeClass('btn-success').addClass('btn-default');
          $item.addClass('btn-success');
          allWells.hide();
          $target.show();
          //$target.find('input:eq(0)').focus();
        }
      });

      allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
          curStepBtn = curStep.attr("id"),
          nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
          curInputs = curStep.find("button,input[type='url']"),
          isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
          /*if (!curInputs[i].validity.valid) {
            isValid = false;
            $(curInputs[i]).closest(".form-group").addClass("has-error");
          }*/
        }

        if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
      });

      $('div.setup-panel div a.btn-success').trigger('click');
    });

  }
  show(model: any) {
    console.log(model.id);
  }
  postEvaluacion(data: any){

  }
}
