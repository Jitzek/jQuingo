import { jQuingoRoute } from "@src/jquingo/router/route";

export class HomeRoute extends jQuingoRoute {
  constructor() {
    super("/home");
  }

  public override template(): string {
    return `
      <div>
        <h1 class="test">Home</h1>
        <a href="/">Go to Root</a>
      </div>
    `;
  }
}
