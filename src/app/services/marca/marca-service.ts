import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';

@Service()
export class MarcaService {

    private http = inject(HttpClient);
    url = environment.url
    private readonly marcaUrl = `${this.url}/marcas`

    obtenerMarcas(){
        return this.http.get<any>(`${this.marcaUrl}/obtener_todas_las_marcas`)
    }

    crearMarca(payload:any){
        return this.http.post<any>(`${this.marcaUrl}/crear`,payload)
    }

    actualizarMarca(id:string, payload:any){
        return this.http.put<any>(`${this.marcaUrl}/actualizar/${id}`,payload)
    }

    eliminarMarca(id:string){
        return this.http.delete<any>(`${this.marcaUrl}/eliminar/${id}`)
    }

}
