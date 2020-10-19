import { Paciente } from './paciente';

export class Signo{
  idSigno : number;
  paciente: Paciente;
  fecha: string; //2020-09-05T11:30:05 ISODate || moment.js
  temperatura: string;
  pulso: string;
  ritmoRespiratorio: string;
}