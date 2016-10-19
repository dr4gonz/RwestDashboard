import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from './user';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class FileService {
  private boxUrl = 'https://account.box.com/api/oauth2/authorize?response_type=code&client_id=o5rt22bv247y3y5qj8d0va13ufy4br8n&state=security_token%3DKnhMJatFipTAnM0nHlZA&redirect_uri=http://localhost:4200';

  constructor(private http: Http) {}
  userLogin(): Observable<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin','http://localhost:4200');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    let options = new RequestOptions({ headers: headers});

    console.log(headers);
    return this.http.get(this.boxUrl, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError(error: any) {
    let errMsg = (error.message);
    console.error(errMsg);
    return Observable.throw(errMsg);
  }



}
