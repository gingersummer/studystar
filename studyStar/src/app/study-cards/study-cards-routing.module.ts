import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudyCardsPage } from './study-cards.page';

const routes: Routes = [
  {
    path: '',
    component: StudyCardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudyCardsPageRoutingModule {}
