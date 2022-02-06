import { jQuingoComponent } from "@src/jquingo/component/component";

import style from "@css/Lingo/Grid/row.css";
import { ColumnComponent } from "@components/Lingo/Grid/Column";

export class RowComponent extends jQuingoComponent {
    public columns: ColumnComponent[] = [];

    private animation_state: "appear" | "none" | "dissappear" = "none";

    constructor(
        initial_columns: ColumnComponent[],
        private animation_time: number = 500
    ) {
        super();
        this.columns = initial_columns;
        this.animation_state = "appear";
    }

    public override template(): string {
        return `
            <div class="row ${style["row"]} ${style[this.animation_state]}" 
            style="
                max-width: ${5 * this.columns.length}rem;
                animation-duration: ${this.animation_time}ms;
                grid-template-columns: repeat(${this.columns.length}, calc(${
            100 / this.columns.length
        }% - 5px));
                margin-left: 5px;
            ">
              ${this.concatColumnComponents()}
            </div>
        `;
    }

    public dissappear(): Promise<void> {
        return new Promise<void>(
            (resolve: (value: void | PromiseLike<void>) => void) => {
                this.animation_state = "dissappear";
                setTimeout(() => resolve(), this.animation_time);
            }
        );
    }

    private concatColumnComponents(): string {
        let concatenated_column_components = "";
        this.columns.forEach((column_component) => {
            concatenated_column_components += column_component.template();
        });
        return concatenated_column_components;
    }
}
