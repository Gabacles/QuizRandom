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
  cor = '#ffffff';
  cor2 = '#ffffff';
  cor3 = '#ffffff';
  cor4 = '#ffffff';
  finaliza: boolean = false;
  questoes = 0;
  acertos = 0;
  quiz: Quiz = new Quiz();
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

    if (
      localStorage.getItem('token') == '' ||
      localStorage.getItem('token') == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seu token expirou. Faça o login novamente!',
      });
      this.router.navigate(['/login']);
    }

    let id = this.route.snapshot.params['id'];
    this.findQuizById(id);
  }

  onImgError(event: any) {
    event.target.src = '../../assets/img/img_erro2.png';
  }

  findQuizById(id: number) {
    this.quizService.getQuizById(id).subscribe((resp: any) => {
      this.quiz = resp;
      this.questoes = this.quiz.pergunta.length++;
    });
  }

  proximaPergunta(correta: number) {
    if (this.perguntaApresentada < this.questoes - 1) {
      this.resposta(correta);
      let intervalo = setInterval(() => {
        this.cor = '#ffffff';
        this.cor2 = '#ffffff';
        this.cor3 = '#ffffff';
        this.cor4 = '#ffffff';
        this.perguntaApresentada++;
        clearInterval(intervalo);
      }, 600);
    } else if (this.perguntaApresentada == this.questoes - 1) {
      this.finalizar(correta);
    }
  }

  resposta(correta: number) {
    if (this.quiz.pergunta[this.perguntaApresentada].correta === correta) {
      this.acertos++;
      if (correta == 1) {
        this.cor = '#00FF7F';
      } else if (correta == 2) {
        this.cor2 = '#00FF7F';
      } else if (correta == 3) {
        this.cor3 = '#00FF7F';
      } else if (correta == 4) {
        this.cor4 = '#00FF7F';
      }
    } else {
      if (correta == 1) {
        this.cor = '#FF6347';
      } if (correta == 2) {
        this.cor2 = '#FF6347';
      } if (correta == 3) {
        this.cor3 = '#FF6347';
      } if (correta == 4) {
        this.cor4 = '#FF6347';
      }

      if (this.quiz.pergunta[this.perguntaApresentada].correta == 1) {
        this.cor = '#00FF7F';
      } else if (this.quiz.pergunta[this.perguntaApresentada].correta == 2) {
        this.cor2 = '#00FF7F';
      } else if (this.quiz.pergunta[this.perguntaApresentada].correta == 3) {
        this.cor3 = '#00FF7F';
      } else if (this.quiz.pergunta[this.perguntaApresentada].correta == 4) {
        this.cor4 = '#00FF7F';
      }

    }
  }

  finalizar(correta: number) {
    this.resposta(correta);
    let intervalo = setInterval(() => {
      this.finaliza = true;
      clearInterval(intervalo);
    }, 800);
  }

  jogarNovamente() {
    location.reload()
  }
}
