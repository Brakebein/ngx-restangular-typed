import {Observable} from 'rxjs';

export interface RestProvider {
  setBaseUrl(baseUrl: string): RestProvider;
  addFullRequestInterceptor(requestInterceptor: (element: any, operation: string, what: string, url: string, headers: any, params: any) => {headers?: any, params?: any, element?: any}): RestProvider;
}

// interface RestangularModule {
//   forRoot(configFunction?: (provider: IProvider) => void);
// }

export interface ICustom {
  customGET(path: string, params?: any, headers?: any): Observable<any>;
  customPATCH(elem?: any, path?: string, params?: any, headers?: any): Observable<any>;
  customPOST(elem?: any, path?: string, params?: any, headers?: any): Observable<any>;
  addRestangularMethod(name: string, operation: string, path?: string, params?: any, headers?: any, elem?: any): void;
}

export interface RestService extends ICustom {
  one(route: string, id?: number|string): RestElement<any>;
  one<T>(route: string, id?: number|string): RestElement<T>;
  all(route: string): RestCollection<any>;
  all<T>(route: string): RestCollection<T>;
  copy(fromElement: any): RestElement<any>;
  restangularizeElement(parent: any, element: any, route: string, collection?: any, reqParams?: any): RestElement<any>;
  restangularizeCollection(parent: any, element: any, route: string): RestCollection<any>;
}

export type RestElement<T> = T & IElement<T>;

interface IElement<T> extends RestService {
  // get(queryParams?: any, headers?: any): Observable<any>;
  get(queryParams?: any, headers?: any): Observable<RestElement<T>>;
  patch(object?: any, queryParams?: any, headers?: any): Observable<any>;
  remove(queryParams?: any, headers?: any): Observable<any>;
  // plain(): any;
  plain(): T;
}

export interface RestCollection<T> extends RestService, Array<T> {
  // getList(queryParams?: any, headers?: any): Observable<any>;
  getList(queryParams?: any, headers?: any): Observable<RestCollection<T>>;
  // plain(): any;
  plain(): T[];
}


