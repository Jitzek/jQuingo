import { jQuingoNode } from "./node";
import * as $ from "jquery";
import * as sanitizeHtml from "sanitize-html";
import { clone } from "lodash";

export class jQuingoTextNode implements jQuingoNode {
  public prev!: jQuingoNode;

  constructor(public value: string) {}

  public render(container: HTMLElement): void {
    $(container).append(
      sanitizeHtml(this.value, {
        allowedTags: [],
        allowedAttributes: {},
        selfClosing: [],
        disallowedTagsMode: "escape",
      })
    );
    this.prev = clone(this);
  }

  public update(container: HTMLElement): void {
    // Check if node type hasn't changed
    if (!(this.prev instanceof jQuingoTextNode)) {
      // Remove value from UI (parent)
      $(container).contents().replaceWith("");
      // Perform an initial render
      this.render(container);
      return;
    }
    // Check if value hasn't changed
    if (this.value !== this.prev.value) {
      console.log("hello");
      $(container)
        .contents()
        .replaceWith(
          sanitizeHtml(this.value, {
            allowedTags: [],
            allowedAttributes: {},
            selfClosing: [],
            disallowedTagsMode: "escape",
          })
        );
    }
    this.prev = clone(this);
  }

  remove(): void {
    this.value = "";
  }
}
