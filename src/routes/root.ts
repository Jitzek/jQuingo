import { TestComponent } from "@src/components/Test";
import { jQuingoRoute } from "@src/jquingo/router/route";

export class RootRoute extends jQuingoRoute {
  private test_component = new TestComponent("Test title", "Test description");

  constructor() {
    super("/");
  }
  
  protected override init() {
  }

  public override template(): string {
    return `
      <div class="container">
        ${this.test_component.template()}
        <a href="/home">Go to Home</a>
      </div>
      <pre>
        <h2>Hello World</h2>
      </pre>
    `;
  }
}
