import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeIframe'
})
export class SanitizeIframePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: any): any {
    return value = this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
