import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudyMethodsPageRoutingModule } from './study-methods-routing.module';

import { StudyMethodsPage } from './study-methods.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudyMethodsPageRoutingModule
  ],
  declarations: [StudyMethodsPage]
})
export class StudyMethodsPageModule {}
