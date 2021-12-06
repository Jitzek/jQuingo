import { jQuingoNode } from "./node";
import * as $ from "jquery";
import * as sanitizeHtml from 'sanitize-html';

export class jQuingoTextNode implements jQuingoNode {
    constructor(public value: string) {}

    public render(container: HTMLElement) {
        $(container).append(sanitizeHtml(this.value, {
            allowedTags: [],
            allowedAttributes: {},
            selfClosing: [],
            disallowedTagsMode: 'escape'
        }));
    }
}