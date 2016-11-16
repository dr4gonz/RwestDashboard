import { Component, OnInit } from '@angular/core';
import { DocumentItem } from '../../models/document-item.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ModalModule } from 'ng2-modal';

@Component({
  selector: 'app-document-preview',
  inputs: ['docLink'],
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.css']
})
export class DocumentPreviewComponent implements OnInit {

  private docLink: string;
  private iframeUrl: SafeUrl = null;
  private extDocUrl: SafeUrl = null;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (this.docLink) {
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.docLink + "?embedded=true");
      this.extDocUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.docLink.slice(0, -4));
    }
  }

  validateUrl(link: string) {
    try {
      let suffix = link.slice(link.length - 4);
      let prefix = link.slice(0, 33);
      if (suffix !== "/pub") {
        return false;
      } else if (prefix !== "https://docs.google.com/document/") {
        return false;
      } else return true;
    } catch (ex) {
      return false;
    }
  }


}
