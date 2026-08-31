import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private readonly http = inject(HttpClient);
  private readonly rolesUrl = `${environment.url}/roles`;

  obtenerRoles() {
    return this.http.get<any>(`${this.rolesUrl}/obtener_todos_los_roles`);
  }

  crearRol(payload: { nombre: string; descripcion?: string }) {
    return this.http.post<any>(this.rolesUrl, payload);
  }

  eliminarRol(id: string | number) {
    return this.http.delete<any>(`${this.rolesUrl}/${id}`);
  }
}
