import { jQuingoComponentNode } from "./component/component_node";
import { jQuingoNode } from "./component/node";
import { jQuingoTextNode } from "./component/text_node";
import * as $ from "jquery";
import { app } from "@src/App";
import { jQuingoComponent } from "./component/component";

export class jQuingo {
  public static createNodes(_html?: string, _element?: Element): jQuingoNode[] {
    // Get parent of given template or use the given element as parent
    const element = _html && $(_html)[0] ? $(_html)[0].parentNode : _element;
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
        node.props[child.attributes[j].nodeName] =
          child.attributes[j].nodeValue || "";
      }

      // Recursively add children of child
      node.children = node.children.concat(this.createNodes(undefined, child));

      nodes.push(node);
    }

    return nodes;
  }

  /**
   * Compare current nodes with new nodes and update only what has changed without altering other data
   *
   * @param nodes The current nodes
   * @param new_nodes The new nodes (likely gotten from {jQuingo.createNodes})
   * @returns The current nodes with updated data gotten from the new nodes
   */
  public static updateNodes(
    nodes: jQuingoNode[],
    new_nodes: jQuingoNode[]
  ): jQuingoNode[] {
    const nodes_copy = nodes.slice();
    for (let i = 0; i < nodes_copy.length || i < new_nodes.length; i++) {
      if (!nodes_copy[i]) {
        // Node was added
        nodes[i] = new_nodes[i];
      }
      if (!new_nodes[i]) {
        // Node was removed
        // nodes[i].remove();
        nodes.splice(i, 1);
      }

      const node = nodes_copy[i];
      const new_node = new_nodes[i];

      if (node instanceof jQuingoComponentNode) {
        if (new_node instanceof jQuingoComponentNode) {
          // Check if type and/or props have changed
          if (node.type !== new_node.type)
            (nodes[i] as jQuingoComponentNode).type = new_node.type;
          if (node.props !== new_node.props)
            (nodes[i] as jQuingoComponentNode).props = new_node.props;
          (nodes[i] as jQuingoComponentNode).children = this.updateNodes(
            node.children,
            new_node.children
          );
        } else if (new_node instanceof jQuingoTextNode) {
          // Replace component node with text node
          nodes[i] = new_node;
        }
      } else if (node instanceof jQuingoTextNode) {
        if (new_node instanceof jQuingoTextNode) {
          // Check if value has changed
          if (node.value !== new_node.value)
            (nodes[i] as jQuingoTextNode).value = new_node.value;
        } else if (new_node instanceof jQuingoComponentNode) {
          // Replace text node with component node
          nodes[i] = new_node;
        }
      }
    }

    return nodes;
  }

  public renderLoop(container: HTMLElement) {
    app.render().forEach((node) => {
      node.update(container);
    });

    // Re-run everytime main thread is idle (to prevent blocking UI)
    requestIdleCallback(() => this.renderLoop(container));
  }
}
