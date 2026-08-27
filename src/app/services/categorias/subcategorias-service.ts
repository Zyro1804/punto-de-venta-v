import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';

@Service()
export class SubcategoriasService {

	private http = inject(HttpClient);
	private readonly subcategoriaUrl = `${environment.url}/subcategorias`;

	obtenerSubcategorias(){
		return this.http.get<any>(`${this.subcategoriaUrl}/obtener_todas_las_subcategorias`);
	}

	crearSubcategoria(payload: any){
		return this.http.post<any>(`${this.subcategoriaUrl}/crear`, payload);
	}

	eliminarSubcategoria(id: string){
		return this.http.delete<any>(`${this.subcategoriaUrl}/eliminar/${id}`);
	}
}
