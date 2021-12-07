import { jQuingoComponent } from "@jquingo/component/component";

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
            <div>
                <h1>App</h1>
            </div>
            <p>${this.test}</p>
        `;
    }
}

export const app = new jQuingoApp();