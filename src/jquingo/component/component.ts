import { jQuingo } from "../jQuingo";
import { jQuingoNode } from "./node";

export class jQuingoComponent {
  protected nodes: jQuingoNode[] = [];
  private _prev_template: string = "";

  constructor() {
    this.nodes = [];
    this.init();
  }

  protected init() {}

  public template(): string {
    return "";
  }

  public render(): jQuingoNode[] {
    const new_template = this.template();
    if (new_template !== this._prev_template) {
      this.nodes = jQuingo.updateNodes(this.nodes, jQuingo.createNodes(new_template));
      this._prev_template = new_template;
    }
    return this.nodes;
  }
}
