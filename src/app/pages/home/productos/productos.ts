import { Component, inject } from '@angular/core';
import { ButtonModule } from '@openng/optimus-ui/button';
import { IconFieldModule } from '@openng/optimus-ui/iconfield';
import { InputIconModule } from '@openng/optimus-ui/inputicon';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TableModule } from '@openng/optimus-ui/table';
import { NuevoProducto } from '../../../components/modal/nuevo-producto/nuevo-producto';
import { MessageService } from '@openng/optimus-ui/api';

@Component({
  imports: [ButtonModule, TableModule, InputIconModule, IconFieldModule, InputTextModule, NuevoProducto],
  selector: 'app-productos',
  styleUrl: './productos.css',
  templateUrl: './productos.html',
})
export class Productos {

  private messageService = inject(MessageService)
  loading: boolean = false;
  abrirModal : boolean=false;
productos = [
  {
    id: 1,
    nombre: 'Coca Cola 600ml',
    descripcion: 'Refresco de cola 600ml',
    codigoBarra: '7501055300070',
    categoria: 'Bebidas',
    subCategoria: 'Refrescos',
    unidadMedida: 'Pieza',
    proveedor: 'Coca Cola FEMSA'
  },
  {
    id: 2,
    nombre: 'Sabritas Originales',
    descripcion: 'Papas fritas 45g',
    codigoBarra: '7501011111111',
    categoria: 'Botanas',
    subCategoria: 'Papas',
    unidadMedida: 'Pieza',
    proveedor: 'Sabritas'
  }
];

editarProducto(producto: any) {
  console.log('Editar:', producto);
}

verProducto(producto: any) {
  console.log('Ver:', producto);
}

eliminarProducto(producto: any) {
  console.log('Eliminar:', producto);
}

onAgregar(){
   this.abrirModal=true
}

cerrarNuevoProducto() {
    this.abrirModal = false;
  }

   guardarProducto(producto: any) {

    console.log('Producto recibido:', producto);

    this.abrirModal = false;

     this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Producto agregado corecctamente'});

    // Aquí después:
    // this.productoService.crear(producto)

  }
}
