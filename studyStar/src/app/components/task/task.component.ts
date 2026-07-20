import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: false,
})
export class TaskComponent  implements OnInit {

  @Input({required: true}) taskToDisplay!: string

  constructor(
  ) { 
  }

  ngOnInit() {}

}
