import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private producturl = 'http://localhost:8345/product/';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Product[]> {

    return this.http.get<Product[]>(`${this.producturl}all`);
  }


  public save(product: Product): Observable<string> {
    return this.http.post(`${this.producturl}add`, product, { responseType: 'text' });
  }

  public delete(id: number): Observable<string> {
    return this.http.delete(`${this.producturl}delete/${id}`, { responseType: 'text' });
  }

  public update(product: Product): Observable<string> {
    return this.http.put(`${this.producturl}update`, product, { responseType: 'text' });
  }
}
