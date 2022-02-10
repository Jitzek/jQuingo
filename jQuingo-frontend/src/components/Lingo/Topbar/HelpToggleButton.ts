import { jQuingoComponent } from "@src/jquingo/component/component";

import style from "@css/Lingo/Topbar/helptogglebutton.css";

export class HelpToggleButtonComponent extends jQuingoComponent {
    constructor() {
        super();
    }

    protected override init() {}

    public override template(): string {
        return `
          <button href="/about" class="help-toggle-button ${style["help-toggle-button"]}">
            <p class="${style["help-toggle-button-content"]}">?</p>
          </button>
        `;
    }
}
