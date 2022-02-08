import { v4 as uuidv4 } from "uuid";
import { getWord, wordExists } from "../../WordManager/WordManager";
import { User } from "../User/User";

export class Board {
    public uuid!: string;
    public word!: string;
    constructor(public user: User, public rows: number, public columns: number) {
        this.uuid = uuidv4();
    }

    public async init(): Promise<void> {
        // Create word with {columns} amount of letters
        this.word = (await getWord("dutch", this.columns, /^[a-zA-Z]*$/g)).toUpperCase();
        this.word = "ZBBBA";
        console.log(this.word);
    }
}