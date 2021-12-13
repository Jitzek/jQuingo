import { jQuingoComponent } from "@src/jquingo/component/component";
import "@css/test.css";
import {
  jQuingoEventHandler,
  jQuingoEventHandlerFunction,
} from "@src/jquingo/events/event_handler";

export class TestComponent extends jQuingoComponent {
  private counter = 0;
  private on_reset_counter: jQuingoEventHandlerFunction = jQuingoEventHandler.on(
    (e: Event) => this.resetCounter(e as MouseEvent)
  );

  constructor(public title: string, public description: string) {
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
            <div>
                <h1>${this.title}</h1>
                <p>${this.description} counter: ${this.counter} ${this.counter === 1 ? 'second' : 'seconds'}</p>
                <button class="button" onclick="${this.on_reset_counter}">Reset Counter</button>
            </div>
        `;
  }
}
