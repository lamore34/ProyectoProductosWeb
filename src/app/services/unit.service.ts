import { inject, Injectable } from '@angular/core';
import { Unit } from '../models/unit.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  #service = inject(HttpClient);

  private readonly _url: string = `${environment.apiUrl}/unidadMedida`
  
    getUnits(): Observable<Unit[]>{
      return this.#service.get<Unit[]>(this._url);    
    }
}
