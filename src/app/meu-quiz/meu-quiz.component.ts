import { QuizService } from './../service/quiz.service';
import { User } from './../model/User';
import { AuthService } from './../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meu-quiz',
  templateUrl: './meu-quiz.component.html',
  styleUrls: ['./meu-quiz.component.css']
})
export class MeuQuizComponent implements OnInit {
  usuario: User = new User()
  idUser: number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private quizService: QuizService
    ) { }

  ngOnInit() {
    if (localStorage.getItem('token') == ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seu token expirou. Faça o login novamente!',
      })
      this.router.navigate(['/login'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findUserById(this.idUser)

  }

  onImgError(event: any){
    event.target.src = '../../assets/img/img_erro2.png'
   }

  findUserById(id: number) {
    this.authService.getUserById(id).subscribe((resp: User)=> {
      this.usuario = resp
    })
  }

  deleteButton(id: number) {
    Swal.fire({
      title: 'Tem certeza que deseja excluir este quiz?',
      text:'Isso não pode ser desfeito!',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.delete(id)
        Swal.fire('Quiz excluído!', '', 'success')
      }
    })
  }

  delete(id: number) {
    this.quizService.deleteQuiz(id).subscribe(()=>{
      Swal.fire(
        'Quiz excluído!',
        '',
        'success'
      )
      location.reload()
    })
  }

}
