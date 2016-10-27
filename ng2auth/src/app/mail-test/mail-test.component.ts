import { Component, OnInit } from '@angular/core';
import { MailSenderService } from '../mail-sender.service';

@Component({
  selector: 'app-mail-test',
  templateUrl: './mail-test.component.html',
  styleUrls: ['./mail-test.component.css']
})
export class MailTestComponent implements OnInit {

  private mS: MailSenderService;

  constructor(mS: MailSenderService) {
    this.mS = mS;
  }

  ngOnInit() {
  }

  sendMail() {
    console.log('click');
  //   this.mS.send("epicoduspoker@gmail.com",
  //   "egbertcarl@gmail.com",
  //   "Test?",
  //   "Test",
  //   {token: "ce19cc1f-1dd4-4035-83e0-f6cf442a792b"});

  this.mS.sendBad("epicoduspoker@gmail.com",
    "egbertcarl@gmail.com",
    "Test?",
    "Test",
    "smtp.gmail.com",
    "epicoduspoker",
    "stayfocused");

  }

}
