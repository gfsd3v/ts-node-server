"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var crypto_1 = require("crypto");
var RouteList = [
    {
        name: "root",
        methods: [
            {
                name: "GET",
                callback: function (requestParams) {
                    var response = requestParams.response;
                    response.writeHead(200, { "Content-Type": "text/plain" });
                    response.end("Welcome to root. You are using GET method.");
                }
            },
            {
                name: "POST",
                callback: function (requestParams) {
                    var response = requestParams.response, requestBody = requestParams.requestBody, queryString = requestParams.queryString;
                    var user = requestBody;
                    var hash = crypto_1.createHmac("sha256", "cuponeria2019");
                    hash.update(user.username + "|" + user.password);
                    var token = hash.digest("hex");
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.end(JSON.stringify({ status: 200, user: user, token: token }));
                }
            }
        ]
    },
    {
        name: "auth",
        methods: [
            {
                name: "POST",
                callback: function (requestParams) {
                    var response = requestParams.response, requestBody = requestParams.requestBody;
                    response.writeHead(200, { "Content-Type": "text/plain" });
                    response.end(JSON.stringify(__assign({ success: true }, requestBody)));
                }
            }
        ]
    },
    {
        name: "html",
        methods: [
            {
                name: "POST",
                callback: function (requestParams) {
                    var response = requestParams.response, requestBody = requestParams.requestBody;
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
exports["default"] = RouteList;
