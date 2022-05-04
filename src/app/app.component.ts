import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'EcommerceApp';
  @ViewChild('ArrowUpIcon',{static:true}) ArrowUpIcon!:ElementRef
  constructor(private router: Router) { }
  displayScrollBackArrow(){
    if(window.scrollY== 300){
      this.ArrowUpIcon.nativeElement.style.display='block'
    }
    else{
      this.ArrowUpIcon.nativeElement.style.display='none'
    }
  }

  scrollBack(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
});  }
  ngOnInit() {
  this.displayScrollBackArrow()

}

}
