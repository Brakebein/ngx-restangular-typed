import { Observable } from 'rxjs';
import { RestangularHttp, RestangularModule } from 'ngx-restangular';

export {
  RestangularHttp,
  RestangularModule
}

export class Restangular extends RestService {}

export class RestProvider {
  setBaseUrl(baseUrl: string): RestProvider;
  addFullRequestInterceptor(requestInterceptor: (element: any, operation: string, what: string, url: string, headers: any, params: any) => {headers?: any, params?: any, element?: any}): RestProvider;
}

export class ICustom {
  customGET(path: string, params?: any, headers?: any): Observable<any>;
  customPATCH(elem?: any, path?: string, params?: any, headers?: any): Observable<any>;
  customPOST(elem?: any, path?: string, params?: any, headers?: any): Observable<any>;
  addRestangularMethod(name: string, operation: string, path?: string, params?: any, headers?: any, elem?: any): void;
}

export class RestService extends ICustom {
  one(route: string, id?: number | string): RestElement;
  one<T>(route: string, id?: number | string): RestElement<T>;
  all(route: string): RestCollection;
  all<T>(route: string): RestCollection<T>;
  copy(fromElement: any): RestElement;
  restangularizeElement(parent: any, element: any, route: string, collection?: any, reqParams?: any): RestElement;
  restangularizeCollection(parent: any, element: any, route: string): RestCollection;
}

declare interface IElement<T> extends RestService {
  get(queryParams?: any, headers?: any): Observable<RestElement<T>>;
  patch(object?: any, queryParams?: any, headers?: any): Observable<any>;
  remove(queryParams?: any, headers?: any): Observable<any>;
  plain(): T;
}

export type RestElement<T = unknown> = T & IElement<T>;

declare interface ICollection<T> extends RestService {
  getList(queryParams?: any, headers?: any): Observable<RestCollection<T>>;
  post(elementToPost: any, queryParams?: any, headers?: any): Observable<any>;
  post<P>(elementToPost: any, queryParams?: any, headers?: any): Observable<RestElement<P>>;
  plain(): T[];
}

export type RestCollection<T = unknown> = Array<RestElement<T>> & ICollection<T>;
