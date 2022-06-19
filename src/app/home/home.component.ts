import { Quiz } from './../model/Quiz';
import { QuizService } from './../service/quiz.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nome: string
  listaQuiz: Quiz[]

  constructor(
    private router: Router,
    private quizService: QuizService
  ) {}

  ngOnInit() {

    this.findAllQuiz()

    // if (environment.token == ''){
    //   alert('Sua sessão expirou, faça o login novamente.')
    //   this.router.navigate(['/login'])
    // }
    if (localStorage.getItem('token') == '' || localStorage.getItem('token') == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seu token expirou. Faça o login novamente!',
      })
      this.router.navigate(['/login'])
    }

  }

  onImgError(event: any){
    event.target.src = '../../assets/img/img_erro2.png'
   }

  findAllQuiz() {
    this.quizService.getAllQuiz().subscribe((resp: Quiz[]) =>{
      this.listaQuiz = resp
    } )
  }

  findQuizByNome() {
    this.quizService.getQuizByNome(this.nome).subscribe((resp: Quiz[])=>{
      this.listaQuiz = resp
    })
  }

}
