import { v4 as uuidv4 } from "uuid";

export class User {
    public uuid!: string;

    constructor() {
        this.uuid = uuidv4();
    }
}