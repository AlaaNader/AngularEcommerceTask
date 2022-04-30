import { SearchService } from './../../services/search.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchTerm',{static:true}) searchTerm!:ElementRef
  constructor(private SearchServices:SearchService ) {}

  // set search term
  search(){this.SearchServices.newEvent(this.SearchServices.setSearchInput(this.searchTerm.nativeElement.value));}
  ngOnInit(): void {
  }


}
