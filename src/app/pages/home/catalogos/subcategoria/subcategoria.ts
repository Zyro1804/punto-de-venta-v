import { Component, inject, signal } from '@angular/core';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';
import { finalize, firstValueFrom } from 'rxjs';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { IconFieldModule } from '@openng/optimus-ui/iconfield';
import { InputIconModule } from '@openng/optimus-ui/inputicon';
import { TableModule } from '@openng/optimus-ui/table';
import { ButtonModule } from '@openng/optimus-ui/button';
import { NuevaSubcategoria } from '../../../../components/modal/nueva-subcategoria/nueva-subcategoria';
import { SubcategoriasService } from '../../../../services/categorias/subcategorias-service';
import { CategoriasService } from '../../../../services/categorias/categorias-service';

export interface SubcategoriaItem {
  id: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

@Component({
  imports: [ButtonModule, TableModule, InputIconModule, IconFieldModule, InputTextModule, NuevaSubcategoria],
  selector: 'app-subcategoria',
  styleUrl: './subcategoria.css',
  templateUrl: './subcategoria.html',
})
export class Subcategoria {

  subcategorias = signal<SubcategoriaItem[]>([]);
  loading = signal(true);
  abrirModal = false;
  categoriasDatos:any;
  loadingCategorias = signal(false);

  private readonly subcategoriasService = inject(SubcategoriasService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly categoriasService= inject(CategoriasService)
  ngOnInit(): void {
    this.getSubcategorias();
  }

  async getSubcategorias(){
    try {
      const resp = await firstValueFrom(this.subcategoriasService.obtenerSubcategorias());
      this.subcategorias.set(resp.data);
    } catch (err) {
      console.error(err);
      this.messageService.add({ severity: 'error', summary: 'Subcategoría', detail: 'No se pudieron cargar las subcategorías' });
    } finally {
      this.loading.set(false);
    }
  }

  async onAgregar(){
    this.loadingCategorias.set(true);
    try{
      this.categoriasDatos= await firstValueFrom(this.categoriasService.obtenerCategorias())
      this.abrirModal = true;
    }catch{
     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error en modulo de agregar subcategoria'});
    }finally{
       this.loadingCategorias.set(false);
    }
    
  }

  editarSubcategoria(subcategoria: SubcategoriaItem) {}

  async eliminarSubcategoria(subcategoria: SubcategoriaItem, event: Event){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Deseas eliminar la subcategoría "${subcategoria.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Eliminar', severity: 'danger' },
      accept: async () => {
        try {
          const resp = await firstValueFrom(this.subcategoriasService.eliminarSubcategoria(subcategoria.id));
          this.messageService.add({ severity: 'success', summary: 'Subcategoría', detail: resp.message });
          this.getSubcategorias();
        } catch (err: any) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'No se pudo eliminar la subcategoría' });
        }
      },
      reject: () => this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'La eliminación fue cancelada' })
    });
  }

  async crearSubcategoria(event: any){
    console.log(event)
    try {
      const resp = await firstValueFrom(this.subcategoriasService.crearSubcategoria(event));
      this.messageService.add({ severity: 'success', summary: 'Subcategoría', detail: resp.message });
      this.getSubcategorias();
      this.abrirModal = false;
    } catch (err) {
      this.messageService.add({ severity: 'error', summary: 'Subcategoría', detail: 'Error al guardar la subcategoría' });
    }
  }
}
