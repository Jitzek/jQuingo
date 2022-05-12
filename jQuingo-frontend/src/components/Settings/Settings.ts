import { jQuingoComponent } from "@src/jquingo/component/component";

import style from "@css/Settings/settings.css";
import { InputFieldComponent } from "./InputField";
import {
    amount_of_columns_observable,
    amount_of_rows_observable,
} from "@src/observables/LingoSettings";

export class SettingsComponent extends jQuingoComponent {
    private rows_input: InputFieldComponent = new InputFieldComponent(
        (value: string) => {
            amount_of_rows_observable.set(Number(value) || -1);
        }
    );
    private columns_input: InputFieldComponent = new InputFieldComponent(
        (value: string) => {
            amount_of_columns_observable.set(Number(value) || -1);
        }
    );

    constructor() {
        super();
        this.rows_input.value = amount_of_rows_observable.get();
        this.columns_input.value = amount_of_columns_observable.get();
    }

    public override template(): string {
        return `
            <div class="settings ${style["settings-container"]}">
                <h1>Settings:</h1>
                <div class="${style["settings-options"]}">
                    <label>Attempts: </label>
                    ${this.rows_input.template()}
                    <label>Word Length: </label>
                    ${this.columns_input.template()}
                </div>
            </div>
        `;
    }
}
