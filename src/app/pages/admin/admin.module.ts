import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { AdminRoutingModule, routedComponents } from './admin-routing.module';
import {DataTablesModule} from 'angular-datatables';
import {ToasterModule} from 'angular2-toaster';
import { CalendarModule} from 'angular-calendar';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  NbActionsModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
} from '@nebular/theme';
import {BoolEstadoPipe} from "../../pipes/bool-estado/bool-estado.pipe";
import {BoolTypeEvalPipe} from "../../pipes/bool-type-eval/bool-type-eval.pipe";

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AdminRoutingModule,
    DataTablesModule,
    ToasterModule,
    CalendarModule.forRoot(),
    NgSelectModule,
    NbMenuModule,
  ],
  declarations: [
   ...routedComponents, BoolEstadoPipe, BoolTypeEvalPipe
  ],
})
export class AdminModule { }
