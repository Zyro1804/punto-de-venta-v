import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { MessageService } from '@openng/optimus-ui/api';
import { SelectModule } from '@openng/optimus-ui/select';
import { firstValueFrom } from 'rxjs';
import { CatalogoOption, EntradaPayload } from '../../../interfaces/inventario';
import { EntradasService } from '../../../services/inventario/entradas-service';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
  imports: [ButtonModule, DialogModule, FormsModule, SelectModule],
  selector: 'app-nueva-entrada',
  styleUrl: './nueva-entrada.css',
  templateUrl: './nueva-entrada.html',
})
export class NuevaEntrada {
  @Input() productos: CatalogoOption[] = [];
  @Input() sucursales: CatalogoOption[] = [];
  @Input() user: any;
  @Output() cerrar = new EventEmitter<void>();
  @Output() registrada = new EventEmitter<void>();

  productoId: string | number | null = null;
  sucursalId: string | number | null = null;
  cantidad: number | null = null;
  lote = '';
  fechaCaducidad = '';
  observaciones = '';
  saving = false;
  error = '';

  private readonly service = inject(EntradasService);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  async guardar(): Promise<void> {
    if (!this.productoId || !this.sucursalId || !this.cantidad || this.cantidad <= 0 || !this.lote.trim()) {
      this.error = 'Completa producto, sucursal, cantidad mayor que cero y lote.';
      return;
    }

    this.saving = true;
    this.error = '';
    const payload: EntradaPayload = {
      productoId: this.productoId,
      sucursalId: this.sucursalId,
      usuarioId: this.user,
      cantidad: this.cantidad,
      lote: this.lote.trim(),
      ...(this.fechaCaducidad ? { fechaCaducidad: this.fechaCaducidad } : {}),
      ...(this.observaciones.trim() ? { observaciones: this.observaciones.trim() } : {}),
    };

    try {
      const response = await firstValueFrom(this.service.registrarEntrada(payload));
      this.messageService.add({ severity: 'success', summary: 'Entrada', detail: response?.message || 'Entrada registrada correctamente.' });
      this.registrada.emit();
      this.cerrar.emit();
    } catch (err: any) {
      this.error = err?.error?.message || 'No se pudo registrar la entrada.';
    } finally {
      this.saving = false;
    }
  }

  cerrarDialog(): void {
    if (!this.saving) this.cerrar.emit();
  }

}
