import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '@openng/optimus-ui/api';
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
  private messageService = inject(MessageService)
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<any>();

  rol = {
    name:'',
    description:''
  }


   guardarRol() {
    this.guardar.emit(this.rol);
  }

  cerrarDialog() {

    this.cerrar.emit();

  }
}
