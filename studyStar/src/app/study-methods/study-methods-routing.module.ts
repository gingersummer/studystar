import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudyMethodsPage } from './study-methods.page';

const routes: Routes = [
  {
    path: '',
    component: StudyMethodsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudyMethodsPageRoutingModule {}
