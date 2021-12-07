import { jQuingoRoute } from "@src/jquingo/router/route";

export class RootRoute extends jQuingoRoute {
  constructor() {
    super("/");
  }

  public override template(): string {
    return `
      <div>
        <h1>/</h1>
        <a href="/home">Go to Home</a>
      </div>
    `;
  }
}
