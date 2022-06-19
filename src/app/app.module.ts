import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'; // imports para o angular não dar problemas com rotas externas

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CadastroQuizComponent } from './cadastro-quiz/cadastro-quiz.component';
import { JogarComponent } from './jogar/jogar.component';
import { RodapeComponent } from './rodape/rodape.component';
import { MeuQuizComponent } from './meu-quiz/meu-quiz.component';
import { EditQuizComponent } from './edit/edit-quiz/edit-quiz.component';
import { EditUsuarioComponent } from './edit/edit-usuario/edit-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    CadastroComponent,
    CadastroQuizComponent,
    JogarComponent,
    RodapeComponent,
    MeuQuizComponent,
    EditQuizComponent,
    EditUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
