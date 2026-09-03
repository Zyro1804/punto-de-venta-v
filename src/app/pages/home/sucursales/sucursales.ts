import { Component, inject, signal } from '@angular/core';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';
import { firstValueFrom } from 'rxjs';
import { ButtonModule } from '@openng/optimus-ui/button';
import { ConfirmDialogModule } from '@openng/optimus-ui/confirmdialog';
import { IconFieldModule } from '@openng/optimus-ui/iconfield';
import { InputIconModule } from '@openng/optimus-ui/inputicon';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TableModule } from '@openng/optimus-ui/table';
import { NuevaSucursal } from '../../../components/modal/nueva-sucursal/nueva-sucursal';
import { UsuariosService } from '../../../services/usuarios/usuarios-service';
import { SucursalPayload, SucursalesService } from '../../../services/sucursales/sucursales-service';

export interface Sucursal extends SucursalPayload {
  id?: string | number;
  encargado?: { id: string; name?: string; nombre?: string };
}

@Component({
  imports: [ButtonModule, ConfirmDialogModule, IconFieldModule, InputIconModule, InputTextModule, TableModule, NuevaSucursal],
  selector: 'app-sucursales',
  styleUrl: './sucursales.css',
  templateUrl: './sucursales.html',
})
export class Sucursales {
  sucursales = signal<Sucursal[]>([]);
  usuarios = signal<any[]>([]);
  loading = signal(true);
  loadingAgregar = signal(false);
  abrirModal = false;
  sucursalEnEdicion: Sucursal | null = null;

  private readonly sucursalesService = inject(SucursalesService);
  private readonly usuariosService = inject(UsuariosService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    this.getSucursales();
  }

  async getSucursales(): Promise<void> {
    try {
      const resp = await firstValueFrom(this.sucursalesService.obtenerSucursales());
      console.log(resp)
      this.sucursales.set(resp.data);
    } catch (err: any) {
      this.messageService.add({ severity: 'error', summary: 'Sucursales', detail: err?.error?.message || 'No se pudieron cargar las sucursales' });
    } finally {
      this.loading.set(false);
    }
  }

  async onAgregar(): Promise<void> {
    this.loadingAgregar.set(true);
    try {
      const resp = await firstValueFrom(this.usuariosService.obtenerUsuarios());
      this.usuarios.set(resp.data ?? resp);
      this.sucursalEnEdicion = null;
      this.abrirModal = true;
    } catch (err: any) {
      this.messageService.add({ severity: 'error', summary: 'Usuarios', detail: err?.error?.message || 'No se pudieron cargar los usuarios' });
    } finally {
      this.loadingAgregar.set(false);
    }
  }

  async editarSucursal(sucursal: Sucursal): Promise<void> {
    await this.onAgregar();
    this.sucursalEnEdicion = sucursal;
  }

  async guardarSucursal(payload: SucursalPayload & { id?: string | number }): Promise<void> {
    if (!payload.nombre.trim() || !payload.ubicacion.trim() || !payload.encargado_de_tienda || payload.numero_sucursal < 1) {
      this.messageService.add({ severity: 'error', summary: 'Datos incompletos', detail: 'Completa todos los datos de la sucursal.' });
      return;
    }

    try {
      const resp = payload.id
        ? await firstValueFrom(this.sucursalesService.actualizarSucursal(payload.id, payload))
        : await firstValueFrom(this.sucursalesService.crearSucursal(payload));
      this.messageService.add({ severity: 'success', summary: 'Sucursal', detail: resp.message || 'Sucursal guardada correctamente' });
      this.abrirModal = false;
      this.sucursalEnEdicion = null;
      await this.getSucursales();
    } catch (err: any) {
      this.messageService.add({ severity: 'error', summary: 'Sucursal', detail: err?.error?.message || 'No se pudo guardar la sucursal' });
    }
  }

  eliminarSucursal(sucursal: Sucursal, event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Deseas eliminar la sucursal "${sucursal.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Eliminar', severity: 'danger' },
      accept: async () => {
        try {
          const resp = await firstValueFrom(this.sucursalesService.eliminarSucursal(sucursal.id ?? ''));
          this.messageService.add({ severity: 'success', summary: 'Sucursal', detail: resp.message || 'Sucursal eliminada' });
          await this.getSucursales();
        } catch (err: any) {
          this.messageService.add({ severity: 'error', summary: 'Sucursal', detail: err?.error?.message || 'No se pudo eliminar la sucursal' });
        }
      },
    });
  }
}
