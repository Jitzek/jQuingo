import { jQuingoComponent } from "@src/jquingo/component/component";
import {
    jQuingoEventHandler,
    jQuingoEventHandlerFunction,
} from "@src/jquingo/events/event_handler";
import style from "@css/Lingo/lingo.css";
import { TopbarComponent } from "@components/Lingo/Topbar/Topbar";
import { GridComponent } from "@components/Lingo/Grid/Grid";

export class LingoComponent extends jQuingoComponent {
    private counter = 0;
    private on_reset_counter: jQuingoEventHandlerFunction =
        jQuingoEventHandler.on((e: Event) =>
            this.resetCounter(e as MouseEvent)
        );

    private topbar_component = new TopbarComponent();
    private grid_component = new GridComponent();

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
            <!-- Example of scoped css implementation -->
            <div class="lingo ${style["lingo-container"]}">
              <div class="${style["topbar-container"]}">
                ${this.topbar_component.template()}
              </div>
              <div class="${style["grid-container"]}">
                ${this.grid_component.template()}
              </div>
            </div>
        `;
    }
}
