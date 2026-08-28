import { Component, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ButtonModule } from '@openng/optimus-ui/button';
import { ConfirmDialogModule } from '@openng/optimus-ui/confirmdialog';
import { IconFieldModule } from '@openng/optimus-ui/iconfield';
import { InputIconModule } from '@openng/optimus-ui/inputicon';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TableModule } from '@openng/optimus-ui/table';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';
import { UnidadMedidaService } from '../../../../services/unidad-medida/unidad-medida-service';
import { NuevaUnidadDeMedida } from '../../../../components/modal/nueva-unidad-de-medida/nueva-unidad-de-medida';

export interface UnidadDeMedida {
  id: string;
  nombre: string;
  abreviatura: string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

@Component({
  imports: [ButtonModule, TableModule, InputIconModule, IconFieldModule, InputTextModule, ConfirmDialogModule, NuevaUnidadDeMedida],
  selector: 'app-unidad-de-medida',
  styleUrl: './unidad-de-medida.css',
  templateUrl: './unidad-de-medida.html',
})
export class UnidadDeMedida {
  unidades = signal<UnidadDeMedida[]>([]);
  loading = signal(true);
  abrirModal = false;

  private readonly unidadMedidaService = inject(UnidadMedidaService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    this.getUnidades();
  }

  async getUnidades() {
    try {
      const resp = await firstValueFrom(this.unidadMedidaService.obtenerUnidadesDeMedida());
      this.unidades.set(resp.data);
    } catch (err) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las unidades de medida' });
    } finally {
      this.loading.set(false);
    }
  }

  onAgregar() {
    this.abrirModal = true;
  }

  editarUnidad(unidad: UnidadDeMedida) {}

  async eliminarUnidad(unidad: UnidadDeMedida, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Deseas eliminar la unidad "${unidad.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Eliminar', severity: 'danger' },
      accept: async () => {
        try {
          const resp = await firstValueFrom(this.unidadMedidaService.eliminarUnidadDeMedida(unidad.id));
          this.messageService.add({ severity: 'success', summary: 'Unidad de medida', detail: resp.message });
          await this.getUnidades();
        } catch (err: any) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'No se pudo eliminar la unidad de medida' });
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

  async crearUnidad(event: { nombre: string; abreviatura: string }) {
    try {
      const resp = await firstValueFrom(this.unidadMedidaService.crearUnidadDeMedida(event));
      this.messageService.add({ severity: 'success', summary: 'Unidad de medida', detail: resp.message });
      this.abrirModal = false;
      await this.getUnidades();
    } catch (err: any) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'No se pudo guardar la unidad de medida' });
    }
  }
}
