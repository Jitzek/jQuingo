import { jQuingoComponentNode } from "./component/component_node";
import { jQuingoNode } from "./component/node";
import { jQuingoTextNode } from "./component/text_node";
import * as $ from 'jquery';
import { app } from "@src/App";

export class jQuingo {
  public static createNodes(_html?: string, _element?: Element): jQuingoNode[] {
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

      node.children = node.children.concat(this.createNodes(undefined, child));

      // Add children of child
      nodes.push(node);
    }

    return nodes;
  }

  public static updateNodes(nodes: jQuingoNode[], new_nodes: jQuingoNode[]): jQuingoNode[] {
    // Step 1: Determine what has changed
    for (let i = 0; i < nodes.length || i < new_nodes.length; i++) {
      if (!nodes[i]) {
        // Node was added
        nodes.push(new_nodes[i]);
        console.log(nodes);
      }
      if (!new_nodes[i]) {
        // Node was removed
        delete nodes[i];
      }

      const node = nodes[i];
      const new_node = new_nodes[i];

      if (node instanceof jQuingoComponentNode) {
        if (new_node instanceof jQuingoComponentNode) {
          // Check if type and/or props have changed
          if (node.type !== new_node.type) (nodes[i] as jQuingoComponentNode).type = new_node.type;
          if (node.props !== new_node.props) (nodes[i] as jQuingoComponentNode).props = new_node.props;
          (nodes[i] as jQuingoComponentNode).children = this.updateNodes(node.children, new_node.children);
        }
        else if (new_node instanceof jQuingoTextNode) {
          // Replace component node with text node
          nodes[i] = new_node;
          // nodes[i].prev = node;
        }
      }
      else if (node instanceof jQuingoTextNode) {
        if (new_node instanceof jQuingoTextNode) {
          // Check if value has changed
          if (node.value !== new_node.value) (nodes[i] as jQuingoTextNode).value = new_node.value;
        }
        else if (new_node instanceof jQuingoComponentNode) {
          // Replace text node with component node
          nodes[i] = new_node;
          // nodes[i].prev = node;
        }
      }
    }

    // Step 2: Determine how to change it

    // Step 3: Change it

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
