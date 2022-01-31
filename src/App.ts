import { jQuingoComponent } from "@jquingo/component/component";
import { router } from "./jquingo/router/router";

class jQuingoApp extends jQuingoComponent {
    public override template(): string {
        return `
            <!-- The DIV wrapper is important because the renderloop requires a single element as entry point -->
            <div class="jQuingo">
              ${router.current_route.get().template() || ""}
            </div>
        `;
    }
}

export const app = new jQuingoApp();
