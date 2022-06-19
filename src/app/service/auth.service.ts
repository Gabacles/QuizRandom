import { UserLogin } from './../model/UserLogin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))
  }

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))
    }
  }

  entrar(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(
      'https://quizrandom.herokuapp.com/usuarios/logar',
      userLogin
    );
  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>(
      'https://quizrandom.herokuapp.com/usuarios/cadastrar',
      user
    );
  }

  putUser(user: User): Observable<User> {
    this.refreshToken()
    return this.http.put<User>('https://quizrandom.herokuapp.com/usuarios/atualizar', user, this.token)
  }

  // logado() {
  //   let ok = false

  //   if (environment.token != '') {
  //     ok = true
  //   }

  //   return ok
  // }

  logado() {
    let ok = false

    if (localStorage.getItem('token') != '' && localStorage.getItem('token') != null) {
      ok = true
    }

    return ok
  }

  getUserById(id: number): Observable<User> {
    this.refreshToken()
    return this.http.get<User>(`https://quizrandom.herokuapp.com/usuarios/${id}`, this.token)
  }

}
