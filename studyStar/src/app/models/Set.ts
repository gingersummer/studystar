import { FlashCard } from "./flashcard"

export class Set {
    //class variables
    name: string
    progress: boolean
    icon: string
    setOfCards: FlashCard[]
    category: string
    isNew: boolean = true;
  flashcards: any
    //constructor
    constructor(nameIn: string, progressIn: boolean, iconIn: string, setOfCardsIn: FlashCard[], categoryIn: string) {
        this.name = nameIn,
        this.progress = progressIn,
        this.icon = iconIn
        this.setOfCards = setOfCardsIn
        this.category = categoryIn
    }

} 