import { FlashCard } from "./flashcard"

export class Set {
    //class variables
    name: string
    progress: boolean
    icon: string
    setOfCards: FlashCard[]
    //constructor
    constructor(nameIn: string, progressIn: boolean, iconIn: string, setOfCardsIn: FlashCard[]) {
        this.name = nameIn,
        this.progress = progressIn,
        this.icon = iconIn
        this.setOfCards = setOfCardsIn
    }

} 