import { jQuingoRoute } from "@src/jquingo/router/route";
import { fadeOut, SoundIdentifier } from "@src/observables/SoundPlayer";

export class AboutRoute extends jQuingoRoute {
    constructor() {
        super("/about");
    }

    protected override init() {
        fadeOut(SoundIdentifier.LINGO_THEME_SONG, 0, 1000);
    }

    public override template(): string {
        return `
        <h1>
          About
        </h1>
    `;
    }
}
