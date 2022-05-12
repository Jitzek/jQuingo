import { jQuingoComponent } from "@src/jquingo/component/component";

import style from "@css/Lingo/Grid/grid.css";
import { RowComponent } from "@components/Lingo/Grid/Row";
import { ColumnComponent } from "./Column";
import { InputComponent } from "./Input/Input";
import { RowValue } from "@components/Lingo/Lingo";

export class GridComponent extends jQuingoComponent {
    public columns: number = 5;
    public rows: number = 5;
    private row_components: RowComponent[] = [];
    public current_row_index = 0;
    public animation_state: "creating" | "clearing" | "none" = "none";
    private first_letter = "";
    private input_component: InputComponent = new InputComponent(
        this.columns,
        false,
        false,
        false,
        () => this.handle_start(),
        () => this.handle_stop(),
        (value: string) => this.handle_submit(value)
    );

    private handle_start() {
        if (this.row_components.length > 0) return;
        this.on_start();
    }

    private handle_stop() {
        if (!(this.row_components.length > 0)) return;
        this.clearGrid();
        this.current_row_index = 0;
        this.on_stop();
    }

    private handle_submit(value: string) {
        this.on_submit(value);
    }

    constructor(
        private on_start: () => void = () => {},
        private on_stop: () => void = () => {},
        private on_submit: (value: string) => void = () => {}
    ) {
        super();
        // this.createGrid();
    }

    public override template(): string {
        this.input_component.word_length = this.columns;
        this.input_component.show_start = this.row_components.length <= 0;
        this.input_component.show_stop =
            this.row_components.length > 0 &&
            this.animation_state !== "clearing" &&
            this.animation_state !== "creating";
        this.input_component.show_input =
            this.row_components.length > 0 &&
            this.animation_state !== "clearing" &&
            this.animation_state !== "creating";
        return `
            <div class="grid ${style["grid"]}"
                style="
                    grid-template-rows: repeat(${this.rows}, 100%);
                "
            >
              ${
                  this.row_components.length > 0
                      ? this.concatenatedRowComponents()
                      : ""
              }
            </div>
            <div class="${style["input-container"]}">
                ${this.input_component.template()}
            </div>
        `;
    }

    private concatenatedRowComponents(): string {
        let concatenated_row_components = "";
        this.row_components.forEach((row_component) => {
            concatenated_row_components += row_component.template();
        });
        return concatenated_row_components;
    }

    public addRow(row: RowComponent, animation_time = 750): Promise<void> {
        return new Promise<void>(
            (resolve: (value: void | PromiseLike<void>) => void) => {
                this.row_components.push(row);
                setTimeout(() => {
                    resolve();
                }, animation_time);
            }
        );
    }

    public async insertRowGuess(
        guess_result: RowValue,
        animation_duration: number
    ): Promise<void> {
        await this.row_components[this.current_row_index++].insertGuess(
            guess_result,
            animation_duration
        );
    }

    public setNextRowHint() {
        const known_letters: string[] = [this.first_letter];
        this.row_components.forEach((row) => {
            for (let i = 0; i < row.columns.length; i++) {
                if (row.columns[i].color === "red")
                    known_letters[i] = row.columns[i].letter;
            }
        });
        for (let i = 0; i < this.row_components[0].columns.length; i++) {
            if (!known_letters[i]) known_letters[i] = ".";
        }
        this.row_components[this.current_row_index].setValue(known_letters);
    }

    public createGrid(
        first_letter: string,
        rows: number = 5,
        columns: number = 5,
        total_animation_time = 1000
    ): Promise<void> {
        this.first_letter = first_letter;
        this.animation_state = "creating";
        this.rows = rows;
        this.columns = columns;

        return new Promise<void>(
            (resolve: (value: void | PromiseLike<void>) => void) => {
                // Add rows (with small delay for animation)
                for (let i = 0; i < this.rows; i++) {
                    // Fill array with empty columns
                    let columns = Array.from(
                        { length: this.columns },
                        () => new ColumnComponent("", "grey")
                    );
                    // If first row, reveal first letter
                    if (i === 0) {
                        columns[0].letter = first_letter;
                        columns[0].color = "grey";
                        // Fill rest of row with dots
                        for (let j = 1; j < this.columns; j++) {
                            columns[j].letter = ".";
                        }
                    }
                    setTimeout(() => {
                        this.addRow(new RowComponent(columns, 750));
                    }, (total_animation_time / this.rows) * i);
                }
                setTimeout(() => {
                    this.animation_state = "none";
                    resolve();
                }, total_animation_time + 750);
            }
        );
    }

    public clearGrid(total_animation_time: number = 1000): Promise<void> {
        this.animation_state = "clearing";
        return new Promise<void>(
            (resolve: (value: void | PromiseLike<void>) => void) => {
                for (let i = 0; i < this.rows; i++) {
                    setTimeout(() => {
                        this.row_components[this.rows - 1 - i]
                            .dissappear()
                            .then(() => {
                                this.row_components.splice(-1);
                                if (this.row_components.length <= 0) {
                                    this.animation_state = "none";
                                    resolve();
                                }
                            });
                    }, (total_animation_time / this.rows) * i);
                }
            }
        );
    }
}
