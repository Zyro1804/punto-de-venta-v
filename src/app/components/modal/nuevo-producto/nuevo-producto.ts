import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TextareaModule } from '@openng/optimus-ui/textarea';

@Component({
  imports: [
    FormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TextareaModule
  ],
  selector: 'app-nuevo-producto',
  styleUrl: './nuevo-producto.css',
  templateUrl: './nuevo-producto.html',
})
export class NuevoProducto {
  @Output() cerrar = new EventEmitter<void>();

  @Output() guardar = new EventEmitter<any>();

  producto = {
    nombre: '',
    descripcion: '',
    clave: '',
    codigoBarra: '',
    categoria: '',
    subCategoria: '',
    unidadMedida: '',
    proveedor: '',
    marca: ''
  };

    guardarProducto() {

    console.log(this.producto);

    this.guardar.emit(this.producto);

  }

  cerrarDialog() {

    this.cerrar.emit();

  }
}
