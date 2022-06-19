import { Pergunta } from './../../model/Pergunta';
import { Quiz } from './../../model/Quiz';
import { QuizService } from './../../service/quiz.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent implements OnInit {
  quiz: Quiz = new Quiz()
  pergunta: Pergunta = new Pergunta()
  perguntas: Pergunta[] = []
  idQuiz: number
  idUser = parseInt(localStorage.getItem('id'), 10)

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

    this.idQuiz = this.route.snapshot.params['id']
    this.findQuizById(this.idQuiz)
  }

  findQuizById(id: number) {
    this.quizService.getQuizById(id).subscribe((resp: Quiz)=>{
      this.quiz = resp
    })
  }

  atualizar() {
    // this.quiz.id = this.idQuiz
    // this.quiz.usuario.id = this.idUser
    if (this.correta()) {
      this.perguntas = this.quiz.pergunta
      delete this.quiz.pergunta
      this.quizService.putQuiz(this.quiz).subscribe((resp: Quiz)=>{
        this.quiz = resp
        this.atualizarPerguntas()
        Swal.fire(
          'Quiz atualizado!',
          'Todas as alterações já foram implementadas.',
          'success'
        )
        this.router.navigate([`/meu-quiz/${this.idUser}`])
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'O campo Resposta Correta deve conter um número de 1 a 4!',
      })
    }
  }

  atualizarPerguntas() {
    for(let item in this.perguntas) {
      this.perguntas[item].quiz = this.quiz
      this.quizService.putPergunta(this.perguntas[item]).subscribe((resp: Pergunta)=>{
        this.pergunta = resp
      })
    }
  }

  correta() {
    let ok = true
    for(let item in this.quiz.pergunta) {
      if (this.quiz.pergunta[item].correta > 4 || this.quiz.pergunta[item].correta < 1) {
        ok = false
        return ok
      }
    }
    return ok
  }

}
