import { jQuingoNode } from "./node";
import * as $ from "jquery";

export class jQuingoComponent implements jQuingoNode {
  public type: string;
  public props: {[key: string]: string};
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
  constructor(type: string, props: {[key: string]: string}, ...children: Array<jQuingoNode>) {
    this.type = type;
    this.props = props;
    this.children = children;
  }

  public render(container: HTMLElement) {
    const dom: HTMLElement = document.createElement(this.type);

    $(dom).attr(this.props);

    this.children.forEach((component) => {
      component.render(dom);
    });

    $(container).append(dom);
  }
}