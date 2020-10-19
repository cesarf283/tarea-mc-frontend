import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../_service/login.service';
import { MenuService } from './../../_service/menu.service';
import '../../../assets/login-animation.js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  clave: string;
  mensaje: string;
  error: string;

  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  iniciarSesion() {
    this.loginService.login(this.usuario, this.clave).subscribe(data => {
      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

      const helper = new JwtHelperService();

      let decodedToken = helper.decodeToken(data.access_token);      

      this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
        this.loginService.setMenuCambio(data);
        this.router.navigate(['paciente']);
      });
      
    });
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }

}
