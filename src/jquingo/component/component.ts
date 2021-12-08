import { jQuingo } from "../jQuingo";
import { ObservableValue } from "../observable_value";
import { jQuingoNode } from "./node";

export class jQuingoComponent {
  protected nodes: jQuingoNode[] = [];
  private _prev_template: string = "";

  constructor() {
    this.init();
  }

  protected init() {}

  public template(): string {
    return "";
  }

  public render(): jQuingoNode[] {
    const new_template = this.template();
    if (new_template !== this._prev_template) {
      // Remove old nodes from UI
      // while (this.nodes.length > 0) this.nodes.pop()?.remove();
      this.nodes = jQuingo.updateNodes(this.nodes, jQuingo.createNodes(new_template));
      this._prev_template = new_template;
    }
    if (this.nodes.length < 1) {
      // Only render if things have changed
      // TODO: selective rendering, only re-render stuff that has changed
      // Perhaps update the existing nodes instead of recreating them causing their {prev} to be lost
      this.nodes = jQuingo.createNodes(new_template, undefined);
    }
    return this.nodes;
  }
}
