import { jQuingoComponentNode } from "../component/component_node";

export class Route extends jQuingoComponentNode {
  constructor(public path: string) {
    super('div', {});
  }
}
