import { ObservableValue } from "../observable_value";
import { jQuingoRoute } from "./route";

export class jQuingoRouter {
  // Save the path as string and jQuingoRoute as typeof so we can easily construct and destruct routes
  private routes: {[key: string]: typeof jQuingoRoute} = {}
  public current_route: ObservableValue<jQuingoRoute> = new ObservableValue(
    new jQuingoRoute('/')
  );

  public pathExists(path: string): boolean {
    return this.routes[path] !== undefined;
  }

  public routeTo(route: string): boolean {
    history.pushState(null, "", route);
    const path = window.location.pathname;
    return this.setRoute(path);
  }

  public addRoute(path: string, route: typeof jQuingoRoute): boolean {
    if (this.pathExists(path)) return false;
    this.routes[path] = route;
    return true;
  }

  public removeRoute(path: string): boolean {
    if (!this.pathExists(path)) return false;
    delete this.routes[path];
    return true;
  }

  public setRoute(path: string): boolean {
    if (!this.pathExists(path)) return false;
    this.current_route.set(
      // Instantiate the route with a certain path and set it as current route
      // This will destruct the previous route so it will be reinstantiated when we return
      // (instead of lingering in memory)
      new this.routes[path](path)
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
    router.routeTo(e.target.href);
  },
});
