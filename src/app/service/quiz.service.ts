import { Pergunta } from './../model/Pergunta';
import { Observable } from 'rxjs';
import { Quiz } from './../model/Quiz';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))
  }

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))
    }
  }

  getAllQuiz(): Observable<Quiz[]>{
    this.refreshToken()
    return this.http.get<Quiz[]>("https://quizrandom.herokuapp.com/quizzes", this.token)
  }

  getQuizById(id: number): Observable<Quiz> {
    this.refreshToken()
    return this.http.get<Quiz>(`https://quizrandom.herokuapp.com/quizzes/${id}`, this.token)
  }

  getQuizByNome(nome: string): Observable<Quiz[]> {
    this.refreshToken()
    return this.http.get<Quiz[]>(`https://quizrandom.herokuapp.com/quizzes/titulo/${nome}`, this.token)
  }

  putQuiz(quiz: Quiz): Observable<Quiz> {
    this.refreshToken()
    return this.http.put<Quiz>('https://quizrandom.herokuapp.com/quizzes/atualizar', quiz, this.token)
  }

  deleteQuiz(id: number) {
    this.refreshToken()
    return this.http.delete(`https://quizrandom.herokuapp.com/quizzes/${id}`, this.token)
  }

  cadastrarQuiz(quiz: Quiz): Observable<Quiz> {
    this.refreshToken()
    return this.http.post<Quiz>(
      'https://quizrandom.herokuapp.com/quizzes/cadastrar',
      quiz,
      this.token
    );
  }

  cadastrarPergunta(pergunta: Pergunta): Observable<Pergunta> {
    this.refreshToken()
    return this.http.post<Pergunta>(
      'https://quizrandom.herokuapp.com/perguntas/cadastrar',
      pergunta,
      this.token
    );
  }

  putPergunta(pergunta: Pergunta): Observable<Pergunta> {
    this.refreshToken()
    return this.http.put<Pergunta>(
      'https://quizrandom.herokuapp.com/perguntas/atualizar',
      pergunta,
      this.token
    );
  }

}
