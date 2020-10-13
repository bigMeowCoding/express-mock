import * as http from "http";
import * as url from "url";
import { App, MIDDLE_WARE_METHOD } from "./config";

function createApplication(): App {
  // @ts-ignore
  let app: App = function (req, res) {
    let httpMethod = req.method.toLocaleLowerCase();
    let { pathname } = url.parse(req.url, true);
    let index = 0;
    function next() {
      if (index === app.routes.length) {
        return;
      }

      let { method, path, handler } = app.routes[index++];
      if (method === MIDDLE_WARE_METHOD) {
        if (path === pathname) {
          handler(req, res, next);
        } else {
          next();
        }
      } else {
        if (method === httpMethod && pathname === path) {
          handler(req, res);
        } else {
          next();
        }
      }
    }
    next();
  };
  app.use = function (path, handler) {
    app.routes.push({
      path,
      method: MIDDLE_WARE_METHOD,
      handler,
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
app.listen(3000, (req, res) => {
  console.log("listen 3000");
});
app.get("/gettest", (req, res) => {
  res.end("hello get test");
});
app.use("/test", (req, res, next) => {
  console.log("middle");
  next();
});
