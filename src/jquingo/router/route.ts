import { jQuingoComponent } from "../component/component";

export class Route extends jQuingoComponent {
  constructor(public path: string) {
    super('div', {});
  }
}
