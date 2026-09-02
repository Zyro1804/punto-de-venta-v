import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';

@Service()
export class CategoriasService {

    private http = inject(HttpClient);
    url = environment.url
    private readonly categoriaUrl = `${this.url}/categorias`

    obtenerCategorias(){
        return this.http.get<any>(`${this.categoriaUrl}/obtener_todas_las_categorias`)
    }

    crearCategoria(payload:any){
        return this.http.post<any>(`${this.categoriaUrl}/crear`,payload)
    }

    actualizarCategoria(id:string, payload:any){
        return this.http.put<any>(`${this.categoriaUrl}/actualizar/${id}`,payload)
    }

    eliminarCategoria(id:string){
        return this.http.delete<any>(`${this.categoriaUrl}/eliminar/${id}`)
    }
}
