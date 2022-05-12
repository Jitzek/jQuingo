export declare type jQuingoEventHandlerFunction = string;
export class jQuingoEventHandler {
  public static callbacks: ((e: Event) => void)[] = [];

  public static on(callback: (e: Event) => void) {
    return `${this.callbacks.push(callback) - 1}`;
  }
}