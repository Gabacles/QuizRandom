import { User } from './User';
import { Pergunta } from './Pergunta';
export class Quiz {

  public id:number
  public titulo:string
  public foto:string
  public pergunta: Pergunta[]
  public usuario: User

}
