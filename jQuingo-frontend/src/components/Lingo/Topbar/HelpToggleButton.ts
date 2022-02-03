import { jQuingoComponent } from "@src/jquingo/component/component";

import "@css/Lingo/Topbar/helptogglebutton.css";

export class HelpToggleButtonComponent extends jQuingoComponent {
  constructor() {
    super();
  }

  protected override init() {
  }

  public override template(): string {
    return `
            <button class="help-toggle-button">
                <p class="help-toggle-button-content">?</p>
            </button>
        `;
  }
}
