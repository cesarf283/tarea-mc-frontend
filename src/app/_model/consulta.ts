import { DetalleConsulta } from './detalleConsulta';
import { Especialidad } from './especialidad';
import { Medico } from './medico';
import { Paciente } from './paciente';

export class Consulta {
    idConsulta: number;
    paciente: Paciente;
    medico: Medico;
    especialidad: Especialidad;
    fecha: string; //2020-09-05T11:30:05 ISODate || moment.js
    numConsultorio: string;
    detalleConsulta: DetalleConsulta[];
}