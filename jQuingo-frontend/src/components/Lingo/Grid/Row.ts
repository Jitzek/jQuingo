import { jQuingoComponent } from "@src/jquingo/component/component";

import style from "@css/Lingo/Grid/row.css";
import { ColumnComponent, ColumnObject } from "@components/Lingo/Grid/Column";

export class RowComponent extends jQuingoComponent {
  private column_component = new ColumnComponent("Q");

  constructor(public columns: number = 5) {
    super();
  }

  public override template(): string {
    return `
            <div class="row ${style["row"]}" 
            style="
                max-width: ${5 * this.columns}rem;
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

export class RowObject {
    public columns: ColumnObject[] = [];
    constructor() {
        
    }
}