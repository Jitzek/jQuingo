import { jQuingoComponent } from "@jquingo/component/component";
import { router } from "./jquingo/router/router";

class jQuingoApp extends jQuingoComponent {
    test = "Hello World"

    public override init() {
        setTimeout(() => {
            this.test = "Something else"
        }, 1000);
    }

    // TODO: event handlers
    public testf() {
        console.log("test");
    }

    public override template(): string {
        return `
            ${router.current_route.get()?.template() || ''}
        `;
    }
}

export const app = new jQuingoApp();