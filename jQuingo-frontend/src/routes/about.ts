import { jQuingoRoute } from "@src/jquingo/router/route";

export class AboutRoute extends jQuingoRoute {
    constructor() {
        super("/about");
    }

    protected override init() {}

    public override template(): string {
        return `
        <h1>
          About
        </h1>
    `;
    }
}
