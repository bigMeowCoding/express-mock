import * as http from "http";
import * as url from "url";
import { App } from "./config";

function createApplication(): App {
  // @ts-ignore
  let app: App = function (req, res) {
    let method = req.method.toLocaleLowerCase();
    let { pathname } = url.parse(req.url, true);
    app.routes.forEach((route) => {
      if (route.method === method && route.path === pathname) {
        route.handler(req, res);
      }
    });
  };
  app.routes = [];
  app.listen = function () {
    // @ts-ignore
    let server = http.createServer(app);
    // arguments就是参数(3000, 'localhost', function () {})
    server.listen(...arguments);
    return server;
  };
  http.METHODS.forEach((method) => {
    method = method.toLocaleLowerCase();
    app[method] = function (path: string, handler) {
      app.routes.push({
        path,
        method,
        handler,
      });
    };
  });
  return app;
}

const app = createApplication();
app.listen(3000, (req,res) => {
  console.log("listen 3000");
});
app.get("/gettest", (req, res) => {
  res.end('hello get test')
});
