import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from '@openng/optimus-ui/button';
import { IconFieldModule } from '@openng/optimus-ui/iconfield';
import { InputIconModule } from '@openng/optimus-ui/inputicon';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TableModule } from '@openng/optimus-ui/table';
import { NuevoProducto } from '../../../../components/modal/nuevo-producto/nuevo-producto';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';
import { firstValueFrom } from 'rxjs';
import { CategoriasService } from '../../../../services/categorias/categorias-service';
import { SubcategoriasService } from '../../../../services/categorias/subcategorias-service';
import { UnidadMedidaService } from '../../../../services/unidad-medida/unidad-medida-service';
import { ProveedorService } from '../../../../services/proveedor/proveedor-service';
import { MarcaService } from '../../../../services/marca/marca-service';
import { ProductoService } from '../../../../services/producto/producto-service';

export interface Producto {
  id?: string;
  nombre: string;
  clave?: string;
  codigoBarra?: string;
  precio?: string | number;
  tamano?: string | number;
  categoria?: {
    id?: string;
    nombre?: string;
  };
  subCategoria?: {
    id?: string;
    nombre?: string;
  };
  unidadMedida?: {
    id?: string;
    nombre?: string;
  };
  proveedor?: {
    id?: string;
    nombre?: string;
  };
  marca?: {
    id?: string;
    nombre?: string;
  };
  activo?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

@Component({
  imports: [ButtonModule, TableModule, InputIconModule, IconFieldModule, InputTextModule, NuevoProducto],
  selector: 'app-productos',
  styleUrl: './productos.css',
  templateUrl: './productos.html',
})
export class Productos {

  private messageService = inject(MessageService)
  private categoriasService = inject(CategoriasService)
  private subcategoriasSerivice = inject(SubcategoriasService)
  private unidadMedidaService = inject(UnidadMedidaService)
  private proveedoresService = inject(ProveedorService)
  private marcaService = inject(MarcaService)
  private productosService = inject(ProductoService)
  private readonly confirmationService = inject(ConfirmationService);
  loading = signal(true)
  abrirModal : boolean=false; 
  loadingTipos = signal(false);
  productos = signal<Producto[]>([])
  categorias:any;
  subcategorias:any;
  unidadesDeMedida:any;
  proveedores:any;
  marcas:any;

editarProducto(producto: any) {
  console.log('Editar:', producto);
}

verProducto(producto: any, event: Event) {
  console.log('Ver:', producto);
}

eliminarProducto(producto: any, event: Event) {
  this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Deseas eliminar la subcategoría "${producto.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Eliminar', severity: 'danger' },
      accept: async () => {
        try {
          const resp = await firstValueFrom(this.productosService.eliminarProducto(producto.id));
          this.messageService.add({ severity: 'success', summary: 'Producto', detail: resp.message });
          this.getSubcategorias();
        } catch (err: any) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'No se pudo elimina' });
        }
      },
      reject: () => this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'La eliminación fue cancelada' })
    });
}

ngOnInit(): void {
  this.obtenerProductos()
}

async obtenerProductos(){
  try{
    const resp = await firstValueFrom( this.productosService.obtenerProductos())
    this.productos.set(Array.isArray(resp.data) ? resp.data : [])
    console.log(resp)
  } finally {
    this.loading.set(false);
  }

}

async onAgregar(){
  
  this.loadingTipos.set(true)
  const categoriasOk = await this.getCategorias()
  if(!categoriasOk){ return}

  const subcategoriasOk = await this.getSubcategorias()
  if(!subcategoriasOk){return}

  const unidadesOk = await this.getUnidadDeMedida()
  if(!unidadesOk){return}

  const proveedorOk = await this.getProveedor()
  if(!proveedorOk){return}

  const marcasOk = await this.getMarcas()
  if(!marcasOk){return}
  
  this.loadingTipos.set(false)
  this.abrirModal=true
}

async getCategorias(){
  try{
    const resp= await firstValueFrom(this.categoriasService.obtenerCategorias())
    this.categorias=resp.data
    console.log(this.categorias)
    return true
  }catch(err:any){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error en modulo de agregar Producto: obtener categorias'});
    this.loadingTipos.set(false)
    return false
  }
}

async getSubcategorias(){
  try{
    const resp= await firstValueFrom(this.subcategoriasSerivice.obtenerSubcategorias())
    this.subcategorias=resp.data
    return true
  }catch(err:any){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error en modulo de agregar Producto: obtener subcategorias'});
    this.loadingTipos.set(false)
    return false
  }
}

async getUnidadDeMedida(){
  try{
    const resp = await firstValueFrom(this.unidadMedidaService.obtenerUnidadesDeMedida())
    this.unidadesDeMedida=resp.data
    return true
  }catch(err:any){
   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error en modulo de agregar Producto: obtener unidad de medida'});
  this.loadingTipos.set(false)
  return false
  }
}

async getProveedor(){
  try{
    const resp = await firstValueFrom(this.proveedoresService.obtenerProveedores())
    this.proveedores = resp.data
    return true
  }catch(err:any){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error en modulo de agregar Producto: obtener proveedores'});
    this.loadingTipos.set(false)
    return false
  }
}

async getMarcas(){
  try{
    const resp = await firstValueFrom(this.marcaService.obtenerMarcas())
    this.marcas = resp.data
    return true
  }catch(err:any){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error en modulo de agregar Producto: obtener marcas'});
    this.loadingTipos.set(false)
    return false
  }
}

  cerrarNuevoProducto() {
    this.abrirModal = false;
  }

  async guardarProducto(producto: any) {
      const productoEnviar = {
        ...producto,
        precio: producto.precio?.toString(),
        tamano: producto.tamano?.toString()
      };
    console.log('Producto recibido:', producto);

    try{
      const resp = await firstValueFrom(this.productosService.crearProducto(productoEnviar))
      this.messageService.add({ severity: 'success', summary: 'Productos', detail: resp.message });
      this.obtenerProductos()
      this.abrirModal = false;
    }catch(err:any){
      this.messageService.add({ severity: 'error', summary: 'Productos', detail: 'Error al guardar los productos' });
    }
  }

}

