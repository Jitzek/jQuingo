import { jQuingoNode } from "./node";
import clone from "lodash/clone";
import { jQuingoEventHandler } from "@src/jquingo/events/event_handler";

export class jQuingoComponentNode implements jQuingoNode {
    public prev!: jQuingoNode;
    public prev_children: Array<jQuingoNode> = [];
    public element!: Element;
    public type: string;
    public props: { [key: string]: any };
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
     *
     * ^ translates v
     *
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

    /**
     * Calling Document.createElement on an HTML document will always create an HTML element.
     * An HTML element with the tag name "svg" will just be treated as an unknown span-type element.
     * 
     * Using either innerHTML to pass a markup string or Document.createElementNS and passing in the correct namespace URI
     * will create the SVG element correctly.
     * This should also be done for all the children inside the SVG.
     * 
     * The namespaceURIdict-variable will be used for all elements which require a specific namespace URI to be correctly created.
     * The jQuingoComponentNode.createElement-function will use this dictionary to create and return the element by type.
     */
    private namespaceURIdict: { [key: string]: string } = {
        "svg": "http://www.w3.org/2000/svg",
        "path": "http://www.w3.org/2000/svg",
        "g": "http://www.w3.org/2000/svg"
    }
    private createElement(type: string): Element {
        if (this.namespaceURIdict[type]) {
            return document.createElementNS(this.namespaceURIdict[type], this.type);
        }
        return document.createElement(this.type);
    }

    public render(container: HTMLElement): void {
        this.element = this.createElement(this.type);

        this.updateAttributes(this.element, this.props);

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
        this.updateAttributes(this.element, this.props);

        // Check whether the children's order/types have changed
        for (
            let i = 0;
            i < this.children.length || i < this.prev_children.length;
            i++
        ) {
            if (!this.children[i]) {
                // Child has been removed, so remove from UI aswell
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

    /**
     * Removes element from UI
     */
    public remove() {
        $(this.element).remove();
    }

    /**
     * Removes and replaces element using current settings
     */
    private reload() {
        // Create a new element and override the existing element with this new element
        let new_element = this.createElement(this.type);
        // Set properties
        this.updateAttributes(new_element, this.props);
        // Render children to new element
        this.children.forEach((child) => child.render(new_element));
        $(this.element).replaceWith(new_element);
        this.element = new_element;
    }

    /**
     * Adds, Updates or Removes attributes of the given element
     * @param element The element to update the attributes of
     * @param props The props that represent the new attributes of the element
     */
    private updateAttributes(
        element: Element,
        props: { [key: string]: any }
    ) {
        const props_keys = Object.keys(props);
        for (
            let i = 0;
            i < props_keys.length || i < element.attributes.length;
            i++
        ) {
            if (!props_keys[i]) {
                // Prop has been removed
                $(element).removeAttr(props[props_keys[i]]);
                continue;
            }
            if (element.hasAttribute(props_keys[i])) {
                // Attribute already exists, update/overwrite value
                $(element).attr(props_keys[i], props[props_keys[i]]);
                continue;
            }
            if (!element.attributes[i]) {
                // Attribute has been added
                if (props_keys[i].startsWith("on")) {
                    $(element).on(props_keys[i].slice(2), (e: Event) =>
                        jQuingoEventHandler.callbacks[props[props_keys[i]]](e)
                    );
                    continue;
                }
                $(element).attr(props_keys[i], props[props_keys[i]]);
            }
        }
    }
}
