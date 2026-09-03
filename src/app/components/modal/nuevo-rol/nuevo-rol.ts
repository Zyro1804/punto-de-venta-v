import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { InputTextModule } from '@openng/optimus-ui/inputtext';

@Component({
  imports: [ButtonModule,DialogModule,FormsModule, InputTextModule],
  selector: 'app-nuevo-rol',
  styleUrl: './nuevo-rol.css',
  templateUrl: './nuevo-rol.html',
})
export class NuevoRol {
  @Input() rolInicial: any | null = null;
  @Input() modoEdicion = false;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<any>();

  rol = {
    name:'',
    description:''
  }

  ngOnInit() {
    if (this.rolInicial) {
      this.rol = {
        name: this.rolInicial.name ?? this.rolInicial.nombre ?? '',
        description: this.rolInicial.description ?? this.rolInicial.descripcion ?? '',
      };
    }
  }


   guardarRol() {
    this.guardar.emit({ ...this.rol, id: this.rolInicial?.id });
  }

  cerrarDialog() {

    this.cerrar.emit();

  }
}
