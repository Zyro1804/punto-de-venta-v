import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() unidadInicial: any | null = null;
  @Input() modoEdicion = false;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<{ nombre: string; abreviatura: string }>();

  unidad = { nombre: '', abreviatura: '' };

  ngOnInit() {
    if (this.unidadInicial) {
      this.unidad = {
        nombre: this.unidadInicial.nombre ?? '',
        abreviatura: this.unidadInicial.abreviatura ?? ''
      };
    }
  }

  guardarUnidad() { this.guardar.emit({ ...this.unidad, id: this.unidadInicial?.id } as any); }
  cerrarDialog() { this.cerrar.emit(); }
}
