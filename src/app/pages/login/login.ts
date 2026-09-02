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
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';


@Component({
  imports: [ButtonModule, CardModule, PasswordModule, FormsModule, FloatLabel, InputTextModule, Toast],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  private loginService = inject(LoginService)
  private messageService = inject(MessageService)
  private route = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private authService = inject(AuthService)
  username!:string
  password!:string
  loading = signal(false);
  invalidSesion: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      if (queryParams.get('sessionExpired') !== 'true') return;

      void this.route.navigate([], {
        queryParams: { sessionExpired: null },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      }).then(() => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Sesión expirada',
          detail: 'Vuelve a iniciar sesión para continuar.',
          life: 5000,
        });
      });
    });
  }
 


  async logIn(){
     this.loading.set(true);
    const payload = {
      email : this.username,
      password : this.password
    }
    console.log(payload)
    try{
      this.invalidSesion= false;
      const resp =  await firstValueFrom(this.loginService.logInPost(payload));

      if (resp?.access_token) {
        console.log('Token recibido:', resp.access_token);
        console.log('Datos del token:', this.authService.decodeToken(resp.access_token));
        this.authService.saveToken(resp.access_token);
      }

      
      this.messageService.add({ severity: 'success', summary: 'Autenticacion', detail: resp.message});
      setTimeout(()=>{this.loading.set(false);this.route.navigateByUrl('/home')  },1000)
      
    }catch(err:any){
      console.log(err)
      this.messageService.add({ severity: 'warn', summary: 'Autenticacion', detail: err.error.message});
      this.invalidSesion=true
      this.loading.set(false)
    }
  }

}
