import { ObservableValue } from "../observable_value";
import { jQuingoRoute } from "./route";
import * as $ from "jquery";

export class jQuingoRouter {
  private routes: jQuingoRoute[] = [];
  public current_route: ObservableValue<jQuingoRoute> = new ObservableValue(
    this.routes[0]
  );

  public pathExists(path: string): boolean {
    return this.routes.find((_route) => _route.path === path) !== undefined;
  }

  public routeTo(route: string): boolean {
    history.pushState(null, "", route);
    const path = window.location.pathname;
    return this.setRoute(path);
  }

  public addRoute(route: jQuingoRoute): boolean {
    if (this.pathExists(route.path)) return false;
    this.routes.push(route);
    return true;
  }

  public removeRoute(path: string): boolean {
    if (!this.pathExists(path)) return false;
    this.routes.splice(
      this.routes.indexOf(
        this.routes.find((_route) => _route.path === path) as jQuingoRoute
      ),
      1
    );
    return true;
  }

  public setRoute(path: string): boolean {
    if (!this.pathExists(path)) return false;
    this.current_route.set(
      this.routes.find((_route) => _route.path === path) as jQuingoRoute
    );
    return true;
  }
}

export const router: jQuingoRouter = new jQuingoRouter();

// Called when the user is going back and forth the browser session history
$(window).on({
  popstate: (_e: Event) => {
    router.setRoute(window.location.pathname);
  },
});

$(document).on({
  // Initialize route when the user first enters the website
  DOMContentLoaded: (_e: Event) => {
    router.setRoute(window.location.pathname);
  },
  // When a user clicks on an anchor element with a href, provide our own logic
  click: (e: MouseEvent) => {
    if (!(e.target instanceof HTMLAnchorElement)) {
      return;
    }
    e.preventDefault();
    router.routeTo((e.target as HTMLAnchorElement).href);
  },
});
