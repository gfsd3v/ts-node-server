import { Method } from '../index';
import { ServerResponse } from 'http';

export class Route {
  public name: string;
  public methods: Method[];
  constructor(name: string, methods: Method[]) {
    this.name = name;
    this.methods = methods;
  }

  static parseName(url: string) {
    if (url == '/' || url.startsWith('/?')) return 'root';
    return /\/(\w+)(\?*.*)/.exec(url)[1];
  }

  static parseParams(url: string) {
    if (url.indexOf('?') > -1) {
      const raw = /\?(.+)/.exec(url)[1];
      if (raw.indexOf('&') === -1) {
        const queryParams = {};
        const [key, value] = raw.split('=');
        queryParams[key] = value;
        return queryParams;
      } else {
        const params = raw.split('&');
        const queryParams = {}
        params.forEach(p => {
          const [key, value] = p.split('=');
          queryParams[key] = value
        });
        return queryParams;
      }
    } else {
      return [];
    }
  }

  static methodNotAllowed = (
    routeName: string,
    method: string,
    response: ServerResponse
  ) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end(`No access allowed on ${routeName} using method ${method}`);
  };
}
