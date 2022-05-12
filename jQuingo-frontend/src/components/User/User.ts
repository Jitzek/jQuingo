import { jQuingoComponent } from "@src/jquingo/component/component";

export class UserComponent extends jQuingoComponent {
    constructor(public token: string) {
        super();
    }

    public override template(): string {
        return `
        `;
    }
}
