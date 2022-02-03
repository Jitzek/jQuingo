import { jQuingoComponent } from "@src/jquingo/component/component";
import "@css/Lingo/settingstogglebutton.css";
import { SettingsIconComponent } from "../Icons/SettingsIcon";

export class SettingsToggleButtonComponent extends jQuingoComponent {
    private settings_icon = new SettingsIconComponent();

    constructor() {
        super();
    }

    protected override init() {}

    public override template(): string {
        return `
            <button class="settings-toggle-button">
                ${this.settings_icon.template()}
            </button>
        `;
    }
}
