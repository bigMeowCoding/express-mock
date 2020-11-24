import { IncomingMessage, ServerResponse } from "http";

export interface App {
  listen: Function;
  routes: Route[];
  use: Function;
  get: (path: string, handler: Function) => void;
  (req: IncomingMessage, res: ServerResponse): void;
}

export interface Route {
  path: string;
  method: string;
  handler: Function;
}
