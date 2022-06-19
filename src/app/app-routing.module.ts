import { EditUsuarioComponent } from './edit/edit-usuario/edit-usuario.component';
import { EditQuizComponent } from './edit/edit-quiz/edit-quiz.component';
import { MeuQuizComponent } from './meu-quiz/meu-quiz.component';
import { JogarComponent } from './jogar/jogar.component';
import { CadastroQuizComponent } from './cadastro-quiz/cadastro-quiz.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar', component: CadastroComponent },
  { path: 'cadastrar-quiz', component: CadastroQuizComponent },
  { path: 'jogar/:id', component: JogarComponent },
  { path: 'meu-quiz/:id', component: MeuQuizComponent },
  { path: 'editar-quiz/:id', component: EditQuizComponent },
  { path: 'editar-usuario/:id', component: EditUsuarioComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
