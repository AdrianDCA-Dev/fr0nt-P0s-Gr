import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {NbAuthService} from '../../../auth/services/auth.service';
import swal from 'sweetalert2';
import {EvaluationDocenteService} from '../../../services/evaluation-docente/evaluation-docente.service';
import * as $ from 'jquery';
import {Eval} from "../../../models/eval";
import {QuizService} from "../../../services/quiz/quiz.service";

//declare var $: any;

@Component({
  selector: 'ngx-admin-teacher',
  templateUrl: './admin-teacher.component.html',
  styleUrls: ['./admin-teacher.component.scss'],
})
export class AdminTeacherComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  id: number;
  data: any[];
  model: any;
  dataCriterioDocente: any[];
  eval: Eval[] = [
    {id: 1, nombre: 'NUNCA', valor: 0},
    {id: 2, nombre: 'POCAS VECES', valor: 2},
    {id: 3, nombre: 'REGULARMENTE', valor: 3},
    {id: 4, nombre: 'GENERALMENTE', valor: 4},
    {id: 5, nombre: 'SIEMPRE', valor: 5},
  ];
  lleno: any = [];


  constructor(private evalestudiantedocente: EvaluationDocenteService,
              private quizMetrics: QuizService, private authService: NbAuthService) { }

  ngOnInit() {
    this.evalestudiantedocente.getEvaluationDocente(3).subscribe(data => {
      this.data = data.docente;
      this.dtTrigger.next();
      console.log('docente', this.data);
    });
    console.log('sss', this.quizQuestions);
    this.quizMetrics.cast.subscribe(quizActive => this.quizActive = quizActive);
    this.quizMetrics.cast2.subscribe(resultActive => this.resultActive = resultActive);
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
      },
      columnDefs: [
        { "width": "10%", "targets": 1 },
        { "width": "10%", "targets": 2 },
        { "width": "10%", "targets": 3 },
        { "width": "20%", "targets": 4 },
        { "width": "20%", "targets": 5 },
        { "width": "20%", "targets": 6 },
        { "width": "10%", "targets": 7 },
      ]
    };

  /*  $(document).ready(function () {

      var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allWellsButton = $('div.setup-content nb-card div input'),
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
          $target.find('input:eq(0)').focus();
        }

      });
      allWellsButton.click(function (e) {
        e.preventDefault();
        var $item = $(this);

          allWellsButton.removeClass('btn-success').addClass('btn-default');
          $item.addClass('btn-success');

      });
      allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
          curStepBtn = curStep.attr("id"),
          nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
          curInputs = curStep.find("input[type='button'],input[type='url']"),
          isValid = true;
        console.log('curStepBtn', curStepBtn);
        console.log('nextStepWizard', nextStepWizard);
        console.log('curInputs', curInputs);
        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
          console.log('cusInput[i]', curInputs[i]);
         /!* if (!curInputs[i].validity.valid) {
            isValid = false;
            $(curInputs[i]).closest(".form-group").addClass("has-error");
          }*!/
        }

        if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
      });

      $('div.setup-panel div a.btn-success').trigger('click');
      $('div.setup-content nb-card div input.btn-success').trigger('click');
    });*/








   /* $("#mi-boton").click(function(){
      $(this).toggleClass("btn-success btn-default");
    });
    var navListButton = $('div.setup-panel div a'),
      allWells = $('.setup-content div button');
    //allWells.hide();
    navListButton.click(function (e) {
      //e.preventDefault();
      console.log('clik', e);
      var $target = $($(this).attr('href')),
        $item = $(this);

      allWells.removeClass('btn-default').addClass('btn-success');
      $item.addClass('btn-default').removeClass('btn-success');
      //allWells.hide();
      $target.show();
      //  $target.find('button:eq(0)').focus();

    });*/
  /*  var c1 = 'b1', c2 = 'b2', c3 = 'b3', c4 = 'b4', c5 = 'b5';
    $("#b1, #b2, #b3, #b4, #b5").click(function(e){

        $(this).toggleClass("btn-success btn-default");

        $(this).toggleClass("btn-default btn-success");

      alert("Buttonw: "+e.currentTarget.id + c1);
    });*/
   /* $('.btn').bind("click", function(event) {
      event.preventDefault();
      var index = $(this).parent().index();
      $('p span').text(index);
    });*/

  }
  num: number;
  questions;
  errorMsg;
  activeQuestion = 0;
  quizQuestions = this.quizMetrics.quizQuestions;
  quizActive;
  resultActive;
  numQuestionAnswered = 0;
  error = false;
  finalize = false;
  correctAnswer = this.quizMetrics.correctAnswerapi;
  numCorrect = 0;
  ractiveQuestion = 0;
  valor: number = 0;
  criterioDocente(data: any){
    this.evalestudiantedocente.getCriterioDocente().subscribe(data => {
      this.dataCriterioDocente = data.criterioDocente;
      console.log('criterio', this.dataCriterioDocente);
    });
  }
  prest(){

    /*$('.btn').on('click',function(){
      $('.btn').removeClass('btn-success').addClass('btn-default');
      $(this).removeClass('btn-default').addClass('btn-success');
    })*/
  /*  $('.can').click(function() {
      $('.can').removeClass('btn-default').addClass('btn-success');
      $(this).addClass('btn-default').removeClass('btn-success');
    });*/
    /*$('.can').click(function() {
      $('.can').removeClass('btn-default').addClass('btn-success');
      $(this).addClass('btn-default').removeClass('btn-success');
    });*/


  }
  postEvaluacion(data: any){

  }


  showHttp() {
    console.log(this.questions);
  }

  calculatePercentage() {
/*    return(this.numCorrect / this.quizQuestions.length * 100);*/
    return(this.valor);
  }

  rsetActiveQuestion(i) {
    this.ractiveQuestion = i;
  }
  backFact = function() {
    this.numCorrect = 0;
    for (let i = 0; i < this.quizQuestions.length; i++) {
      this.quizQuestions[i].selected = null;
      this.quizQuestions[i].correct = null;
    }
    this.quizMetrics.changeState('quiz', true);
    this.quizMetrics.changeState('results', false);
    // alert(this.quizActive);
  };

  getAnswerClass(i) {
    if (i === this.correctAnswer[this.ractiveQuestion] ) {
      return 'bg-success';
    } else if ( i === this.quizQuestions[this.ractiveQuestion].selected) {
      return 'bg-danger';
    }
  }

  selectAnswer(i) {
    this.quizMetrics.quizQuestions[this.activeQuestion].selected = i;
    console.log('valor', i);
  }
  setActiveQuestion(i) {
    console.log('setAvtive', i);
    if (i === undefined) {
      let breakOut = false;
      let quizlength = this.quizMetrics.quizQuestions.length - 1;
      while (!breakOut) {
        this.activeQuestion = this.activeQuestion < quizlength ? ++this.activeQuestion : 0;
        if (this.activeQuestion === 0) {
          this.error = true;
        }
        if (this.quizMetrics.quizQuestions[this.activeQuestion].selected === null) {
          breakOut = true;
        }
      }
    } else {
      this.activeQuestion = i;
    }


  }
  questionAnswered() {
    let quizlength = this.quizMetrics.quizQuestions.length;
    if (this.quizQuestions[this.activeQuestion].selected !== null) {
      this.numQuestionAnswered++;
      if (this.numQuestionAnswered >= quizlength) {
        for (let i = 0; i < quizlength; i++) {
          if (this.quizMetrics.quizQuestions[i].selected === null) {
            this.setActiveQuestion(i);
            return false;
          }
        }
        this.error = false;
        this.finalize = true;
        return false;
      }
    }
    this.setActiveQuestion(undefined);
  }

  finalizeAnswer() {
    this.finalize = false;
    this.numQuestionAnswered = 0;
    this.activeQuestion = 0;
    this.markQuiz();
    this.quizMetrics.changeState('results', true);
  }

  markQuiz() {
    for (let i = 0; i < this.quizMetrics.quizQuestions.length; i++ ) {
      console.log('correc', this.correctAnswer[i]);
      console.log('quiz', this.quizMetrics.quizQuestions[i].selected);
      this.valor = this.valor + this.quizMetrics.quizQuestions[i].selected;
      console.log('valor', this.valor);
      if (this.quizMetrics.quizQuestions[i].selected === this.correctAnswer[i]) {
        this.quizMetrics.quizQuestions[i].correct = true;
        this.numCorrect++;
        console.log('num', this.numCorrect);
      } else {
        this.quizMetrics.quizQuestions[i].correct = false;
      }
    }
  }

}
