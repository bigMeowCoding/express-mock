export interface App {
  listen: Function;
  routes: Route[];
}

export interface Route {
  path: string;
  method: string;
  handler: Function;
}
