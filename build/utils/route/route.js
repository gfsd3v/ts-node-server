"use strict";
exports.__esModule = true;
var Route = /** @class */ (function () {
    function Route(name, methods) {
        this.name = name;
        this.methods = methods;
    }
    Route.parseName = function (url) {
        if (url == '/' || url.startsWith('/?'))
            return 'root';
        return /\/(\w+)(\?*.*)/.exec(url)[1];
    };
    Route.parseParams = function (url) {
        if (url.indexOf('?') > -1) {
            var raw = /\?(.+)/.exec(url)[1];
            if (raw.indexOf('&') === -1) {
                var queryParams = {};
                var _a = raw.split('='), key = _a[0], value = _a[1];
                queryParams[key] = value;
                return queryParams;
            }
            else {
                var params = raw.split('&');
                var queryParams_1 = {};
                params.forEach(function (p) {
                    var _a = p.split('='), key = _a[0], value = _a[1];
                    queryParams_1[key] = value;
                });
                return queryParams_1;
            }
        }
        else {
            return [];
        }
    };
    Route.methodNotAllowed = function (routeName, method, response) {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end("No access allowed on " + routeName + " using method " + method);
    };
    return Route;
}());
exports.Route = Route;
