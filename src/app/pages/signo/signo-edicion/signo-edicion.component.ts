import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Paciente } from 'src/app/_model/paciente';
import { Signo } from 'src/app/_model/signo';
import { PacienteService } from 'src/app/_service/paciente.service';
import { SignoService } from '../../../_service/signo.service';
import * as moment from 'moment';


@Component({
  selector: 'app-signo-edicion',
  templateUrl: './signo-edicion.component.html',
  styleUrls: ['./signo-edicion.component.css']
})
export class SignoEdicionComponent implements OnInit {

  form:FormGroup;
  id: number;
  edicion: boolean;
  pacientes$: Observable<Paciente[]>;
  maxFecha: Date = new Date();
  pacienteSeleccionado: Paciente;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private signoService: SignoService,
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {

    this.pacientes$ = this.pacienteService.listar();
    this.form= new FormGroup({
      id: new FormControl(0),
      'idpaciente': new FormControl('',Validators.required),
      'fecha': new FormControl('',Validators.required),
      'temperatura': new FormControl(''),
      'pulso': new FormControl(''),
      'ritmorespiratorio' : new FormControl('')
    });

    this.route.params.subscribe((data: Params) => {
      this.id =data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });
  }

  get f(){return this.form.controls;}

private initForm(){
 if (this.edicion){
  
  this.signoService.listarPorId(this.id).subscribe(data =>{
    //console.log(data);
    this.form = new FormGroup({
    'id': new FormControl(data.idSigno),
    'idpaciente' : new FormControl(data.paciente.idPaciente),
    'fecha': new FormControl(data.fecha),
    'temperatura': new FormControl(data.temperatura),
    'pulso': new FormControl(data.pulso),
    'ritmorespiratorio': new FormControl(data.ritmoRespiratorio)
    });
  });
 }
}


cambieFecha(e: any) {
  //console.log(e);
}

operar(){
  if (this.form.invalid){return;}

  let signo  = new Signo();
  signo.idSigno = this.form.value['id'];
  let paciente = new Paciente();
  paciente.idPaciente = this.form.value['idpaciente'];
  signo.paciente = paciente;

  signo.fecha = moment(this.form.value['fecha']).format('YYYY-MM-DDTHH:mm:ss');
  signo.temperatura = this.form.value['temperatura'];
  signo.pulso = this.form.value['pulso'];
  signo.ritmoRespiratorio = this.form.value['ritmorespiratorio'];

  

  if(this.edicion){
    //console.log('modificar');
    //console.log(signo);
    this.signoService.modificar(signo).pipe(switchMap(()=> {
      return this.signoService.listar();
    })).subscribe(data =>{
      this.signoService.setSignoCambio(data);
      this.signoService.setMensajecambio('SE MODIFICO');
    });
  } else {
    //console.log('registrar');
    //console.log(signo);
    /*
    this.signoService.registrar(signo).pipe(switchMap(() => {
      return this.signoService.listar();
    })).subscribe(data =>{
        this.signoService.setSignoCambio(data);
        this.signoService.setMensajecambio('SE REGISTRÓ');
      });
    */
   this.signoService.registrar(signo).subscribe(() => {
    this.signoService.listar().subscribe(data => {
      this.signoService.setSignoCambio(data);
      this.signoService.setMensajecambio('SE REGISTRÓ');
    });
  });
  }
    this.router.navigate(['signo']);
  }

  mostrarPaciente(val: Paciente) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  seleccionarPaciente(e: any) {
    this.pacienteSeleccionado = e.option.value;
  }

}
