import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import { CardModule } from '@openng/optimus-ui/card';
import { FloatLabel } from '@openng/optimus-ui/floatlabel';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { PasswordModule } from '@openng/optimus-ui/password';
import { LoginService } from '../../services/login/login-service';
import { firstValueFrom } from 'rxjs';
import { Toast } from '@openng/optimus-ui/toast';
import { MessageService } from '@openng/optimus-ui/api';


@Component({
  imports: [ButtonModule, CardModule, PasswordModule, FormsModule, FloatLabel, InputTextModule, Toast],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  private loginService = inject(LoginService)
  private messageService = inject(MessageService)
  username!:string
  password!:string
  loading = signal(false);
  invalidSesion: boolean = false;
 


  async logIn(){
     this.loading.set(true);
    const payload = {
      username : this.username,
      password : this.password
    }
    try{
      this.invalidSesion= false;
      const resp =  await firstValueFrom(this.loginService.logInPost(payload));
       this.loading.set(false);
      console.log(resp)
    }catch(err){
      console.log(err)
      this.messageService.add({ severity: 'warn', summary: 'Autenticacion', detail: 'Credenciales Invalidas'});
      this.invalidSesion=true
      this.loading.set(false)
    }
  }

}
