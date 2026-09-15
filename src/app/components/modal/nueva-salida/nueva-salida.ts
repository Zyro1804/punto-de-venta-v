import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { MessageService } from '@openng/optimus-ui/api';
import { SelectModule } from '@openng/optimus-ui/select';
import { firstValueFrom } from 'rxjs';
import { CatalogoOption, SalidaPayload } from '../../../interfaces/inventario';
import { SalidasService } from '../../../services/inventario/salidas-service';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
  imports: [ButtonModule, DialogModule, FormsModule, SelectModule],
  selector: 'app-nueva-salida',
  styleUrl: './nueva-salida.css',
  templateUrl: './nueva-salida.html',
})
export class NuevaSalida {
  @Input() productos: CatalogoOption[] = [];
  @Input() sucursales: CatalogoOption[] = [];
  @Input() user : any;
  @Output() cerrar = new EventEmitter<void>();
  @Output() registrada = new EventEmitter<unknown[]>();

  productoId: string | number | null = null;
  sucursalId: string | number | null = null;
  cantidad: number | null = null;
  observaciones = '';
  saving = false;
  error = '';

  private readonly service = inject(SalidasService);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  async guardar(): Promise<void> {
    if (!this.productoId || !this.sucursalId || !this.cantidad || this.cantidad <= 0) {
      this.error = 'Completa producto, sucursal y una cantidad mayor que cero.';
      return;
    }

    this.saving = true;
    this.error = '';
    const payload: SalidaPayload = {
      productoId: this.productoId,
      sucursalId: this.sucursalId,
      usuarioId: this.user,
      cantidad: this.cantidad,
      ...(this.observaciones.trim() ? { observaciones: this.observaciones.trim() } : {}),
    };

    try {
      const response = await firstValueFrom(this.service.registrarSalida(payload));
      const body = response as any;
      this.messageService.add({
        severity: 'success',
        summary: 'Salida',
        detail: body.message || 'Salida registrada correctamente.',
      });
      this.registrada.emit(body.lotesUtilizados ?? (Array.isArray(body.data) ? body.data : []));
      this.cerrar.emit();
    } catch (err: any) {
      this.error =
        err?.error?.message || 'No se pudo registrar la salida. Verifica el stock disponible.';
    } finally {
      this.saving = false;
    }
  }

  cerrarDialog(): void {
    if (!this.saving) this.cerrar.emit();
  }

}
