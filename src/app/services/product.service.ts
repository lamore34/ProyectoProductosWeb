import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProductAdd, ProductGet, ProductUpdate } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  #service = inject(HttpClient);

  private readonly _url: string = `${environment.apiUrl}/producto`

  getProducts(): Observable<ProductGet[]>{
    return this.#service.get<ProductGet[]>(this._url);
  }

  getProduct(id: number): Observable<ProductGet> {
    return this.#service.get<ProductGet>(`${this._url}/${id}`);
  }

  createProduct(producto: ProductAdd): Observable<ProductGet> {
    return this.#service.post<ProductGet>(this._url, producto);
  }

  updateProduct(id: number, producto: ProductUpdate): Observable<ProductGet> {
    return this.#service.put<ProductGet>(`${this._url}/${id}`, producto);
  }

  deleteProduct(id: number): Observable<void> {
    return this.#service.delete<void>(`${this._url}/${id}`);
  }

}
