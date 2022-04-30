import { ProductModel } from './../model/product-model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private httpClient: HttpClient) { }

  // read product data
  getProducts(){
   return this.httpClient.get<ProductModel[]>(environment.productsApiUrl + '/products')
  }
}
