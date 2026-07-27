import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deadline',
  templateUrl: './deadline.component.html',
  styleUrls: ['./deadline.component.scss'],
  standalone: false,
})
export class DeadlineComponent  implements OnInit {

  @Input({ required: true }) deadlineToDisplay!: string

  constructor() { }

  ngOnInit() {}

}
