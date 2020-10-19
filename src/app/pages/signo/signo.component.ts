import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Signo } from 'src/app/_model/signo';
import { SignoService } from 'src/app/_service/signo.service';

@Component({
  selector: 'app-signo',
  templateUrl: './signo.component.html',
  styleUrls: ['./signo.component.css']
})
export class SignoComponent implements OnInit {


  displayedColumns = ['idSigno','idPaciente', 'fecha', 'temperatura','pulso','ritmorespiratorio', 'acciones'];

  dataSource: MatTableDataSource<Signo>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  cantidad: number = 0;

  constructor(
    private signoService : SignoService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.signoService.getSignoCambio().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.signoService.getMensajeCambio().
    subscribe(data => {
      this.snackBar.open(data,'AVISO',{
        duration:2000});
    });

    this.signoService.listarPageable(0,10).subscribe(data => {
      //console.log(data);
      this.cantidad =data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort
    });

  }

  mostrarMas(e:any){
    this.signoService.listarPageable(e.pageIndex,e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;

    })
  }

  filtrar(valor:string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idSigno : number){
    this.signoService.eliminar(idSigno).pipe(switchMap(() => {
      return this.signoService.listar();
    })).subscribe(data =>{
      this.signoService.setSignoCambio(data);
      this.signoService.setMensajecambio('se elimino');
    });
  }

}
