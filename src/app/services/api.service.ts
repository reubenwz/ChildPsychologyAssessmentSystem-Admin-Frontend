import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AdminStateService } from './admin-state.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private adminStateService: AdminStateService,
    private router: Router
  ) {}

  public getEndpointHostUrl(): string {
    return environment.endpoint;
  }

  public get<T>(
    path: string,
    data: { [param: string]: string } = {}
  ): Observable<T> {
    let params = new HttpParams();
    for (const dataKey in data) {
      if (dataKey && data[dataKey]) {
        params = params.set(dataKey, data[dataKey]);
      }
    }
    const options = {
      headers: this.getJsonHeaders(),
      params,
    };
    return this.http.get<T>(this.getEndpointHostUrl() + path, options);
  }

  public post<T>(
    path: string,
    data: { [param: string]: string | string[] } = {}
  ): Observable<T> {
    const options = {
      headers: this.getJsonHeaders(),
    };
    return this.http.post<T>(this.getEndpointHostUrl() + path, data, options);
  }

  /**
   * Used by a user that is logged in
   *
   * @param path
   * @param data
   */
  public authenticatedGet<T>(
    path: string,
    data: { [param: string]: string } = {}
  ): Observable<T> {
    return this.getAuthenticatedJsonHeaders().pipe(
      switchMap((headers) => {
        let params = new HttpParams();
        for (const dataKey in data) {
          if (dataKey && data[dataKey]) {
            params = params.set(dataKey, data[dataKey]);
          }
        }
        const options = {
          headers,
          params,
          withCredentials: true,
        };
        return this.http.get<T>(this.getEndpointHostUrl() + path, options);
      }),
      tap(
        () => {},
        (err: HttpErrorResponse) => {
          // Force logout if unauthorized OR forbidden
          if (err.status === 401 || err.status === 403) {
            this.adminStateService.clearToken();
            this.router.navigateByUrl('/', { replaceUrl: true });
          }
        }
      )
    );
  }

  public authenticatedGetWithArrayParams<T>(
    path: string,
    data: { [param: string]: string } = {}
  ): Observable<T> {
    return this.getAuthenticatedJsonHeaders().pipe(
      switchMap((headers) => {
        let params = new HttpParams();
        params = this.arrayParamsSet(params, data);
        const options = {
          headers,
          params,
          withCredentials: true,
        };
        return this.http.get<T>(this.getEndpointHostUrl() + path, options);
      }),
      tap(
        () => {},
        (err: HttpErrorResponse) => {
          // Force logout if unauthorized OR forbidden
          if (err.status === 401 || err.status === 403) {
            this.adminStateService.clearToken();
            this.router.navigateByUrl('/', { replaceUrl: true });
          }
        }
      )
    );
  }

  /**
   * Handles one layer of array
   *
   * @param params
   * @param data
   * @param arrayKey
   * @private
   */
  private arrayParamsSet(
    params: HttpParams,
    data: string[] | { [param: string]: string | string[] },
    arrayKey: string = ''
  ): HttpParams {
    if (Array.isArray(data)) {
      for (const dataValue of data) {
        params = params.append(arrayKey, dataValue);
      }
      return params;
    } else {
      for (const dataKey in data) {
        if (dataKey && data[dataKey]) {
          const dataValue: string | string[] = data[dataKey];
          if (Array.isArray(dataValue)) {
            params = this.arrayParamsSet(params, dataValue, dataKey);
          } else {
            params = params.append(dataKey, dataValue);
          }
        }
      }

      return params;
    }
  }

  public authenticatedPost<T>(
    path: string,
    data: { [param: string]: string | string[] } = {}
  ): Observable<T> {
    return this.getAuthenticatedJsonHeaders().pipe(
      switchMap((headers) => {
        const options = {
          headers,
          withCredentials: true,
        };
        return this.http.post<T>(
          this.getEndpointHostUrl() + path,
          data,
          options
        );
      })
    );
  }

  public authenticatedPatch<T>(
    path: string,
    data: { [param: string]: string | string[] } = {}
  ): Observable<T> {
    return this.getAuthenticatedJsonHeaders().pipe(
      switchMap((headers) => {
        const options = {
          headers,
          withCredentials: true,
        };
        return this.http.patch<T>(
          this.getEndpointHostUrl() + path,
          data,
          options
        );
      })
    );
  }

  public authenticatedDelete<T>(path: string): Observable<T> {
    return this.getAuthenticatedJsonHeaders().pipe(
      switchMap((headers) => {
        const options = {
          headers,
          withCredentials: true,
        };
        return this.http.delete<T>(this.getEndpointHostUrl() + path, options);
      })
    );
  }

  /**
   * Important side effect: upload-file is changed into the file attribute data
   *
   * @param path
   * @param data
   * @param singleFile
   */
  public authenticatedFilePost<T>(
    path: string,
    data: { [param: string]: string },
    singleFile: File
  ): Observable<T> {
    return this.getAuthenticatedFileHeaders().pipe(
      switchMap((headers) => {
        const options = {
          headers,
          withCredentials: true,
        };
        const formData: FormData = new FormData();
        for (let paramDataKey in data) {
          formData.append(paramDataKey, data[paramDataKey]);
        }
        formData.append('upload-file', singleFile, singleFile.name);

        return this.http.post<T>(
          this.getEndpointHostUrl() + path,
          formData,
          options
        );
      })
    );
  }

  private getJsonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    });
  }

  private getAuthenticatedJsonHeaders(): Observable<HttpHeaders> {
    return this.adminStateService.getToken().pipe(
      switchMap((token) => {
        return of(
          new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          })
        );
      })
    );
  }

  private getAuthenticatedFileHeaders(): Observable<HttpHeaders> {
    return this.adminStateService.getToken().pipe(
      switchMap((token) => {
        return of(
          new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          })
        );
      })
    );
  }
}
