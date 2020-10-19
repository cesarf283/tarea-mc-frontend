import { Component, OnInit } from '@angular/core';
import { Menu } from './_model/menu';
import { LoginService } from './_service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  menus: Menu[];

  constructor(
    public loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.getMenuCambio().subscribe(data => {
      this.menus = data;
    });
  }

}
