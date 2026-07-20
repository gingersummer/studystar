import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {

  tasksArray: string[] = []

  constructor() { }
  
}
