import { jQuingoComponent } from "@src/jquingo/component/component";

import {
    jQuingoEventHandler,
    jQuingoEventHandlerFunction,
} from "@src/jquingo/events/event_handler";

import style from "@css/Lingo/Grid/Input/input.css";

export class InputComponent extends jQuingoComponent {
    private handle_start_button_click: jQuingoEventHandlerFunction =
        jQuingoEventHandler.on((e: Event) => {
            this.on_start();
        });

    private handle_stop_button_click: jQuingoEventHandlerFunction =
        jQuingoEventHandler.on((e: Event) => {
            this.on_stop();
        });

    constructor(
        public show_start: boolean = false,
        public show_stop: boolean = false,
        public show_input: boolean = false,
        private on_start: () => void = () => {},
        private on_stop: () => void = () => {},
        private on_input: () => void = () => {}
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
          <div class="${this.show_stop ? "" : style["hidden"]}">
            <button class="${style["stop-button"]}" 
              onclick="${this.handle_stop_button_click}">
              Stop
            </button>
          </div>
        `;
    }
}
