export class FlashCard {

    term: string
    definition: string
    frontSide: boolean
    confidenceLevel: number

    constructor(termIn: string, defIn: string) {
        this.term = termIn
        this.definition = defIn
        this.frontSide = true
        this.confidenceLevel = 1

    }

  
}