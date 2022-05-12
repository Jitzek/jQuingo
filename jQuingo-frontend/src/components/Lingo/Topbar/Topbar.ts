import { jQuingoComponent } from "@src/jquingo/component/component";
import { HelpToggleButtonComponent } from "@components/Lingo/Topbar/HelpToggleButton";
import { SettingsToggleButtonComponent } from "@components/Lingo/Topbar/SettingsToggleButton";

import style from "@css/Lingo/Topbar/topbar.css";

export class TopbarComponent extends jQuingoComponent {
  private help_toggle_button_component = new HelpToggleButtonComponent();
  private settings_toggle_button_component = new SettingsToggleButtonComponent();

  constructor() {
    super();
  }

  public override template(): string {
    return `
            <div class="topbar ${style["topbar"]}">
              <div class="${style["help-toggle-container"]}">
                ${this.help_toggle_button_component.template()}
              </div>
              <h1 class="${style["title"]}">jQuingo</h1>
              <div class="${style["settings-toggle-container"]}">
                ${this.settings_toggle_button_component.template()}
              </div>
            </div>
        `;
  }
}
