import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudyCardsPageRoutingModule } from './study-cards-routing.module';

import { StudyCardsPage } from './study-cards.page';
import { FlashCard } from '../models/flashcard';
import { FlashcardComponent } from '../components/flashcard/flashcard.component';
import { ConfidenceComponent } from '../confidence/confidence.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudyCardsPageRoutingModule,
  ],
  declarations: [StudyCardsPage, FlashcardComponent, ConfidenceComponent]
})
export class StudyCardsPageModule {}
