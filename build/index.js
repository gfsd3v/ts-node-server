"use strict";
exports.__esModule = true;
var http_1 = require("http");
var utils_1 = require("./utils");
var routes_1 = require("./routes");
var requestListener = function (request, response) {
    if (request.url !== "/favicon.ico") {
        var method_1 = request.method, url = request.url, headers_1 = request.headers;
        var routeName_1 = utils_1.Route.parseName(url);
        var queryString = utils_1.Route.parseParams(url);
        var currentRoute = routes_1["default"].find(function (route) { return route.name === routeName_1; });
        if (currentRoute) {
            var currentMethod_1 = currentRoute.methods.find(function (m) { return m.name === method_1; });
            if (currentMethod_1) {
                var requestParams_1 = {
                    request: request,
                    response: response,
                    routeName: routeName_1,
                    method: method_1,
                    url: url,
                    headers: headers_1,
                    queryString: queryString
                };
                var requestBody_1 = "";
                request.on("data", function (chunk) { return (requestBody_1 += chunk.toString()); });
                request.on("end", function () {
                    if (headers_1["content-type"] === "text/html") {
                        console.log("here");
                        // @ts-ignore
                        requestBody_1 = requestBody_1.length > 0 ? requestBody_1 : {};
                    }
                    else {
                        requestBody_1 = requestBody_1.length > 0 ? JSON.parse(requestBody_1) : {};
                    }
                    requestParams_1["requestBody"] = requestBody_1;
                    currentMethod_1.callback(requestParams_1);
                });
            }
            else {
                response.writeHead(200, { "Content-Type": "text/plain" });
                utils_1.Route.methodNotAllowed(routeName_1, method_1, response);
            }
        }
        else {
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.end("Not found");
        }
    }
};
var server = http_1.createServer(requestListener);
server.listen(8080, function () { return console.log("Server listening on port 8080"); });
