import { jQuingoComponent } from "@src/jquingo/component/component";

import style from "@css/Lingo/Grid/row.css";
import { ColumnComponent } from "@components/Lingo/Grid/Column";
import { RowValue } from "@components/Lingo/Lingo";
import lingo_red_mp3 from "@mp3/lingo-red.mp3";
import lingo_yellow_mp3 from "@mp3/lingo-yellow.mp3";
import lingo_grey_mp3 from "@mp3/lingo-grey.mp3";

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

    public insertGuess(
        guess_result: RowValue,
        animation_duration: number
    ): Promise<void> {
        return new Promise<void>(
            (resolve: (value: void | PromiseLike<void>) => void) => {
                for (let i = 0; i < this.columns.length; i++) {
                    setTimeout(() => {
                        this.columns[i].setValue(
                            guess_result[i].letter,
                            guess_result[i].color
                        );
                        let audio = new Audio();
                        audio.volume = 0.5;
                        if (guess_result[i].color === "grey")
                            audio.src = lingo_grey_mp3;
                        else if (guess_result[i].color === "yellow")
                            audio.src = lingo_yellow_mp3;
                        else if (guess_result[i].color === "red")
                            audio.src = lingo_red_mp3;
                        audio.play();

                        if (i + 1 >= this.columns.length) {
                            resolve();
                        }
                    }, animation_duration * i);
                }
            }
        );
    }

    public setValue(new_value: string[]) {
        for (let i = 0; i < this.columns.length; i++) {
            this.columns[i].letter = new_value[i];
        }
    }

    private concatColumnComponents(): string {
        let concatenated_column_components = "";
        this.columns.forEach((column_component) => {
            concatenated_column_components += column_component.template();
        });
        return concatenated_column_components;
    }
}
