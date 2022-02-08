import { jQuingoComponent } from "@src/jquingo/component/component";

import {
    jQuingoEventHandler,
    jQuingoEventHandlerFunction,
} from "@src/jquingo/events/event_handler";

import style from "@css/Lingo/Grid/Input/input.css";

export class InputComponent extends jQuingoComponent {
    public value: string = "";
    private submit_button_animating = false;

    private handle_start_button_click: jQuingoEventHandlerFunction =
        jQuingoEventHandler.on((e: Event) => {
            this.on_start();
        });

    private handle_stop_button_click: jQuingoEventHandlerFunction =
        jQuingoEventHandler.on((e: Event) => {
            this.clearInput();
            this.on_stop();
        });

    private handle_submit_button_click: jQuingoEventHandlerFunction =
        jQuingoEventHandler.on((e: Event) => {
            if (!this.isValueValid()) {
                if (this.submit_button_animating) return;
                this.submit_button_animating = true;
                const distance = 10;
                const duration = 30;
                const shakes = 6;

                $(`#${style["submit-button-id"]}`).css("position", "relative");
                for (let i = 1; i <= shakes; i++) {
                    $(`#${style["submit-button-id"]}`)
                        .animate({ left: distance * -1 }, duration / shakes / 4)
                        .animate({ left: distance }, duration / shakes / 2)
                        .animate({ left: 0 }, duration / shakes / 4, () => {
                            if (i >= shakes)
                                this.submit_button_animating = false;
                        });
                }
                return;
            }
            this.on_submit(this.value);
            this.clearInput();
        });

    private clearInput() {
        $(`#${style["input-id"]}`).val("");
        this.value = "";
    }

    private handle_input: jQuingoEventHandlerFunction = jQuingoEventHandler.on(
        (e: Event) => {
            this.value = ((e as InputEvent).target as HTMLInputElement).value;
        }
    );

    private isValueValid(): boolean {
        if (this.value.length !== this.word_length) {
            return false;
        }
        if (!/^[a-zA-Z]*$/g.test(this.value)) {
            return false;
        }
        return true;
    }

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
            <input id="${style["input-id"]}" oninput="${this.handle_input}" type="text"
            class="${style["input-field"]} ${
            this.isValueValid() ? style["valid"] : ""
        }" />
            <button id="${style["submit-button-id"]}" class="${style["submit-button"]} ${this.submit_button_animating ? style["invalid"] : ""}" 
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
