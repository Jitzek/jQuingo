import { jQuingoComponent } from "@src/jquingo/component/component";

import style from "@css/Lingo/Grid/grid.css";
import { RowComponent } from "@components/Lingo/Grid/Row";
import { ColumnComponent } from "./Column";
import { InputComponent } from "./Input/Input";

export class GridComponent extends jQuingoComponent {
    private word_length: number = 5;
    private rows: number = 5;
    private row_components: RowComponent[] = [];
    public animation_state: "creating" | "clearing" | "none" = "none";
    private input_component: InputComponent = new InputComponent(
        false,
        false,
        false,
        () => this.handle_start(),
        () => this.handle_stop(),
        () => {}
    );

    private handle_start() {
        if (this.row_components.length > 0) return;
        this.createGrid();
    }

    private handle_stop() {
        if (!(this.row_components.length > 0)) return;
        this.clearGrid();
    }

    constructor() {
        super();
        // this.createGrid();
    }

    public override template(): string {
        this.input_component.show_start = this.row_components.length <= 0;
        this.input_component.show_stop = this.row_components.length > 0 && this.animation_state !== "clearing" && this.animation_state !== "creating";
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
            <div>
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

    public createGrid(
        word_length: number = 5,
        rows: number = 5,
        total_animation_time = 1000
    ): Promise<void> {
        this.animation_state = "creating";
        this.word_length = word_length;
        this.rows = rows;

        return new Promise<void>(
            (resolve: (value: void | PromiseLike<void>) => void) => {
                // Add rows (with small delay for animation)
                for (let i = 0; i < this.rows; i++) {
                    // Fill array with empty columns
                    let columns = Array.from(
                        { length: this.word_length },
                        () => new ColumnComponent('', "grey")
                    );
                    // If first row, reveal first letter
                    if (i === 0) {
                        columns[0].letter = "L";
                        columns[0].color = "red";
                        // Fill rest of row with dots
                        for (let j = 1; j < this.word_length; j++) {
                            columns[j].letter = ".";
                        }
                    }
                    setTimeout(() => {
                        this.addRow(new RowComponent(columns));
                    }, (total_animation_time / this.rows) * i);
                }
                setTimeout(() => {
                    this.animation_state = "none";
                    resolve();
                }, total_animation_time);
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
