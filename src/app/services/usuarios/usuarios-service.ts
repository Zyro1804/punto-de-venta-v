import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private readonly http = inject(HttpClient);
  private readonly usuariosUrl = `${environment.url}/usuarios`;

  obtenerUsuarios() {
    return this.http.get<any>(this.usuariosUrl);
  }

  crearUsuario(payload: any) {
    return this.http.post<any>(this.usuariosUrl, payload);
  }

  eliminarUsuario(id: string | number) {
    return this.http.delete<any>(`${this.usuariosUrl}/${id}`);
  }
}
