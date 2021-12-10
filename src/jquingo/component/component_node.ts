import { jQuingoNode } from "./node";
import * as $ from "jquery";
import { jQuingoTextNode } from "./text_node";
import { clone } from "lodash";
import { jQuingoEventHandler } from "../jQuingo";

export class jQuingoComponentNode implements jQuingoNode {
  public prev!: jQuingoNode;
  public prev_children: Array<jQuingoNode> = [];
  public element!: HTMLElement;
  public type: string;
  public props: { [key: string]: any };
  public children: Array<jQuingoNode>;

  public test = 0;
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
   * jQuingoComponent:
   * {
   *    type: "div",
   *    props: {
   *      class: "container"
   *    },
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

    for (const key in this.props) {
      if (key.startsWith('on')) {
        $(this.element).on(key.slice(2), (e: Event) => jQuingoEventHandler.callbacks[this.props[key]](e));
        continue;
      }
      $(this.element).prop(key, this.props[key]);
    }

    this.children.forEach((component) => {
      component.render(this.element);
    });

    $(container).append(this.element);

    this.prev = clone(this);
  }

  public update(container: HTMLElement): void {
    if (!this.prev) {
      this.render(container);
    }
    if (
      !(this.prev instanceof jQuingoComponentNode) ||
      this.type !== this.prev.type
    ) {
      this.reload();
    }

    // Update properties of element
    const props_keys = Object.keys(this.props);
    
    for (let i = 0; i < props_keys.length || i < this.element.attributes.length; i++) {
      if (!props_keys[i]) {
        // Prop has been removed
        $(this.element).removeAttr(this.props[props_keys[i]]);
        continue;
      }
      if (this.element.hasAttribute(props_keys[i])) {
        // Prop already exists, update value
        this.element.attributes[i].nodeValue = this.props[props_keys[i]];
        continue;
      }
      if (!this.element.attributes[i]) {
        // Prop has been added
        if (props_keys[i].startsWith('on')) {
          $(this.element).on(props_keys[i].slice(2), (e: Event) => jQuingoEventHandler.callbacks[this.props[props_keys[i]]](e));
          continue
        }
      }
    }

    // Check whether the children's order/types have changed
    for (
      let i = 0;
      i < this.children.length || i < this.prev_children.length;
      i++
    ) {
      if (this.children[i] && this.prev_children[i]) {
        // TODO: Please find a way to refactor this mess
        if (
          (this.children[i] instanceof jQuingoComponentNode &&
            this.prev_children[i] instanceof jQuingoComponentNode &&
            (this.children[i] as jQuingoComponentNode).type !==
              (this.prev_children[i] as jQuingoComponentNode).type) ||
          (this.children[i] instanceof jQuingoTextNode &&
            this.prev_children[i] instanceof jQuingoTextNode &&
            (this.children[i] as jQuingoTextNode).value !==
              (this.prev_children[i] as jQuingoTextNode).value)
        ) {
          this.reload();
        }
      }

      if (!this.children[i]) {
        // Child has been removed
        this.prev_children[i].remove();
      }

      // Update child
      this.children[i]?.update(this.element);
    }

    this.prev = clone(this);
    // Workaround, {cloneDeep} causes a big performance hit
    // But any other clone (that is not causing a big performance hit)
    // Doesn't seem to be cloning the children well
    (this.prev as jQuingoComponentNode).children = clone(this.children);
    this.prev_children = clone(this.children);
  }

  public remove() {
    $(this.element).remove();
  }

  private reload() {
    // Create a new element and override the existing element with this new element
    const new_element: HTMLElement = document.createElement(this.type);
    // Render children to new element
    this.children.forEach((child) => child.render(new_element));
    $(this.element).replaceWith(new_element);
    this.element = new_element;
  }
}
