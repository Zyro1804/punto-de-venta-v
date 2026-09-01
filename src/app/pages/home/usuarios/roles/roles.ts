import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';
import { firstValueFrom } from 'rxjs';
import { ButtonModule } from '@openng/optimus-ui/button';
import { IconFieldModule } from '@openng/optimus-ui/iconfield';
import { InputIconModule } from '@openng/optimus-ui/inputicon';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TableModule } from '@openng/optimus-ui/table';
import { ConfirmDialogModule } from '@openng/optimus-ui/confirmdialog';
import { RolesService } from '../../../../services/roles/roles-service';
import { NuevoRol } from '../../../../components/modal/nuevo-rol/nuevo-rol';

export interface Rol {
  id?: string | number;
  nombre: string;
  descripcion?: string;
  activo?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface RolNuevo {
    name: string;
  description?: string;
}

@Component({
  imports: [ButtonModule, TableModule, InputIconModule, IconFieldModule, InputTextModule, FormsModule, ConfirmDialogModule, NuevoRol],
  selector: 'app-roles',
  styleUrl: './roles.css',
  templateUrl: './roles.html',
})
export class Roles {
  roles = signal<Rol[]>([]);
  loading = signal(true);
  abrirModal=false;

  private readonly rolesService = inject(RolesService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    this.getRoles();
  }

  async getRoles() {
    try {
      const resp = await firstValueFrom(this.rolesService.obtenerRoles());
      this.roles.set(resp.data ?? resp);
      console.log(resp)
      this.loading.set(false);
    } catch (err: any) {
      this.loading.set(false);
      this.messageService.add({
        severity: 'error',
        summary: 'Roles',
        detail: err?.error?.message || 'No se pudieron cargar los roles',
      });
    }
  }

  
  onAgregar() {
    this.abrirModal = true;
  }


  async crearRol(payload:RolNuevo){
    console.log(payload)
   if (!payload.name.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Nombre requerido',
        detail: 'Escribe el nombre del rol antes de guardar.',
      });
      return;
    }

    try{
      const resp = await firstValueFrom(this.rolesService.crearRol(payload))
      this.messageService.add({ severity: 'success', summary: 'Roles', detail: resp.message || 'Rol creado correctamente' });
      this.abrirModal = false;
      this.getRoles()
    }catch(err:any){
       this.messageService.add({ severity: 'error',summary: 'Rol',detail: err?.error?.message || 'No se pudo guardar el rol',});
    }
  }

  async eliminarRol(rol: Rol, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Deseas eliminar el rol "${rol.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Eliminar',
        severity: 'danger',
      },
      accept: async () => {
        try {
          const resp = await firstValueFrom(this.rolesService.eliminarRol(rol.id ?? ''));
          this.messageService.add({
            severity: 'success',
            summary: 'Rol',
            detail: resp.message || 'Rol eliminado',
          });
          this.getRoles();
        } catch (err: any) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err?.error?.message || 'No se pudo eliminar el rol',
          });
        }
      },
    });
  }
}

