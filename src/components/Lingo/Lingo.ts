import { jQuingoComponent } from "@src/jquingo/component/component";
import {
  jQuingoEventHandler,
  jQuingoEventHandlerFunction,
} from "@src/jquingo/events/event_handler";
import "@css/Lingo/lingo.css";
import { HelpToggleButtonComponent } from "@components/Lingo/HelpToggleButton";
import { SettingsToggleButtonComponent } from "@components/Lingo/SettingsToggleButton";

export class LingoComponent extends jQuingoComponent {
  private counter = 0;
  private on_reset_counter: jQuingoEventHandlerFunction = jQuingoEventHandler.on(
    (e: Event) => this.resetCounter(e as MouseEvent)
  );

  private help_toggle_button_component = new HelpToggleButtonComponent();
  private settings_toggle_button_component = new SettingsToggleButtonComponent();

  constructor() {
    super();
  }

  protected override init() {
    setInterval(() => {
      this.counter++;
    }, 1000);
  }

  public resetCounter(e: MouseEvent) {
    this.counter = 0;
  }

  public override template(): string {
    return `
            <div class="lingo-container">
              <div class="help-toggle-container">
                ${this.help_toggle_button_component.template()}
              </div>
              <h1 class="title">jQuingo</h1>
              <div class="settings-toggle-container">
                ${this.settings_toggle_button_component.template()}
              </div>
            </div>
        `;
  }
}
