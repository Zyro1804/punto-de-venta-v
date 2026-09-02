import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';

@Service()
export class UnidadMedidaService {
	private readonly http = inject(HttpClient);
	private readonly unidadMedidaUrl = `${environment.url}/unidades-medida`;

	obtenerUnidadesDeMedida() {
		return this.http.get<any>(`${this.unidadMedidaUrl}/obtener_todas_las_unidades_de_medida`);
	}

	crearUnidadDeMedida(payload: any) {
		return this.http.post<any>(`${this.unidadMedidaUrl}/crear`, payload);
	}

	actualizarUnidadDeMedida(id: string, payload: any) {
		return this.http.put<any>(`${this.unidadMedidaUrl}/actualizar/${id}`, payload);
	}

	eliminarUnidadDeMedida(id: string) {
		return this.http.delete<any>(`${this.unidadMedidaUrl}/eliminar/${id}`);
	}
}
