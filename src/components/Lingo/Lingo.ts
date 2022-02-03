import { jQuingoComponent } from "@src/jquingo/component/component";
import {
    jQuingoEventHandler,
    jQuingoEventHandlerFunction,
} from "@src/jquingo/events/event_handler";
import "@css/Lingo/lingo.css";
import { TopbarComponent } from "@components/Lingo/Topbar/Topbar";

export class LingoComponent extends jQuingoComponent {
    private counter = 0;
    private on_reset_counter: jQuingoEventHandlerFunction =
        jQuingoEventHandler.on((e: Event) =>
            this.resetCounter(e as MouseEvent)
        );

    private topbar_component = new TopbarComponent();

    constructor() {
        super();
    }

    protected override init() {
        setInterval(() => {
            this.counter++;
        }, 1000);
    }

    public resetCounter(e: MouseEvent) {
        this.counter = 0;
    }

    public override template(): string {
        return `
            <div class="lingo-container">
              <div class="topbar-container">
                ${this.topbar_component.template()}
              </div>
            </div>
        `;
    }
}
