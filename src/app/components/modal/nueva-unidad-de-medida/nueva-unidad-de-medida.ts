import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { InputTextModule } from '@openng/optimus-ui/inputtext';

@Component({
  imports: [ButtonModule, DialogModule, FormsModule, InputTextModule],
  selector: 'app-nueva-unidad-de-medida',
  styleUrl: './nueva-unidad-de-medida.css',
  templateUrl: './nueva-unidad-de-medida.html',
})
export class NuevaUnidadDeMedida {
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<{ nombre: string; abreviatura: string }>();

  unidad = { nombre: '', abreviatura: '' };

  guardarUnidad() { this.guardar.emit(this.unidad); }
  cerrarDialog() { this.cerrar.emit(); }
}
