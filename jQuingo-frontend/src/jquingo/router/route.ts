import { jQuingoComponent } from "../component/component";
import { router } from "./router";

export class jQuingoRoute extends jQuingoComponent {
  constructor(public path: string) {
    super();
  }
}
