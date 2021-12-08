import { jQuingoComponent } from "@jquingo/component/component";
import { jQuingoComponentNode } from "./jquingo/component/component_node";
import { jQuingoTextNode } from "./jquingo/component/text_node";
import { router } from "./jquingo/router/router";

class jQuingoApp extends jQuingoComponent {
  private counter = 1;

  public override init() {
    // setInterval(() => {
    //   (
    //     (
    //       (this.nodes[0] as jQuingoComponentNode)
    //         .children[1] as jQuingoComponentNode
    //     ).children[0] as jQuingoTextNode
    //   ).value = `Test description counter: ${this.counter++}`;

    //   if (this.counter % 5 == 1) {
    //     (
    //       (this.nodes[0] as jQuingoComponentNode)
    //         .children[1] as jQuingoComponentNode
    //     ).type = "h5";
    //   }
    //   else {
    //     (
    //         (this.nodes[0] as jQuingoComponentNode)
    //           .children[1] as jQuingoComponentNode
    //       ).type = "p";
    //   }
    // }, 1000);
  }

  public override template(): string {
    return `
            ${router.current_route.get().template() || ""}
        `;
  }
}

export const app = new jQuingoApp();
