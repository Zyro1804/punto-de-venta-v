import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class LoginService {

    private http = inject(HttpClient);
    url = 'localhost'

    logInPost(payload:any){
        return this.http.post(this.url,payload)
    }
}
