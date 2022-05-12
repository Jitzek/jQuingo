import { jQuingoComponent } from "@src/jquingo/component/component";
import { SettingsIconComponent } from "@components/Icons/SettingsIcon";

import style from "@css/Lingo/Topbar/settingstogglebutton.css";

export class SettingsToggleButtonComponent extends jQuingoComponent {
    private settings_icon = new SettingsIconComponent();

    constructor() {
        super();
    }

    protected override init() {}

    public override template(): string {
        return `
            <a class="settings-toggle-button ${style["settings-toggle-button"]}">
                ${this.settings_icon.template()}
            </a>
        `;
    }
}
