import { QuizService } from './../service/quiz.service';
import { Quiz } from './../model/Quiz';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jogar',
  templateUrl: './jogar.component.html',
  styleUrls: ['./jogar.component.css'],
})
export class JogarComponent implements OnInit {
  finaliza = false
  correta: string;
  fimQuiz = false;
  questoes = 0;
  acertos = 0;
  quiz: Quiz;
  perguntaApresentada = 0;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.route.params.subscribe((obj: any) => {
    //   this.idQuiz = obj.id;
    // });

    if (localStorage.getItem('token') == '' || localStorage.getItem('token') == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seu token expirou. Faça o login novamente!',
      })
      this.router.navigate(['/login'])
    }

    let id = this.route.snapshot.params['id']
    this.findQuizById(id);
  }

  onImgError(event: any){
    event.target.src = '../../assets/img/img_erro2.png'
   }

  findQuizById(id: number) {
    this.quizService.getQuizById(id).subscribe((resp: any) => {
      this.quiz = resp;
      this.questoes = this.quiz.pergunta.length++;
    });
  }

  proximaPergunta() {
    if (this.validaCampos() == false) {
      console.log(this.perguntaApresentada < this.questoes);
      if (this.perguntaApresentada < this.questoes) {
        this.resposta();
        this.perguntaApresentada++;
      }
      if (this.perguntaApresentada == this.questoes - 1) {
        console.log('entrou no elseif');
        this.fimQuiz = true;
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Escolha uma opção!',
      })
    }
  }

  validaCampos() {
    let vazio = false;
    if (this.correta == undefined || this.correta == '') {
      vazio = true;
      return vazio;
    } else {
      return vazio;
    }
  }

  resposta() {
    if (
      this.quiz.pergunta[this.perguntaApresentada].correta ===
      parseInt(this.correta)
    ) {
      this.acertos++;
    }
  }

  finalizar() {
    if (this.validaCampos() == false) {
      this.resposta();
      this.finaliza = true
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Escolha uma opção!',
      })
    }
  }
}
