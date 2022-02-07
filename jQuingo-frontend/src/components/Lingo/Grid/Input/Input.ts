import { jQuingoComponent } from "@src/jquingo/component/component";

import {
    jQuingoEventHandler,
    jQuingoEventHandlerFunction,
} from "@src/jquingo/events/event_handler";

import style from "@css/Lingo/Grid/Input/input.css";

export class InputComponent extends jQuingoComponent {
    public value: string = "";

    private handle_start_button_click: jQuingoEventHandlerFunction =
        jQuingoEventHandler.on((e: Event) => {
            this.on_start();
        });

    private handle_stop_button_click: jQuingoEventHandlerFunction =
        jQuingoEventHandler.on((e: Event) => {
            this.on_stop();
        });

    private handle_submit_button_click: jQuingoEventHandlerFunction =
        jQuingoEventHandler.on((e: Event) => {
            this.on_submit(this.value);
        });

    private handle_input: jQuingoEventHandlerFunction = jQuingoEventHandler.on(
        (e: Event) => {
            this.value = ((e as InputEvent).target as HTMLInputElement).value;
        }
    );

    constructor(
        public word_length: number,
        public show_start: boolean = false,
        public show_stop: boolean = false,
        public show_input: boolean = false,
        private on_start: () => void = () => {},
        private on_stop: () => void = () => {},
        private on_submit: (value: string) => void = () => {}
    ) {
        super();
    }

    public override template(): string {
        return `
          <div class="${this.show_start ? "" : style["hidden"]}">
            <button class="${style["start-button"]}" 
              onclick="${this.handle_start_button_click}">
              Start
            </button>
          </div>
          <div class="${this.show_input ? "" : style["hidden"]}">
            <input oninput="${this.handle_input}" type="text" 
            class="${style["input-field"]} ${this.value.trim().length === this.word_length ? style["valid"] : ""}" />
            <button class="${style["submit-button"]}" 
              onclick="${this.handle_submit_button_click}">
              Submit
            </button>
          </div>
          <div class="${this.show_stop ? "" : style["hidden"]}">
            <button class="${style["stop-button"]}" 
              onclick="${this.handle_stop_button_click}">
              Stop
            </button>
          </div>
        `;
    }
}
