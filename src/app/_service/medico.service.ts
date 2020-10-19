import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Medico } from './../_model/medico';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService extends GenericService<Medico>{

  private medicoCambio = new Subject<Medico[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/medicos`
    );
  }

  //get Subjects
  getMedicoCambio() {
    return this.medicoCambio.asObservable();
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  //set Subjects
  setMedicoCambio(medicos: Medico[]) {
    this.medicoCambio.next(medicos);
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}
