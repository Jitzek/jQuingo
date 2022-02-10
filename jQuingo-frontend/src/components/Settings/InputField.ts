import { jQuingoComponent } from "@src/jquingo/component/component";

import style from "@css/Settings/input-field.css";
import {
    jQuingoEventHandler,
    jQuingoEventHandlerFunction,
} from "@src/jquingo/events/event_handler";

export class InputFieldComponent extends jQuingoComponent {
    public value?: string | number | boolean;

    private handle_input: jQuingoEventHandlerFunction = jQuingoEventHandler.on(
        (e: Event) => {
            this.value = ((e as InputEvent).target as HTMLInputElement).value;
            this.onInput(this.value);
        }
    );

    constructor(private onInput: (value: string) => void = () => {}) {
        super();
    }

    public override template(): string {
        return `
            <input oninput="${this.handle_input}" class="input-field ${
            style["input-field"]
        }" value="${this.value || ""}" />
        `;
    }
}
