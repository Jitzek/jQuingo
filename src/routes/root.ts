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
      <div class="container">
        ${this.lingo_component.template()}
        <a href="/home">Go to Home</a>
      </div>
      <pre>
        <h2>Hello World</h2>
      </pre>
    `;
  }
}
