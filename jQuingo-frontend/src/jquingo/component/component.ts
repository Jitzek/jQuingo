import { jQuingo } from "@jquingo/jQuingo";
import { jQuingoNode } from "@jquingo/component/node";
import { ObservableValue } from "../observable_value";

export class jQuingoComponent {
    protected nodes: jQuingoNode[] = [];
    private _prev_template: string = "";

    constructor() {
        this.init();
    }

    protected init() {}

    public template(): string {
        return "";
    }

    public render(): jQuingoNode[] {
        const new_template = this.template();
        if (new_template !== this._prev_template) {
            this.nodes = jQuingo.updateNodes(
                this.nodes,
                jQuingo.createNodes(new_template)
            );
            this._prev_template = new_template;
        }

        return this.nodes;
    }
}
