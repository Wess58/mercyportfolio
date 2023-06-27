import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  whatsappBookPurchaseMessage = 'Hello, I am interested in buying your book. I saw your website and got redirected to this WhatsApp chat. Your book sounds amazing and I\'m excited to read it. Can you please tell me how to proceed with the purchase? Thank you.';


  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
  }

  shareOnWhatsapp(): any {
    const whatsappLink = this.sanitizer.bypassSecurityTrustUrl('https://wa.me/254723547630?text=' + this.whatsappBookPurchaseMessage);
    return whatsappLink;
  }

}
