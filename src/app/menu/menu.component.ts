import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterContentChecked {

  nome = localStorage.getItem('nome')
  idUser = localStorage.getItem('id')
  foto = localStorage.getItem('foto')

  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  onImgError(event: any){
    event.target.src = '../../assets/img/drake.jpg'
   }

  ngAfterContentChecked() {
    this.nome = localStorage.getItem('nome')
    this.idUser = localStorage.getItem('id')
    this.foto = localStorage.getItem('foto')
  }

  sair() {
    this.router.navigate(['/login'])

    localStorage.setItem('token', '')
    localStorage.setItem('nome', '')
    localStorage.setItem('id', '')
    localStorage.setItem('foto', '')

    environment.token = ''
    environment.nome = ''
    environment.id = 0
  }

}
