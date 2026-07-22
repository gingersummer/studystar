import { Component, Input, OnInit } from '@angular/core';
import { FlashCard } from '../../models/flashcard';

@Component({
  selector: 'app-newcard',
  templateUrl: './newcard.component.html',
  styleUrls: ['./newcard.component.scss'],
  standalone: false,
})
export class NewcardComponent  implements OnInit {

  @Input({required: true}) cardToDisplay!: FlashCard

  constructor() { }

  ngOnInit() {}

}
