import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '@openng/optimus-ui/api';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { InputTextModule } from '@openng/optimus-ui/inputtext';

@Component({
  imports: [ButtonModule,DialogModule,FormsModule, InputTextModule],
  selector: 'app-nuevo-proveedor',
  styleUrl: './nuevo-proveedor.css',
  templateUrl: './nuevo-proveedor.html',
})
export class NuevoProveedor {
  private messageService = inject(MessageService)
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<any>();

    proveedor = {
      nombre: '', 
      contacto: '',
      telefono: '',
      email: '', 
      direccion: '',
    };

  guardarProducto() {

     if (
      !this.proveedor.nombre.trim() || !this.proveedor.contacto.trim() || !this.proveedor.telefono.trim() || !this.proveedor.email.trim() ||!this.proveedor.direccion.trim()
      ) {
      this.messageService.add({ severity: 'error', summary: 'Campos Incompletos', detail: 'Rellena todos los datos del proveedor'});
        return;
      }
      if( !/^\d{10}$/.test(this.proveedor.telefono)){
         this.messageService.add({ severity: 'error', summary: 'Campo Numero de Telefono', detail: 'Rellenar el telefono con datos correctos'});
        return;
      }
    this.guardar.emit(this.proveedor);
  }

  cerrarDialog() {

    this.cerrar.emit();

  }
}
