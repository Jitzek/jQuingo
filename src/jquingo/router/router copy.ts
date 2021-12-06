// import { Component } from "../component";
// import { ObservableValue } from "../observable_value";
// import { Route } from "./route";
// import * as $ from "jquery";
// import { app } from "../../routes/App";

// const routes: { [path: string]: Component } = { "/": app }; // Temporary default value
// export const current_route: ObservableValue<Route> = new ObservableValue(
//   new Route("/", app)
// ); // Temporary default value

// $(window).on({
//   popstate: (_e: Event) => {
//     current_route.set(
//       new Route(window.location.pathname, routes[window.location.pathname])
//     );
//   },
// });

// $(document).on({
//   DOMContentLoaded: (_e: Event) => {
//     current_route.set(
//       new Route(window.location.pathname, routes[window.location.pathname])
//     );
//   },
//   click: (e: MouseEvent) => {
//     if (!(e.target instanceof HTMLAnchorElement)) {
//       return;
//     }
//     e.preventDefault();
//     routeTo((e.target as HTMLAnchorElement).href);
//   },
// });

// function pathExists(path: string): boolean {
//   return path in routes;
// }

// export function routeTo(route: string): boolean {
//   history.pushState(null, "", route);
//   const path = window.location.pathname;
//   if (!pathExists(path)) return false;
//   current_route.set(new Route(path, routes[path]));
//   return true;
// }

// export function createRoute(path: string, component: Component): boolean {
//   if (pathExists(path)) return false;
//   routes[path] = component;
//   return true;
// }

// export function removeRoute(path: string): boolean {
//   if (!pathExists(path)) return false;
//   delete routes[path];
//   return true;
// }
