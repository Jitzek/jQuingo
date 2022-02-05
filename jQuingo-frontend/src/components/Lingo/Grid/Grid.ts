import { jQuingoComponent } from "@src/jquingo/component/component";

import style from "@css/Lingo/Grid/grid.css";
import { RowComponent } from "@components/Lingo/Grid/Row";

export class GridComponent extends jQuingoComponent {
    private word_length: number = 5;
    private rows: number = 5;
    private row_components: RowComponent[] = [];

    constructor() {
        super();
        this.createGrid();
    }

    public override template(): string {
        return `
            <div class="grid ${style["grid"]}"
            style="grid-template-rows: repeat(${this.rows}, 100%);"
            >
              ${this.concatRowComponents()}
            </div>
        `;
    }

    private concatRowComponents(): string {
        let concatenated_row_components = "";
        this.row_components.forEach((row_component) => {
            concatenated_row_components += row_component.template();
        });
        return concatenated_row_components;
    }

    public addRow(value: string, animation_time = 750): Promise<void> {
        return new Promise<void>(
            (resolve: (value: void | PromiseLike<void>) => void) => {
                // Add initial row
                this.row_components.push(
                    new RowComponent(this.word_length, value, animation_time)
                );
                setTimeout(() => {
                    resolve();
                }, animation_time);
            }
        );
    }

    public createGrid(
        word_length: number = 5,
        rows: number = 5
    ): Promise<void> {
        this.word_length = word_length;
        this.rows = rows;

        // Add initial row
        return this.addRow("L....");
    }

    public clearGrid(animation_time: number = 750): Promise<void> {
        return new Promise<void>(
            (resolve: (value: void | PromiseLike<void>) => void) => {
                // Add items to grid
                //

                let amount_of_row_components = this.row_components.length;
                for (let i = 0; i < this.rows; i++) {
                    setTimeout(() => {
                        this.row_components.splice(-1);
                    }, animation_time * i);
                }

                setTimeout(() => {
                    resolve();
                }, animation_time * amount_of_row_components);
            }
        );
    }
}
