/**
 * Specifies a renderable piece of HTML in it's object form
 */
export interface jQuingoNode {
    render(container: HTMLElement): void;
}