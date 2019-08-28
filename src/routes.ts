import { IncomingMessage, ServerResponse } from "http";
import { Route } from "./utils";
import { UserInfo } from "./models";
import { createHmac, Hmac } from "crypto";

interface RequestParam {
  request: IncomingMessage;
  response: ServerResponse;
  routeName: string;
  method: string;
  url: string;
  headers: Object;
  queryString: any[];
  requestBody: Object;
}

const RouteList: Route[] = [
  {
    name: "root",
    methods: [
      {
        name: "GET",
        callback: (requestParams: RequestParam) => {
          const { response } = requestParams;
          response.writeHead(200, { "Content-Type": "text/plain" });
          response.end("Welcome to root. You are using GET method.");
        }
      },
      {
        name: "POST",
        callback: (requestParams: RequestParam) => {
          const { response, requestBody, queryString } = requestParams;
          const user: UserInfo = <UserInfo>requestBody;
          const hash: Hmac = createHmac("sha256", "cuponeria2019");
          hash.update(`${user.username}|${user.password}`);
          const token = hash.digest("hex");
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ status: 200, user, token }));
        }
      }
    ]
  },
  {
    name: "auth",
    methods: [
      {
        name: "POST",
        callback: (requestParams: RequestParam) => {
          const { response, requestBody } = requestParams;
          response.writeHead(200, { "Content-Type": "text/plain" });
          response.end(JSON.stringify({ success: true, ...requestBody }));
        }
      }
    ]
  },
  {
    name: "html",
    methods: [
      {
        name: "POST",
        callback: (requestParams: RequestParam) => {
          const { response, requestBody } = requestParams;
          response.writeHead(200, { "Content-Type": "text/html" });
          /* response.end(
            JSON.stringify({ success: true, html: requestBody.toString() })
          ); */
          response.end(requestBody);
        }
      }
    ]
  }
];

export default RouteList;
