import { jQuingoComponent } from "@src/jquingo/component/component";

import style from "@css/Lingo/Grid/row.css";
import { ColumnComponent } from "@components/Lingo/Grid/Column";

export class RowComponent extends jQuingoComponent {
    private column_component = new ColumnComponent("Q");
    public value!: string;
    private animation_state: "appear" | "none" | "dissappear" = "none";

    constructor(
        public columns: number = 5,
        initial_value: string,
        private animation_time: number = 500
    ) {
        super();
        this.setValue(initial_value);
        this.animation_state = "appear";
    }

    private setValue(new_value: string): void {
        if (new_value.trim().length !== this.columns) {
            throw new InvalidValueError(
                `Trimmed value length was ${
                    new_value.trim().length
                }, expected ${this.columns}`
            );
        }
    }

    public override template(): string {
        return `
            <div class="row ${style["row"]} ${style[this.animation_state]}" 
            style="
                max-width: ${5 * this.columns}rem;
                animation-duration: ${this.animation_time}ms;
            ">
              ${this.column_component.template()}
              ${this.column_component.template()}
              ${this.column_component.template()}
              ${this.column_component.template()}
              ${this.column_component.template()}
            </div>
        `;
    }
}

export class InvalidValueError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidValueError";
    }
}
