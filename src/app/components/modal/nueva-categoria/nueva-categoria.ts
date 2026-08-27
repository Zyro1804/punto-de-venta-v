import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '@openng/optimus-ui/api';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { InputTextModule } from '@openng/optimus-ui/inputtext';

@Component({
  imports: [ButtonModule,DialogModule,FormsModule, InputTextModule],
  selector: 'app-nueva-categoria',
  styleUrl: './nueva-categoria.css',
  templateUrl: './nueva-categoria.html',
})
export class NuevaCategoria {

  private messageService = inject(MessageService)
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<any>();

  categoria ={
    nombre: '',
    descripcion:''
  }


  guardarCategoria() {
  this.guardar.emit(this.categoria);
  }

  cerrarDialog() {
  this.cerrar.emit();

  }
}


