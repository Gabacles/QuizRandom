import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../model/User';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css'],
})
export class EditUsuarioComponent implements OnInit {
  idUser: number;
  usuario: User = new User();
  confirmarSenha: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('token') == '' || localStorage.getItem('token') == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seu token expirou. Faça o login novamente!',
      });
      this.router.navigate(['/login']);
    }

    this.idUser = this.route.snapshot.params['id'];
    this.findUserById(this.idUser);
  }

  findUserById(id: number) {
    this.authService.getUserById(id).subscribe((resp: User) => {
      this.usuario = resp;
    });
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  atualizar() {
    if (this.usuario.senha != this.confirmarSenha) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'As senhas não são iguais!',
      });
    } else {
      delete this.usuario.quiz;
      this.authService.putUser(this.usuario).subscribe((resp: User) => {
        this.usuario = resp;
        Swal.fire('Usuário atualizado com sucesso!', 'Por favor, faça o login novamente.', 'success');
        localStorage.setItem('token', '');
        localStorage.setItem('nome', '');
        localStorage.setItem('id', '');
        localStorage.setItem('foto', '');
        this.router.navigate(['/login']);
      });
    }
  }
}
