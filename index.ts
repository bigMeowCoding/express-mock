import * as http from "http";
import * as url from "url";

function createApplication(): any {

  // app是一个监听函数
  let app = function (req: Request, res) {
    let m = req.method.toLocaleLowerCase();
    let { pathname } = url.parse(req.url, true);

  };

  // @ts-ignore
  app.listen = function () {
    let server = http.createServer(app);
    // arguments就是参数(3000, 'localhost', function () {})
    server.listen(...arguments);
    return server;
  };

  return app;
}

const app = createApplication();
app.listen(3000, () => {
  console.log("listen 3000");
});
