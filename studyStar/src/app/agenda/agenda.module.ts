import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaPageRoutingModule } from './agenda-routing.module';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { AgendaPage } from './agenda.page';
import { MbscModule } from '@mobiscroll/angular';
import { TaskmodalComponent } from '../components/taskmodal/taskmodal.component';
import { TaskComponent } from '../components/task/task.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaPageRoutingModule,
    MbscModule
  ],
  declarations: [AgendaPage, CalendarComponent, TaskmodalComponent, TaskComponent]
})
export class AgendaPageModule {}
