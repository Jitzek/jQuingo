import { jQuingoComponentNode } from "./component/component_node";
import { jQuingoNode } from "./component/node";
import { jQuingoTextNode } from "./component/text_node";

export class jQuingo {
  private prevRootNode!: jQuingoComponentNode;

  public static createNode(
    html: string
  ): jQuingoNode | null /* TEMPORARY NULL VALUE */ {
    return null;
  }

  public renderLoop(rootNode: jQuingoComponentNode) {
    // Check for changes between this rootNode and the previous
    this.prevRootNode = rootNode;

    rootNode.update(document.body);

    // Re-run everytime main thread is idle (to prevent blocking UI)
    requestIdleCallback(() => this.renderLoop(rootNode));
  }
}
