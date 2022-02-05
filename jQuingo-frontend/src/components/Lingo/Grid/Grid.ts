import { jQuingoComponent } from "@src/jquingo/component/component";

import style from "@css/Lingo/Grid/grid.css";
import { RowComponent, RowObject } from "@components/Lingo/Grid/Row";

export class GridComponent extends jQuingoComponent {
  private row_component = new RowComponent();

  constructor(public rows: number = 5) {
    super();
  }

  public override template(): string {
    return `
            <div class="grid ${style["grid"]}"
            style="grid-template-rows: repeat(${this.rows}, 100%);"
            >
              ${this.row_component.template()}
              ${this.row_component.template()}
              ${this.row_component.template()}
              ${this.row_component.template()}
              ${this.row_component.template()}
            </div>
        `;
  }
}

export class GridObject {
    public rows: RowObject[] = [];
    constructor() {
        
    }
}