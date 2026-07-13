export class User {
    // class variables
    id?: string
    username: string
    email: string
    password: string
    picture: string
    setsCompleted: number
    lastSet: string


    constructor(usernameIn: string, emailIn: string, passwordIn: string, pictureIn: string, setsCompletedIn: number, lastSetIn: string, idIn?: string) {
        this.username = usernameIn,
        this.email = emailIn,
        this.password = passwordIn,
        this.picture = pictureIn,
        this.setsCompleted = setsCompletedIn,
        this.lastSet = lastSetIn,
        this.id = idIn
    }
}
