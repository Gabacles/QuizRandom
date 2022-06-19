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
    return this.http.get<Quiz[]>("http://localhost:8080/quizzes", this.token)
  }

  getQuizById(id: number): Observable<Quiz> {
    this.refreshToken()
    return this.http.get<Quiz>(`http://localhost:8080/quizzes/${id}`, this.token)
  }

  getQuizByNome(nome: string): Observable<Quiz[]> {
    this.refreshToken()
    return this.http.get<Quiz[]>(`http://localhost:8080/quizzes/titulo/${nome}`, this.token)
  }

  putQuiz(quiz: Quiz): Observable<Quiz> {
    this.refreshToken()
    return this.http.put<Quiz>('http://localhost:8080/quizzes/atualizar', quiz, this.token)
  }

  deleteQuiz(id: number) {
    this.refreshToken()
    return this.http.delete(`http://localhost:8080/quizzes/${id}`, this.token)
  }

  cadastrarQuiz(quiz: Quiz): Observable<Quiz> {
    this.refreshToken()
    return this.http.post<Quiz>(
      'http://localhost:8080/quizzes/cadastrar',
      quiz,
      this.token
    );
  }

  cadastrarPergunta(pergunta: Pergunta): Observable<Pergunta> {
    this.refreshToken()
    return this.http.post<Pergunta>(
      'http://localhost:8080/perguntas/cadastrar',
      pergunta,
      this.token
    );
  }

  putPergunta(pergunta: Pergunta): Observable<Pergunta> {
    this.refreshToken()
    return this.http.put<Pergunta>(
      'http://localhost:8080/perguntas/atualizar',
      pergunta,
      this.token
    );
  }

}
