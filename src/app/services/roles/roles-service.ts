import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RolNuevo } from '../../pages/home/usuarios/roles/roles';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private readonly http = inject(HttpClient);
  private readonly rolesUrl = `${environment.url}/roles`;

  obtenerRoles() {
    return this.http.get<any>(`${this.rolesUrl}/obtener_todos_los_roles`);
  }

  crearRol(payload: RolNuevo ) {
    return this.http.post<any>(`${this.rolesUrl}/crear`, payload);
  }

  actualizarRol(id: string | number, payload: RolNuevo) {
    return this.http.put<any>(`${this.rolesUrl}/actualizar/${id}`, payload);
  }

  eliminarRol(id: string | number) {
    return this.http.delete<any>(`${this.rolesUrl}/${id}`);
  }
}
