import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import swal from 'sweetalert2';
import {CronogramaService} from '../../../services/cronograma/cronograma.service';
import {AcademicProgramService} from '../../../services/academic-program/academic-program.service';
import { format, startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { Grupo } from '../../../models/grupo';
import { horaIgualValidator } from '../../../directives/hora-igual/hora-igual.directive';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

import 'style-loader!angular2-toaster/toaster.css';

declare var $: any;

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'ngx-admin-cronograma',
  templateUrl: './admin-cronograma.component.html',
  styleUrls: ['./admin-cronograma.component.scss'],
})
export class AdminCronogramaComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

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

  Cargandodatos = false;
  view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
  /*  {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
      /!*  this.handleEvent('Edited', event);*!/
      },
    },*/
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
       /* this.handleEvent('Deleted', event);*/
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
/*    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },*/
  ];
  activeDayIsOpen: boolean = true;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  public myForm: FormGroup;
  public editForm: FormGroup;

  id: number;
  data: any[];
  model: any;
  dataProgramAcademicActive: any[];
  datos: any = {};
  dataAmbiente: any[];
  dataDocente: any[];
  dataProgramModule: any[];
  idProgramAcademico: number;
  dataProrgramaAcademico: any[];
  grupo: Grupo[] = [
    {id: 1, nombre: 'A'},
    {id: 2, nombre: 'B'},
    {id: 3, nombre: 'C'},
  ];
  dataAnadir: any = [];
  nombreProgramAcademy: string;
  titleDocente: string;
  titleAmbiente: string;
  titleModulo: string;
  titleGrupo: string;
  cargarTitulos: any = [];
  dataProgramModuleSelect: any = [];
  dataProgramModuleSelectSi: any = [];
  n = 1;
  dataProgramModuleSelectMostrar: any = [];
  v = 1;
  constructor(private cronogramaService: CronogramaService, private programAcademicActiveService: AcademicProgramService,
              private toasterService: ToasterService, private modal: NgbModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.cronogramaService.getCronograma().subscribe(data => {
      this.data = data.cronograma;
      this.dtTrigger.next();
      console.log('cronograma', this.data);
    });
    this.programAcademicActiveService.getProgramActive().subscribe(data => {
      this.dataProgramAcademicActive = data.programacademic;
    });
    this.cronogramaService.getAmbiente().subscribe(data => {
      this.dataAmbiente = data.ambiente;
    });
    this.cronogramaService.getDocente().subscribe(data => {
      this.dataDocente = data.docente;
      console.log('Docente', this.dataDocente);
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
      },
      columnDefs: [
      { "width": "15%", "targets": 1 },
      { "width": "25%", "targets": 2 },
      { "width": "50%", "targets": 3 },
      { "width": "10%", "targets": 4 },
    ],
    };
    this.myForm = this.fb.group({
      id: [null, Validators.required],
      //duracion_dc: [null, [Validators.required]],
      version: [null, [Validators.required, Validators.maxLength(4)]],
      fecha: [null, Validators.required],
      programa_academico_id: [null, Validators.required],
      modulo_id: [null, Validators.required],
      persona_id: [null, Validators.required],
      ambiente_id: [null, Validators.required],
      fechaIni: [null, Validators.required],
      vigente: [null, Validators.required],
      fechaCalendario: [null, Validators.required],
      horaIni: [null, Validators.required],
      horaFin: [null, Validators.required],
      grupo: [null, Validators.required],
    });
    this.editForm = this.fb.group({
      id: [null, Validators.required],
      //duracion_dc: [null, Validators.required],
      version: [null, [Validators.required, Validators.maxLength(4)]],
      fecha: [null, Validators.required],
      programa_academico_id: [null, Validators.required],
      modulo_id: [null, Validators.required],
      persona_id: [null, Validators.required],
      ambiente_id: [null, Validators.required],
      fechaIni: [null, Validators.required],
      vigente: [null, Validators.required],
      fechaCalendario: [null, Validators.required],
      horaIni: [null, Validators.required],
      horaFin: [null, Validators.required],
      grupo: [null, Validators.required],
    });
  }

  show(formData) {
    console.log('formData', formData);
    this.id = formData.id;
    this.editForm.controls['id'].setValue(formData.id);
    this.editForm.controls['version'].setValue(formData.version);
    this.editForm.controls['fecha'].setValue(formData.fecha);
    this.editForm.controls['programa_academico_id'].setValue(formData.programa_academico_id);
  }

  edit(model: any) {
    const formValue = this.editForm.getRawValue();
    const index = this.data.findIndex( data => data.id == formValue.id);

    this.model = model;
    this.model.id = this.id;
    this.cronogramaService.putCronograma(this.model.id, this.model).subscribe( data => {
      console.log(data);
      this.data[index].version = formValue.version;
      this.data[index].fecha = formValue.fecha;
      this.data[index].programa_academico_id = formValue.programa_academico_id;
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
        this.cronogramaService.deleteCronograma(this.id).subscribe(data => {
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

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
   /* this.handleEvent('Dropped or resized', event);*/
    this.refresh.next();
  }

/*  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }*/

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      actions: this.actions,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    });
    for (let i = 0; i < this.events.length; i++) {
        console.log('pruebaHORA', this.events[i].end);
        const diaStart = moment('2018/04/30');
        const diaEnd = moment('2018/05/07');
        const minStart = this.events[i].start.getMinutes();
        const minEnd = this.events[i].end.getMinutes();
        const diff = diaEnd.diff(diaStart, 'days');

        console.log('dias', diff + 1);
        console.log('hora', this.events[i].end.getHours());
        console.log('minutos start', this.events[i].start.getMinutes());
        console.log('minutos end', this.events[i].end.getMinutes());
        console.log('segundos', this.events[i].end.getSeconds());
    }
    //this.datos.calendario = this.events;
    console.log('calendar', this.events);
    this.refresh.next();
  }
  anadir(model: any) {
    console.log('model', model);
    this.datos.version = model.version;
    this.datos.fecha = model.fecha;
    this.datos.programa_academico_id = model.programa_academico_id;
    this.titleGrupo = model.grupo;

    for (let i = 0; i < this.dataProgramAcademicActive.length; i++) {
      if (model.programa_academico_id === this.dataProgramAcademicActive[i].id) {
          this.nombreProgramAcademy = this.dataProgramAcademicActive[i].nombre;
      }
    }
    for (let i = 0; i < this.dataDocente.length; i++) {
      if (model.persona_id === this.dataDocente[i].id) {
          this.titleDocente = this.dataDocente[i].nombres + ' ' + this.dataDocente[i].app + ' ' + this.dataDocente[i].apm;
      }
    }
    for (let i = 0; i < this.dataAmbiente.length; i++) {
      if (model.ambiente_id === this.dataAmbiente[i].id) {
          this.titleAmbiente = this.dataAmbiente[i].nombre;
      }
    }
    for (let i = 0; i < this.dataProgramModule.length; i++) {
      if (model.modulo_id === this.dataProgramModule[i].id) {
          this.titleModulo = this.dataProgramModule[i].nombremodulo;
      }
    }
    this.dataAnadir.push({
      modulo_id: model.modulo_id,
      persona_id: model.persona_id,
      ambiente_id: model.ambiente_id,
      modulo: this.titleModulo,
      docente: this.titleDocente,
      ambiente: this.titleAmbiente,
      //duracion_dc: model.duracion_dc,
      grupo: model.grupo,
      calendario: this.events,
    });
    this.datos.detallecronograma = this.dataAnadir;
    this.cargarTitulos.push({
      modulo: this.titleModulo,
      docente: this.titleDocente,
      ambiente: this.titleAmbiente,
    })
    console.log('anadido', this.datos);
    console.log('titulos', this.cargarTitulos);
  }
  eliminarAnadido(model: any) {
    const index = this.dataAnadir.indexOf(model);
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
        if (index > -1) {
          console.log('INDEX2', index);
          this.dataAnadir.splice(index, 1);
        }
      }
    });
  }
  post() {
    console.log('Enviado', this.datos);
    this.cronogramaService.postCronograma(this.datos).subscribe(data => {
      this.data.push(data.cronograma);
      this.showToast(this.type, this.title, this.content);
    });
    this.myForm.reset();
    this.events = [];
  }
  programModule(model: any) {
    console.log('pruebamodel', model);
    this.idProgramAcademico = model.id;
  /*  this.cronogramaService.getProgramAcademico(model.id).subscribe(data => {
      this.dataProrgramaAcademico = data.duracion_pa;
      console.log('ProgramaAcademico', this.dataProrgramaAcademico);
    });*/
    this.Cargandodatos = true;
    this.cronogramaService.getProgramModule(model.id).subscribe(data => {
      this.dataProgramModule = data.progrmamodulo;
      console.log('modulos', this.dataProgramModule);
      this.Cargandodatos = false;
    });
    if (this.data.length !== 0){
      console.log('verdadero');
      for (let i = 0; i < this.data.length; i++) {
        console.log('prueba', this.data[i].programa_academico.nombre);
        if (model.nombre === this.data[i].programa_academico.nombre) {
          this.v = this.v + 1;
          console.log('version', this.v);
          this.myForm.controls['version'].setValue(this.v);
        } else {
          this.v = 1;
          this.myForm.controls['version'].setValue(this.v);
        }
        for (let j = 0; j < this.data.length; j++) {
          console.log('prueba', this.data[j].programa_academico.nombre);
          if (model.nombre === this.data[j].programa_academico.nombre) {

          }
        }
      }
    } else {
      console.log('falso');
      this.myForm.controls['version'].setValue(this.v);
      
    }


    this.myForm.controls['grupo'].setValue('A');
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
