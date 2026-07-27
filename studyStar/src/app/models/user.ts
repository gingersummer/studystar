import { CalendarEvent } from "../components/calendar/calendar.component"
import { Set } from "./Set"
import { Task } from "./task"

export class User {
    // class variables
    id?: string
    username: string
    email: string
    uid?: string
    setsCompleted: number
    lastSet: string
    allSets: Set[]
    allTasks: Task[]
    allDeadlines: string[]
    allEvents: CalendarEvent[]


    constructor(usernameIn: string, emailIn: string, setsCompletedIn: number, lastSetIn: string, allSetsIn: Set[], allTasksIn: Task[], allDeadlinesIn: string[], allEventsIn: CalendarEvent[], uidIn?: string, idIn?: string, ) {
        this.username = usernameIn,
        this.email = emailIn,
        this.uid = uidIn,
        this.setsCompleted = setsCompletedIn,
        this.lastSet = lastSetIn,
        this.allEvents = allEventsIn,
        this.id = idIn
        this.allSets = allSetsIn
        this.allTasks = allTasksIn
        this.allDeadlines = allDeadlinesIn
    }
}
