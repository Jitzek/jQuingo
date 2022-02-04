import { LingoComponent } from "@src/components/Lingo/Lingo";
import { jQuingoRoute } from "@src/jquingo/router/route";

export class RootRoute extends jQuingoRoute {
  private lingo_component = new LingoComponent();

  constructor() {
    super("/");
  }
  
  protected override init() {
  }

  public override template(): string {
    return `
      <div class="root">
        ${this.lingo_component.template()}
      </div>
    `;
  }
}
