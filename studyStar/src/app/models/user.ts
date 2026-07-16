export class User {
    // class variables
    id?: string
    picture?: string = "studystar/studyStar/src/assets/default.png"
    username: string
    email: string
    uid?: string
    setsCompleted: number
    lastSet: string


    constructor(usernameIn: string, emailIn: string, setsCompletedIn: number, lastSetIn: string, uidIn?: string, pictureIn?: string, idIn?: string) {
        this.username = usernameIn,
        this.email = emailIn,
        this.uid = uidIn,
        this.setsCompleted = setsCompletedIn,
        this.lastSet = lastSetIn,
        this.picture = pictureIn,
        this.id = idIn
    }
}
