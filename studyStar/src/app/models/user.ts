import { Set } from "./Set"
import { Task } from "./task"

export class User {
    // class variables
    id?: string
    picture?: string
    username: string
    email: string
    uid?: string
    setsCompleted: number
    lastSet: string
    allSets: Set[]
    allTasks: Task[]
    allDeadlines: string[]


    constructor(usernameIn: string, emailIn: string, setsCompletedIn: number, lastSetIn: string, allSetsIn: Set[], allTasksIn: Task[], allDeadlinesIn: string[], uidIn?: string, pictureIn?: string, idIn?: string, ) {
        this.username = usernameIn,
        this.email = emailIn,
        this.uid = uidIn,
        this.setsCompleted = setsCompletedIn,
        this.lastSet = lastSetIn,
        this.picture = pictureIn,
        this.id = idIn
        this.allSets = allSetsIn
        this.allTasks = allTasksIn
        this.allDeadlines = allDeadlinesIn
    }
}
