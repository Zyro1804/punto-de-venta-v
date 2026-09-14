import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MovimientoInventario, PaginatedResponse } from '../../interfaces/inventario';

@Injectable({ providedIn: 'root' })
export class KardexService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.url}/kardex`;

  obtenerKardex(
    page: number,
    limit: number,
    sucursalId: string | number | null,
    productoId: string | number | null,
    desde: string,
    hasta: string,
  ) {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (sucursalId !== null && sucursalId !== undefined && sucursalId !== '') {
      params = params.set('sucursalId', sucursalId);
    }
    if (productoId !== null && productoId !== undefined && productoId !== '') {
      params = params.set('productoId', productoId);
    }
    if (desde) {
      params = params.set('desde', desde);
    }
    if (hasta) {
      params = params.set('hasta', hasta);
    }

    return this.http.get<PaginatedResponse<MovimientoInventario>>(this.url, { params });
  }
}
