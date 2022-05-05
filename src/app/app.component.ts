import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'EcommerceApp';
  //@ViewChild('ArrowUpIcon',{static:true}) ArrowUpIcon!:ElementRef
  constructor(private router: Router) { }

  // scroll back
  displayScrollBackArrow(){
    $(window).scroll(function(){
      let scroll = $(this).scrollTop();
      if( scroll! > 400) { $(".scrollBack").fadeIn();}
      else{$(".scrollBack").fadeOut();}
  });
  }

  scrollBack(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
});
}
  ngOnInit() {
  this.displayScrollBackArrow()

}

}
