import { Set } from "./Set"

export class CurrentUser {
    // class variables
    id?: string
    picture?: string
    username: string
    email: string
    uid?: string
    setsCompleted: number
    lastSet: string
    allSets: Set[]


    constructor(usernameIn: string, emailIn: string, setsCompletedIn: number, lastSetIn: string, allSetsIn: Set[], uidIn?: string, pictureIn?: string, idIn?: string, ) {
        this.username = usernameIn,
        this.email = emailIn,
        this.uid = uidIn,
        this.setsCompleted = setsCompletedIn,
        this.lastSet = lastSetIn,
        this.picture = pictureIn,
        this.id = idIn
        this.allSets = allSetsIn
    }
}
