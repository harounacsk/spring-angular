import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ShareProductService {


  constructor() { }
  private selectedProduct = new BehaviorSubject<Product>({ id: 0, name: '', price: 0 });

  public setProduct(product: Product): void {
    this.selectedProduct.next(product);
  }

  public getProduct(): Observable<Product> {
    return this.selectedProduct.asObservable();
  }
}
