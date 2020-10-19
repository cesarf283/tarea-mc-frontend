import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Signo } from './../_model/signo'
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignoService extends GenericService<Signo> {

private signoCambio = new Subject<Signo[]>();
private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,`${environment.HOST}/signos`
    );
   }

   listarPageable(p: number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }
    ////////////////// get, set ////////////////

    getSignoCambio(){
      return this.signoCambio.asObservable();
    }
  
    setSignoCambio(signos: Signo[]){
      this.signoCambio.next(signos);
    }
  
    getMensajeCambio(){
      return this.mensajeCambio.asObservable();
    }
  
    setMensajecambio(mensaje: string){
      return this.mensajeCambio.next(mensaje);
    }
}
