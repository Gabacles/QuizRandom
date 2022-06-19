import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { User } from './../model/User';
import { Quiz } from './../model/Quiz';
import { Pergunta } from './../model/Pergunta';
import { QuizService } from './../service/quiz.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
// import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastro-quiz',
  templateUrl: './cadastro-quiz.component.html',
  styleUrls: ['./cadastro-quiz.component.css'],
})
export class CadastroQuizComponent implements OnInit {

  quizTeste: Quiz;
  usuario: User;
  ok = false;
  contador = 1;
  correta: string;
  quiz: Quiz = new Quiz();
  cadastroPerguntas: Pergunta[] = [];
  // pergunta: Pergunta = new Pergunta(); resetar caso o outro de errado
  perguntaOk: Pergunta = new Pergunta();
  pergunta: Pergunta = {id: 0, pergunta: '', resposta1: '', resposta2: '', resposta3: '', resposta4: '', correta: 0, foto: '', quiz: new Quiz}
  // formulario: FormGroup;

  constructor(
    private quizService: QuizService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('token') == '' || localStorage.getItem('token') == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seu token expirou. Faça o login novamente!',
      })
      this.router.navigate(['/login'])
    }
  }

  cadastrarQuiz() {
    if (this.quiz.titulo == undefined || this.quiz.foto == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha os campos!',
      })
    } else {
      this.ok = true;
      let id = localStorage.getItem('id');
      if (id != null) {
        let idNumber = parseInt(id);
        this.findUserById(idNumber);
      }
    }
  }

  cadastrarPergunta() {
    if (this.campoVazio()) {
      Swal.fire({
        icon: 'error',
        title: 'Erro...',
        text: 'Todos os campos devem estar preenchidos.',
      })
    } else {
      this.respostaCorreta();
      this.cadastroPerguntas.push(this.pergunta);
      this.contador = this.cadastroPerguntas.length + 1;
      this.pergunta = {id: 0, pergunta: '', resposta1: '', resposta2: '', resposta3: '', resposta4: '', correta: 0, foto: '', quiz: new Quiz}
      console.log(this.cadastroPerguntas)
    }
  }

  respostaCorreta() {
    if (this.correta == 'opcao1') {
      this.pergunta.correta = 1;
    }
    if (this.correta == 'opcao2') {
      this.pergunta.correta = 2;
    }
    if (this.correta == 'opcao3') {
      this.pergunta.correta = 3;
    }
    if (this.correta == 'opcao4') {
      this.pergunta.correta = 4;
    }
  }

  campoVazio() {
    let vazio = false;
    if (
      this.pergunta.pergunta == '' ||
      this.pergunta.foto == '' ||
      this.pergunta.resposta1 == '' ||
      this.pergunta.resposta2 == '' ||
      this.pergunta.resposta3 == '' ||
      this.pergunta.resposta4 == '' ||
      this.correta == ''
    ) {
      vazio = true;
      return vazio;
    } else {
      return vazio;
    }
  }

  quantidadeMinima() {
    if(this.contador < 5) {
      Swal.fire({
        icon: 'info',
        title: 'Atenção!',
        text: 'Só será possível finalizar o quiz quando possuir ao menos 4 perguntas!',
      })
    }
  }

  findUserById(id: number) {
    this.authService.getUserById(id).subscribe((resp: any) => {
      this.quiz.usuario = resp;
    });
  }

  findQuizById(id: number) {
    this.quizService.getQuizById(id).subscribe((resp: any) => {
      this.quizTeste = resp;
      environment.quizId = this.quizTeste.id;
    });
  }

  salvar() {
    this.quizService.cadastrarQuiz(this.quiz).subscribe((resp: Quiz) => {
      this.quiz = resp;
      localStorage.setItem('idQuiz', this.quiz.id.toString());
      environment.quizId = this.quiz.id
      this.salvarPerguntas()
      Swal.fire(
        'Quiz criado!',
        'Você já terá acesso ao seu quiz na página principal.',
        'success'
      )
      this.router.navigate(['/home'])
    });

  }

  salvarPerguntas() {

    for (let pergunta in this.cadastroPerguntas) {


      delete this.cadastroPerguntas[pergunta].id;
      this.perguntaOk = this.cadastroPerguntas[pergunta];
      this.perguntaOk.quiz = {
        id: environment.quizId,
        titulo: '',
        foto: '',
        pergunta: null,
        usuario: null,
      };
      this.quizService
        .cadastrarPergunta(this.perguntaOk)
        .subscribe((resposta: Pergunta) => {
          this.perguntaOk = resposta;
        });
    }
  }
}
