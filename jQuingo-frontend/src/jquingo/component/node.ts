/**
 * Specifies a renderable piece of HTML in it's object form
 */
export interface jQuingoNode {
    prev: jQuingoNode;
    render(container: Element): void;
    update(container: Element): void;
    remove(): void;
}