import {
  createServer,
  IncomingMessage,
  ServerResponse,
  RequestListener,
  Server
} from "http";

import { Route } from "./utils";
import RouteList from "./routes";

const requestListener: RequestListener = (
  request: IncomingMessage,
  response: ServerResponse
) => {
  if (request.url !== "/favicon.ico") {
    const { method, url, headers } = request;
    const routeName: string = Route.parseName(url);
    let queryString = Route.parseParams(url);
    const currentRoute: Route = RouteList.find(
      route => route.name === routeName
    );
    if (currentRoute) {
      const currentMethod = currentRoute.methods.find(m => m.name === method);
      if (currentMethod) {
        const requestParams = {
          request,
          response,
          routeName,
          method,
          url,
          headers,
          queryString
        };
        let requestBody = "";
        request.on("data", chunk => (requestBody += chunk.toString()));
        request.on("end", () => {
          if (headers["content-type"] === "text/html") {
            console.log("here");
            // @ts-ignore
            requestBody = requestBody.length > 0 ? requestBody : {};
          } else {
            requestBody = requestBody.length > 0 ? JSON.parse(requestBody) : {};
          }
          requestParams["requestBody"] = requestBody;
          currentMethod.callback(requestParams);
        });
      } else {
        response.writeHead(200, { "Content-Type": "text/plain" });
        Route.methodNotAllowed(routeName, method, response);
      }
    } else {
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end("Not found");
    }
  }
};

const server: Server = createServer(requestListener);
server.listen(8080, () => console.log("Server listening on port 8080"));
