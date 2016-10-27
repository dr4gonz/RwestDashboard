import { Injectable } from '@angular/core';

@Injectable()
export class MailSenderService {

  constructor() { }

  send(from, to, subject, body, tkn) {
    console.log("service called...");
    var a = Math.floor(1e6 * Math.random() + 1),
        externalScript = "http://smtpjs.com/smtp.aspx?";
    externalScript += "From=" + from,
    externalScript += "&to=" + to,
    externalScript += "&Subject=" + encodeURIComponent(subject),
    externalScript += "&Body=" + encodeURIComponent(body),
    externalScript += "&SecureToken=" + tkn.token,
    externalScript += "&Action=SendFromStored",
    externalScript += "&cachebuster=" + a,
    this.addScript(externalScript);
  }

  sendBad(from, to, subject, body, ispUrl, uName, pw) {
    console.log('service called...');
    var a = Math.floor(1e6 * Math.random() + 1),
        externalScript = "http://smtpjs.com/smtp.aspx?";
    externalScript += "From=" + from,
    externalScript += "&to=" + to,
    externalScript += "&Subject=" + encodeURIComponent(subject),
    externalScript += "&Body=" + encodeURIComponent(body),
    void 0 == ispUrl.token ?
      (externalScript += "&Host=" + ispUrl,
      externalScript += "&Username=" + uName,
      externalScript += "&Password=" + pw,
      externalScript += "&Action=Send")
      : (externalScript += "&SecureToken=" + ispUrl.token,
      externalScript += "&Action=SendFromStored"),
      externalScript += "&cachebuster=" + a,
      this.addScript(externalScript);
  }




  addScript(t) {
      var e = document.createElement("link");
      e.setAttribute("rel", "stylesheet"), e.setAttribute("type", "text/xml"), e.setAttribute("href", t), document.body.appendChild(e)
    }

}
