import { Component, OnInit,AfterViewInit } from '@angular/core';
import { style, state, animate, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(600, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {

  animateAfterViewInit = false;

  constructor() { }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateAfterViewInit = true;
    }, 200);
  }


}
