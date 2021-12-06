import { jQuingoNode } from "./node";
import * as $ from "jquery";
import { jQuingoTextNode } from "./text_node";
import { clone } from "lodash";

export class jQuingoComponentNode implements jQuingoNode {
  public prev!: jQuingoNode;
  public prev_children: Array<jQuingoNode> = [];
  public element!: HTMLElement;
  public type: string;
  public props: { [key: string]: string };
  public children: Array<jQuingoNode>;
  /**
   *
   * @param type
   * @param props
   * @param children
   *
   * HTML:
   * <div class="container">
   *    <h1>Hello World</h1>
   *    <div>
   *      <a href="/">Click Me!</a>
   *    </div>
   * </div>
   * ^ translates v
   * jQuingoComponent:cloneDeep
   *    children: [
   *      {
   *        type: "h1"
   *        props: {},
   *        children: [
   *          "Hello World"
   *        ]
   *      },
   *      {
   *        type: "div"
   *        props: {},
   *        children: [
   *          {
   *            type: "a",
   *            props: {
   *              href: "/"
   *            }
   *            children: [
   *              "Click Me!"
   *            ]
   *          }
   *        ]
   *      }
   *    ]
   * }
   */
  constructor(
    type: string,
    props: { [key: string]: any },
    ...children: Array<jQuingoNode>
  ) {
    this.type = type.toLowerCase();
    this.props = props;
    this.children = children;
  }

  public render(container: HTMLElement): void {
    this.element = document.createElement(this.type);

    $(this.element).attr(this.props);

    this.children.forEach((component) => {
      component.render(this.element);
    });

    $(container).append(this.element);

    this.prev = clone(this);
  }

  public update(container: HTMLElement): void {
    // Check if node type hasn't changed
    if (!(this.prev instanceof jQuingoComponentNode)) {
      // Remove node from UI
      $(this.element).remove();
      // Perform an initial render
      this.render(container);
      return;
    }

    // Check if element type hasn't changed
    if (this.type !== this.prev.type) {
      // Insert new element with the same props, overriding the previous one
      const new_element: HTMLElement = document.createElement(this.type);
      $(new_element).attr(this.props);
      $(this.element).replaceWith(new_element);
      this.element = new_element;

      // Re-render element since it's been removed
      this.render(container);
    }

    // Check if children order/types hasn't changed
    for (let i = 0; i < this.children.length || i < this.prev_children.length; i++) {
      // If there are more previous children than current children
      // It means some children have been removed since the last update
      if (!this.children[i] && this.prev_children[i]) {
        // Remove children from UI
        this.prev_children[i].remove();
      }
      // If there are more current children than previous children
      // It means some children have been added since the last update
      if (this.children[i] && !this.prev_children[i]) {
        // Calling update on the children should handle their rendering
      }

      // Update child
      this.children[i]?.update(container);
    }

    this.prev = clone(this);
    // Workaround, cloneDeep causes a big performance hit
    // But any other clone (that is not causing a big performance hit)
    // Doesn't seem to be cloning the children well
    this.prev_children = clone(this.children);
  }

  public remove() {
    $(this.element).remove();
  }
}
