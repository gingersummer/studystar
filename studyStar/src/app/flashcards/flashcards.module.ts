import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlashcardsPageRoutingModule } from './flashcards-routing.module';

import { FlashcardsPage } from './flashcards.page';
import { FlashcardcollectionComponent } from '../components/flashcardcollection/flashcardcollection.component';
import { NewcardComponent } from '../components/newcard/newcard.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlashcardsPageRoutingModule,
    MatProgressBarModule,
  ],
  declarations: [FlashcardsPage, FlashcardcollectionComponent, NewcardComponent]
})
export class FlashcardsPageModule {}
