import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from '@openng/optimus-ui/button';
import { ConfirmDialogModule } from '@openng/optimus-ui/confirmdialog';
import { IconFieldModule } from '@openng/optimus-ui/iconfield';
import { InputIconModule } from '@openng/optimus-ui/inputicon';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TableModule } from '@openng/optimus-ui/table';
import { MarcaService } from '../../../../services/marca/marca-service';
import { firstValueFrom } from 'rxjs';
import { NuevaMarca } from '../../../../components/modal/nueva-marca/nueva-marca';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';

export interface Marca{
  id:string;
  nombre:string;
  descripcion:string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}
@Component({
  imports: [ButtonModule,TableModule, InputIconModule, IconFieldModule, InputTextModule, ConfirmDialogModule, NuevaMarca],
  selector: 'app-marcas',
  styleUrl: './marcas.css',
  templateUrl: './marcas.html',
})
export class Marcas {
  marca = signal<Marca[]>([]);
  loading = signal(true);
  abrirModal : boolean = false
  marcaEnEdicion: Marca | null = null;

  private readonly marcasService= inject(MarcaService)
  private readonly messageService = inject(MessageService)
  private confirmationService = inject(ConfirmationService)

   ngOnInit(): void {
    this.getMarcas()
  }

  async getMarcas(){
    try{
      const resp = await firstValueFrom(this.marcasService.obtenerMarcas())
      console.log('todas ,las marcas',resp)
      this.marca.set(resp.data)
      this.loading.set(false)
    }catch(err:any){

    }
  }

  onAgregar(){
    this.marcaEnEdicion = null;
    this.abrirModal=true
  }

  editarMarca(marca: Marca) {
    this.marcaEnEdicion = marca;
    this.abrirModal = true;
  }

  verMarca(producto: any) {}

  async eliminarMarca(marca: any, event : Event) {
    this.confirmationService.confirm({
    target: event.target as EventTarget,
    message: `¿Deseas eliminar la marca "${marca.nombre}"?`,
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
          this.marcasService.eliminarMarca(marca.id)
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Marca eliminado',
          detail: resp.message
        });
        this.getMarcas();
      } catch (err: any) {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.error?.message || 'No se pudo eliminar el proveedor'
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

  async crearMarca(event:any){
    console.log(event)
    try{
      const resp = event.id
        ? await firstValueFrom(this.marcasService.actualizarMarca(event.id, event))
        : await firstValueFrom(this.marcasService.crearMarca(event));
       this.messageService.add({
         severity: 'success',
         summary: event.id ? 'Marca actualizada' : 'Marca agregada',
         detail: resp.message
       });
      console.log(resp)
      this.getMarcas();
      this.abrirModal = false;
      this.marcaEnEdicion = null;
    }catch(err:any){
       this.messageService.add({ severity: 'warn', summary: 'Marcas', detail: err.error.message});
    }
  }
}
