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
      'http://localhost:8080/usuarios/logar',
      userLogin
    );
  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>(
      'http://localhost:8080/usuarios/cadastrar',
      user
    );
  }

  putUser(user: User): Observable<User> {
    this.refreshToken()
    return this.http.put<User>('http://localhost:8080/usuarios/atualizar', user, this.token)
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

    if (localStorage.getItem('token') != '') {
      ok = true
    }

    return ok
  }

  getUserById(id: number): Observable<User> {
    this.refreshToken()
    return this.http.get<User>(`http://localhost:8080/usuarios/${id}`, this.token)
  }

}
