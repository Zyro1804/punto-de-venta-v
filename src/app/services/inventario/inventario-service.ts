import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { InventarioItem, PaginatedResponse } from '../../interfaces/inventario';

@Injectable({ providedIn: 'root' })
export class InventarioService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.url}/inventario`;

  obtenerInventario(
    page: number,
    limit: number,
    sucursalId: string | number | null,
    productoId: string | number | null,
  ) {
    let params = new HttpParams().set('page', page).set('limit', limit);

    if (sucursalId !== null && sucursalId !== undefined && sucursalId !== '') {
      params = params.set('sucursalId', sucursalId);
    }
    if (productoId !== null && productoId !== undefined && productoId !== '') {
      params = params.set('productoId', productoId);
    }

    return this.http.get<PaginatedResponse<InventarioItem>>(this.url, { params });
  }
}
