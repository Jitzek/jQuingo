import { jQuingoComponentNode } from "./component/component_node";
import { jQuingoNode } from "./component/node";
import { jQuingoTextNode } from "./component/text_node";
import * as $ from 'jquery';
import { app } from "@src/App";

export class jQuingo {
  public static createNode(_html?: string, _element?: Element): jQuingoNode[] {
    const element = _html ? new DOMParser().parseFromString(_html, "text/html").children[0].children[1] : _element;
    if (!element) return [];

    // If element has no children
    if (element.children.length < 1) {
      // Element is text value
      const node = new jQuingoTextNode($(element).text());
      return [node];
    }

    let nodes: jQuingoNode[] = [];
    for (let i = 0; i < element.children.length; i++) {
      // Child contains tagName (used for {type})
      const child = element.children[i];

      const node = new jQuingoComponentNode(child.tagName, {});

      for (let j = 0; j < child.attributes.length; j++) {
        // Attributes contain key value pairs e.g. class="classname" (used for {props})
        node.props[child.attributes[j].nodeName] = child.attributes[j].nodeValue || '';
      }

      node.children = node.children.concat(this.createNode(undefined, child));

      // Add children of child
      nodes.push(node);
    }

    return nodes;
  }

  public renderLoop(container: HTMLElement) {
    app.render().forEach(node => {
      node.update(container);
    });

    // Re-run everytime main thread is idle (to prevent blocking UI)
    requestIdleCallback(() => this.renderLoop(container));
  }
}
