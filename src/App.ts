import { jQuingoComponent } from "@jquingo/component/component";
import { router } from "./jquingo/router/router";

class jQuingoApp extends jQuingoComponent {
    public override template(): string {
        return `
            ${router.current_route.get().template() || ''}
        `;
    }
}

export const app = new jQuingoApp();