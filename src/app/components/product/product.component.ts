import { SearchService } from './../../services/search.service';
import { CrudService } from './../../services/crud.service';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import * as $ from 'jquery'


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit  {
  @ViewChild('productsContainerRef') productsContainerRef!:ElementRef;
  @ViewChildren('card') card!:QueryList<ElementRef>;
  @ViewChild('displayPattern') displayPattern!:ElementRef
  products:any=[];
  page:any = 1;
  count: number = 0;
  numberOfProductsPerPage: number = 12;


  constructor(private crud:CrudService, private getSearchTerm:SearchService) { }

  //read products
   getAllProducts():any{
      this.crud.getProducts().subscribe(product=>{
         this.products= product
     },
     )
     return this.products
   }

   // Display List or Grid
  gridOrListView(event:any,productContainerName:string,cardName:string){
    this.productsContainerRef.nativeElement.className=productContainerName
    this.card.toArray().forEach((e:ElementRef)=>{
      e.nativeElement.className=cardName
    });
    this.selectedView(event.target)
  }
  selectedView(event:any){
    $(document).ready(function(){
      $(event).attr("data-selected","selected").siblings().removeAttr("data-selected");
    })
  }

  //search
  search(){
    let searchTerm = this.getSearchTerm.getSearchInput();
    if(!searchTerm){
      this.ngOnInit()
    }
    else{
      this.page = 1
      this.crud.getProducts().subscribe(
        (product)=>{
            return this.products = Object.values(product).filter((product:any)=>{
       return product.title.toLowerCase().includes(searchTerm)
    })}
    )}
  }


  //filter
  sortingPriceAscending(a:any,b:any){
    return a.price - b.price
  }

  priceFilterascending(){
    this.page = 1;
    this.products.sort(this.sortingPriceAscending)
  }

  sortingPriceDescending(a:any,b:any){
    return b.price - a.price
  }

  priceFilterdescending(){
    this.page = 1;
    this.products.sort(this.sortingPriceDescending)
  }
  sortingAlphaBet(a:any, b:any){
    let RemoveSymbolsExceptAlphaBets = /[^a-z]/gi;
    let x = a.title.trim().replace(RemoveSymbolsExceptAlphaBets,'').toLowerCase();
    let y = b.title.trim().replace(RemoveSymbolsExceptAlphaBets,'').toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  }
  titleFilter(){
    this.page= 1;
    this.products.sort(this.sortingAlphaBet)
  }
  /*jumbTable:any={
    'ascending' :this.priceFilterascending,
    'descending' : this.priceFilterdescending,
    'AlphaBet' : this.titleFilter
  }*/

 Filter(event:any){
  let FilterType = event.target.value;
  if(FilterType=='ascending'){
    this.priceFilterascending();
   }
   else if(FilterType=='descending'){
    this.priceFilterdescending();
   }
   else if(FilterType=='AlphaBet'){
    this.titleFilter()
   }
 }

 /*Filter(event:any){
    let FilterType = event.target.value;
    console.log(this.jumbTable[FilterType]())
  }*/

  // pagination
  onProductDataChange(event: any) {
    this.page = event;
  }
   // number of products per page
  onViewSizeChange(event: any): void {
    this.numberOfProductsPerPage = event.target.value;

  }


 // our life cycle
  ngOnInit(): void {
    this.getSearchTerm.events$.forEach(() => {this.search()});
    this.getAllProducts();

  }


}
