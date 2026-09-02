import { Component, inject, signal } from '@angular/core';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';
import { firstValueFrom } from 'rxjs';
import { CategoriasService } from '../../../../services/categorias/categorias-service';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { IconFieldModule } from '@openng/optimus-ui/iconfield';
import { InputIconModule } from '@openng/optimus-ui/inputicon';
import { TableModule } from '@openng/optimus-ui/table';
import { ButtonModule } from '@openng/optimus-ui/button';
import { NuevaCategoria } from '../../../../components/modal/nueva-categoria/nueva-categoria';

export interface Categoria{
  id:string,
  nombre:string,
  descripcion:string,
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}
@Component({
  imports: [ButtonModule,TableModule, InputIconModule, IconFieldModule, InputTextModule,NuevaCategoria],
  selector: 'app-categorias',
  styleUrl: './categorias.css',
  templateUrl: './categorias.html',
})
export class Categorias {

  categorias = signal<Categoria[]>([])
  loading = signal(true);
  abrirModal : boolean = false;
  categoriaEnEdicion: Categoria | null = null;

  private readonly categoriasService= inject(CategoriasService)
  private readonly messageService = inject(MessageService)
  private confirmationService = inject(ConfirmationService)

   ngOnInit(): void {
    this.getCategorias()
  }

  async getCategorias(){
      try{
        const resp = await firstValueFrom(this.categoriasService.obtenerCategorias())
        console.log('todas ,las categorias',resp)
        this.categorias.set(resp.data)
        this.loading.set(false)
      }catch(err:any){
  
      }
    }

   onAgregar(){
    this.categoriaEnEdicion = null;
    this.abrirModal=true
  }

  editarCategoria(categoria: Categoria) {
    this.categoriaEnEdicion = categoria;
    this.abrirModal = true;
  }

  verMarca(producto: any) {}

  async eliminarCategoria(categoria: any, event : Event) {
    this.confirmationService.confirm({
    target: event.target as EventTarget,
    message: `¿Deseas eliminar la categoria "${categoria.nombre}"?`,
    header: 'Confirmar eliminación',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'Cancelar',
    rejectButtonProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true
    },
    acceptButtonProps: {
      label: 'Eliminar',
      severity: 'danger'
    },
    accept: async () => {
      try {
        const resp = await firstValueFrom(
          this.categoriasService.eliminarCategoria(categoria.id)
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Marca eliminado',
          detail: resp.message
        });
        this.getCategorias();
      } catch (err: any) {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.error?.message || 'No se pudo eliminar el categoria'
        });
      }
    },
    reject: () => {
      this.messageService.add({
        severity: 'info',
        summary: 'Cancelado',
        detail: 'La eliminación fue cancelada'
      });

    }
  });
  }

  async crearCategoria(event:any){
    console.log(event)
    try{
      const resp = event.id
        ? await firstValueFrom(this.categoriasService.actualizarCategoria(event.id, event))
        : await firstValueFrom(this.categoriasService.crearCategoria(event));
       this.messageService.add({
         severity: 'success',
         summary: event.id ? 'Categoria actualizada' : 'Categoria agregada',
         detail: resp.message
       });
      console.log(resp)
      this.getCategorias();
      this.abrirModal = false;
      this.categoriaEnEdicion = null;
    }catch(err:any){
       this.messageService.add({ severity: 'error', summary: 'Categoria', detail: 'Error al guardar Categoria'});

    }
  }
  
}
