/**
 * Specifies a renderable piece of HTML in it's object form
 */
export interface jQuingoNode {
    rendered: boolean;
    prev: jQuingoNode;
    render(container: HTMLElement): void;
    update(container: HTMLElement): void;
    remove(): void;
}