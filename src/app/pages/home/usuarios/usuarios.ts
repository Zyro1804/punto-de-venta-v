import { Component, inject, signal } from '@angular/core';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';
import { firstValueFrom } from 'rxjs';
import { ButtonModule } from '@openng/optimus-ui/button';
import { IconFieldModule } from '@openng/optimus-ui/iconfield';
import { InputIconModule } from '@openng/optimus-ui/inputicon';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TableModule } from '@openng/optimus-ui/table';
import { ConfirmDialogModule } from '@openng/optimus-ui/confirmdialog';
import { NuevoUsuario } from '../../../components/modal/nuevo-usuario/nuevo-usuario';
import { UsuariosService } from '../../../services/usuarios/usuarios-service';
import { RolesService } from '../../../services/roles/roles-service';

export interface Usuario {
  id?: string;
  nombre: string;
  email: string;
  rol: string;
  password?: string;
  activo?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

@Component({
  imports: [
    ButtonModule,
    TableModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    NuevoUsuario,
    ConfirmDialogModule,
  ],
  selector: 'app-usuarios',
  styleUrl: './usuarios.css',
  templateUrl: './usuarios.html',
})
export class Usuarios {
  usuarios = signal<Usuario[]>([]);
  roles = signal<any[]>([]);
  loading = signal(true);
  abrirModal = false;

  private readonly usuariosService = inject(UsuariosService);
  private readonly rolesService = inject(RolesService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    this.getRoles();
    this.getUsuarios();
  }

  async getRoles() {
    try {
      const resp = await firstValueFrom(this.rolesService.obtenerRoles());
      this.roles.set(resp.data ?? resp);
    } catch (err: any) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Roles',
        detail: err?.error?.message || 'No se pudieron cargar los roles',
      });
    }
  }

  async getUsuarios() {
    try {
      const resp = await firstValueFrom(this.usuariosService.obtenerUsuarios());
      this.usuarios.set(resp.data ?? resp);
      this.loading.set(false);
    } catch (err: any) {
      this.loading.set(false);
      this.messageService.add({
        severity: 'error',
        summary: 'Usuarios',
        detail: err?.error?.message || 'No se pudieron cargar los usuarios',
      });
    }
  }

  onAgregar() {
    this.abrirModal = true;
  }

  async crearUsuario(event: any) {
    try {
      const payload = {
        nombre: event.nombre,
        email: event.email,
        rol: event.rol,
        roleId: event.roleId ?? event.rolId,
        rolId: event.rolId ?? event.roleId,
        password: event.password,
      };

      const resp = await firstValueFrom(this.usuariosService.crearUsuario(payload));
      this.messageService.add({ severity: 'success', summary: 'Usuario', detail: resp.message || 'Usuario guardado correctamente' });
      this.abrirModal = false;
      this.getUsuarios();
    } catch (err: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Usuario',
        detail: err?.error?.message || 'No se pudo guardar el usuario',
      });
    }
  }

  async eliminarUsuario(usuario: Usuario, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Deseas eliminar al usuario "${usuario.nombre}"?`,
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
          const resp = await firstValueFrom(this.usuariosService.eliminarUsuario(usuario.id ?? ''));
          this.messageService.add({ severity: 'success', summary: 'Usuario', detail: resp.message || 'Usuario eliminado' });
          this.getUsuarios();
        } catch (err: any) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err?.error?.message || 'No se pudo eliminar el usuario',
          });
        }
      },
    });
  }
}


