import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { UserLogin } from './../model/UserLogin';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar() {
    this.authService.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp

      localStorage.setItem('token', this.userLogin.token)
      localStorage.setItem('nome', this.userLogin.nome)
      localStorage.setItem('id', this.userLogin.id.toString())
      localStorage.setItem('foto', this.userLogin.foto)

      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.id = this.userLogin.id

      this.router.navigate(['/home'])
    }, erro => {
      if (erro.status == 401){
        Swal.fire({
          icon: 'error',
          title: 'E-mail ou senha incorretos!',
        });
      }
    })
  }

}
