import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MailDeliveryService {

  /**
   * Instructions for using mail service:
   * In component:
   * > import { MailDeliveryService } from '../mail-delivery.service';
   * > import { Observable } from 'rxjs/Observable'; <--- this makes the error logging not throw its own errors
   * To call sendMail from component:
   * > this.<injected mail service reference>.sendMail(<args>).subscribe();
   */

  constructor(private http: Http) { }

  sendMail(to: string[], from: string, subject: string, body: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log('service.sendMail');
    let postData = { 'recipients': to, 'from': from, 'subject': subject, 'message': body };
    return this.http.post('http://portaldev.rweststaging.com/mail.php', postData, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} $(err)`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log('service.handleError', errMsg);
    return Observable.throw(errMsg);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log('service.extractData', body.data);
    return body.data || {};
  }
}


