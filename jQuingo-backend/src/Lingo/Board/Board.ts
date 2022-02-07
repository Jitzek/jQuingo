import { v4 as uuidv4 } from "uuid";
import { User } from "../User/User";

export class Board {
    public uuid!: string;
    public word!: string;
    constructor(public user: User, public rows: number, public columns: number) {
        this.uuid = uuidv4();

    }

    public async init(): Promise<void> {
        // TODO: Create word with {columns} amount of letters
    }
}