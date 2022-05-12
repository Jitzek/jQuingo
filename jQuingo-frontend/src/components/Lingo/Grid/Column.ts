import { jQuingoComponent } from "@src/jquingo/component/component";

import style from "@css/Lingo/Grid/column.css";

export class ColumnComponent extends jQuingoComponent {
  constructor(public letter: string, public color: "grey" | "yellow" | "red" = "grey") {
    super();
  }

  public override template(): string {
    return `
            <div class="column ${style["column"]} ${style[this.color]}">
              ${this.letter}
            </div>
        `;
  }

  public setValue(letter: string, color: "grey" | "yellow" | "red") {
    this.letter = letter;
    this.color = color;
  }
}