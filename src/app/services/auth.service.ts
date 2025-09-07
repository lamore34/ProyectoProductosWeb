import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 #service = inject(HttpClient);
 
   private readonly _url: string = `${environment.apiUrl}/login`

   loginUser(usuario: string, clave: string): Observable<LoginResponse> {
     return this.#service.post<LoginResponse>(this._url, {usuario, clave});
   }
}
