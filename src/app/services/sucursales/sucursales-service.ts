import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface SucursalPayload {
  nombre: string;
  numero_sucursal: number;
  ubicacion: string;
  encargado_de_tienda: string;
}

@Injectable({
  providedIn: 'root',
})
export class SucursalesService {
  private readonly http = inject(HttpClient);
  private readonly sucursalesUrl = `${environment.url}/sucursal`;

  obtenerSucursales() {
    return this.http.get<any>(`${this.sucursalesUrl}/obtener_todas_las_sucursales`);
  }

  crearSucursal(payload: SucursalPayload) {
    return this.http.post<any>(`${this.sucursalesUrl}/crear`, payload);
  }

  actualizarSucursal(id: string | number, payload: SucursalPayload) {
    return this.http.put<any>(`${this.sucursalesUrl}/actualizar/${id}`, payload);
  }

  eliminarSucursal(id: string | number) {
    return this.http.delete<any>(`${this.sucursalesUrl}/eliminar/${id}`);
  }
}
