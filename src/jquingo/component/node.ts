/**
 * Specifies a renderable piece of HTML in it's object form
 */
export interface jQuingoNode {
    prev: jQuingoNode;
    render(container: HTMLElement | SVGElement): void;
    update(container: HTMLElement | SVGElement): void;
    remove(): void;
}