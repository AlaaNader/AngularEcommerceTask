import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
 searchInput!:[]
 private _subject = new Subject<any>();

  constructor() { }
  // add event to add search onkey for product view
  newEvent(event:any) {
    this._subject.next(event);
  }

  // listen event
  get events$ () {
    return this._subject.asObservable();
  }

  // search component passes the Term to product component
  setSearchInput(data:any){
    return this.searchInput = data
  }

  // product component recieves the Term to search component
  getSearchInput(){
    return this.searchInput
  }


  }
