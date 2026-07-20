import da from "@mobiscroll/angular/dist/js/i18n/da"

export class Task {
    isCompleted: boolean = false
    taskToDo: string
    day: number
    month: number
    year: number
    priority: number
    percentComplete: number = 0

    constructor(taskTodoIn: string, monthIn: number, dayIn: number,
         yearIn: number, priorityIn: number) {
        this.taskToDo = taskTodoIn
        this.day = dayIn
        this.month = monthIn
        this.year = yearIn
        this.priority = priorityIn

    }


}