export interface App extends Function {
  listen: Function;
  routes: Route[];
  get: (path: string, handler: Function) => void;
}

export interface Route {
  path: string;
  method: string;
  handler: Function;
}
