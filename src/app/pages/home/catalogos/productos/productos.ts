import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from '@openng/optimus-ui/button';
import { IconFieldModule } from '@openng/optimus-ui/iconfield';
import { InputIconModule } from '@openng/optimus-ui/inputicon';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TableModule } from '@openng/optimus-ui/table';
import { NuevoProducto } from '../../../../components/modal/nuevo-producto/nuevo-producto';
import { MessageService } from '@openng/optimus-ui/api';
import { firstValueFrom } from 'rxjs';
import { CategoriasService } from '../../../../services/categorias/categorias-service';
import { SubcategoriasService } from '../../../../services/categorias/subcategorias-service';
import { UnidadMedidaService } from '../../../../services/unidad-medida/unidad-medida-service';
import { ProveedorService } from '../../../../services/proveedor/proveedor-service';
import { MarcaService } from '../../../../services/marca/marca-service';

export interface Producto{
  nombre:string
  clave:string
  codigoBarra:string
  precio:number
  categoria:{
    categoriaId:string
    nombre:string
  }
  subcategoria:{
    subcategoriaId:string
    nombre:string
  }
  unidadMedida:{
    unidadMedidaId:string
    nombre:string
  }
  proveedor:{
    proveedorId:string
    nombre:string
  }
  marca:{
    marcaId:string
    nombre:string
  }
  activo: boolean;
  createdAt: string;
  updatedAt: string;
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
  loading: boolean = false;
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

verProducto(producto: any) {
  console.log('Ver:', producto);
}

eliminarProducto(producto: any) {
  console.log('Eliminar:', producto);
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

   guardarProducto(producto: any) {

    console.log('Producto recibido:', producto);

    this.abrirModal = false;

     this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Producto agregado corecctamente'});

    // Aquí después:
    // this.productoService.crear(producto)

  }
}
