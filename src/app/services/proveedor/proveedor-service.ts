import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';

@Service()
export class ProveedorService {

    private http = inject(HttpClient);
    url = environment.url
    private readonly proveedorUlr = `${this.url}/proveedores`

    obtenerProveedores(){
      return  this.http.get<any>(`${this.proveedorUlr}/obtener_todos_proveedores`) 
    }

    postCrearProveedor(payload:any){
        return this.http.post<any>(`${this.proveedorUlr}/crear`,payload)
    }

    actualizarProveedor(id:string, payload:any){
        return this.http.put<any>(`${this.proveedorUlr}/actualizar/${id}`,payload)
    }

    eliminarProducto(id:string){
        return this.http.delete<any>(`${this.proveedorUlr}/eliminar/${id}`)
    }
}
