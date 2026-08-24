import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';

@Service()
export class LoginService {

    private http = inject(HttpClient);
    url = environment.url
    private readonly logInUrl = `${this.url}/auth/login`

    logInPost(payload:any){
        return this.http.post<any>(this.logInUrl,payload)
    }
}
