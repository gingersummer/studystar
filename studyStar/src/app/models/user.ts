export class User {
    // class variables
    id?: string
    picture?: string = "studystar/studyStar/src/assets/default.png"
    username: string
    email: string
    password: string
    setsCompleted: number
    lastSet: string


    constructor(usernameIn: string, emailIn: string, passwordIn: string, setsCompletedIn: number, lastSetIn: string, pictureIn?: string, idIn?: string) {
        this.username = usernameIn,
        this.email = emailIn,
        this.password = passwordIn,
        this.setsCompleted = setsCompletedIn,
        this.lastSet = lastSetIn,
        this.picture = pictureIn,
        this.id = idIn
    }
}
