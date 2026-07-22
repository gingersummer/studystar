import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AgendaPageRoutingModule } from './agenda-routing.module';
import { AgendaPage } from './agenda.page';

// Custom Components
import { CalendarComponent } from '../components/calendar/calendar.component';
import { TaskmodalComponent } from '../components/taskmodal/taskmodal.component';
import { TaskComponent } from '../components/task/task.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaPageRoutingModule
  ],
  declarations: [
    AgendaPage,
    CalendarComponent,
    TaskmodalComponent,
    TaskComponent
  ]
})
export class AgendaPageModule {}