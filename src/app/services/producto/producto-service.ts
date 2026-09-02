import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';

@Service()
export class ProductoService {
    
    private http = inject(HttpClient);
    url = environment.url
    private readonly marcaUrl = `${this.url}/catalogo-productos`

    obtenerProductos(){
        return this.http.get<any>(`${this.marcaUrl}/obtener_todos_los_productos`)
    }

    crearProducto(payload: FormData){
        return this.http.post<any>(`${this.marcaUrl}/crear`, payload)
    }

    actualizarProducto(id: string, payload: FormData){
        return this.http.put<any>(`${this.marcaUrl}/editar/${id}`, payload)
    }

    eliminarProducto(id:string){
        return this.http.delete<any>(`${this.marcaUrl}/eliminar/${id}`)
    }

}
