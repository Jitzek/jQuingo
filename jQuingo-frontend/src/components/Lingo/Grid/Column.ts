import { jQuingoComponent } from "@src/jquingo/component/component";

import style from "@css/Lingo/Grid/column.css";

export class ColumnComponent extends jQuingoComponent {
  constructor(public letter: string) {
    super();
  }

  public override template(): string {
    return `
            <div class="column ${style["column"]}">
              ${this.letter}
            </div>
        `;
  }
}

export class ColumnObject {
    constructor() {

    }
}