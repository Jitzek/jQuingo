import { jQuingoComponent } from "@src/jquingo/component/component";
import '@css/test.css'
import { jQuingoEventHandler, jQuingoEventHandlerFunction } from "@src/jquingo/jQuingo";

export class TestComponent extends jQuingoComponent {
    private counter = 0;
    private callback_test: jQuingoEventHandlerFunction = jQuingoEventHandler.on((_e: Event) => {
        this.counter = 0;
    });

    constructor(public title: string, public description: string) {
        super();
    }

    protected override init() {
        setInterval(() => {
            this.counter++;
        }, 1000);
    }

    // TODO: event handlers
    public testf() {
        console.log("test");
    }

    public override template(): string {
        return `
            <div>
                <h1>${this.title}</h1>
                <p>${this.description} counter: ${this.counter} ${this.counter === 1 ? 'second' : 'seconds'}</p>
                <button class="button" onclick="${this.callback_test}">Reset Counter</button>
            </div>
        `;
    }
}