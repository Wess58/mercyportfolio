import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  whatsappBookPurchaseMessage = 'Hello, I am interested in buying your book. I saw your website and got redirected to this WhatsApp chat. Your book (Kingdom Encounter Workbook) sounds amazing and I\'m excited to read it. Can you please tell me how to proceed with the purchase? Thank you.';
  whatsappDevotionalBookPurchaseMessage = 'Hello, I am interested in buying your book. I saw your website and got redirected to this WhatsApp chat. Your book (30 DAY DEVOTIONAL FOR THE WORKING WOMAN) sounds amazing and I\'m excited to read it. Can you please tell me how to proceed with the purchase? Thank you.';


  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
  }

  shareOnWhatsapp(bookType:string): any {
    const whatsappLink = this.sanitizer.bypassSecurityTrustUrl('https://wa.me/254723547630?text=' + (bookType === 'devotional' ? this.whatsappDevotionalBookPurchaseMessage : this.whatsappBookPurchaseMessage));
    return whatsappLink;
  }

}
