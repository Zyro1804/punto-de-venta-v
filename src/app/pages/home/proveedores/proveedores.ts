import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from '@openng/optimus-ui/button';
import { IconFieldModule } from '@openng/optimus-ui/iconfield';
import { InputIconModule } from '@openng/optimus-ui/inputicon';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TableModule } from '@openng/optimus-ui/table';
import { firstValueFrom } from 'rxjs';
import { ProveedorService } from '../../../services/proveedor/proveedor-service';
import { NuevoProveedor } from '../../../components/modal/nuevo-proveedor/nuevo-proveedor';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';
import { ConfirmDialogModule } from '@openng/optimus-ui/confirmdialog';

export interface Proveedor {
  id: string;
  nombre: string;
  contacto: string;
  telefono: string;
  email: string;
  direccion: string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

@Component({
  imports: [ButtonModule,TableModule, InputIconModule, IconFieldModule, InputTextModule, NuevoProveedor, ConfirmDialogModule],
  selector: 'app-proveedores',
  styleUrl: './proveedores.css',
  templateUrl: './proveedores.html',
})
export class Proveedores implements OnInit{
  
  private proveedorService = inject(ProveedorService)
  private messageService = inject(MessageService)
  private confirmationService = inject(ConfirmationService);
  
  proveedores = signal<Proveedor[]>([]);
   loading = signal(true);
   abrirModal :boolean=false
   proveedoresCargados : boolean=false;


  ngOnInit(): void {
    this.getProveedores()
  }

  async getProveedores(){
    try{
      const resp = await firstValueFrom(this.proveedorService.obtenerProveedores())
      this.proveedores.set(resp.data);
      console.log(resp)
      this.loading.set(false)
    }catch(err:any){
      console.log(err)
    }
  }
  onAgregar(){
    this.abrirModal=true
  }

  editarProducto(producto: any) {
  console.log('Editar:', producto);
}

  verProducto(producto: any) {
    console.log('Ver:', producto);
  }

  async eliminarProveedor(proveedor: any, event : Event) {

  this.confirmationService.confirm({
    target: event.target as EventTarget,
    message: `¿Deseas eliminar al proveedor "${proveedor.nombre}"?`,
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
          this.proveedorService.eliminarProducto(proveedor.id)
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Proveedor eliminado',
          detail: resp.message
        });
        this.getProveedores();
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

  async crearProveedor(event:any){
    console.log(event,'Aqui en padre')
    try{
      const resp= await firstValueFrom(this.proveedorService.postCrearProveedor(event))
      this.messageService.add({ severity: 'success', summary: 'Proveedor agregado', detail: resp.message});
      this.getProveedores()
    }catch(err:any){
      console.log(err)
       this.messageService.add({ severity: 'warn', summary: 'Problemas al agregar', detail: err.error.message});
    }
  }
}
