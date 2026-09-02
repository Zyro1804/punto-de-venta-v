import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '@openng/optimus-ui/api';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { InputTextModule } from '@openng/optimus-ui/inputtext';

@Component({
  imports: [ButtonModule,DialogModule,FormsModule, InputTextModule],
  selector: 'app-nueva-marca',
  styleUrl: './nueva-marca.css',
  templateUrl: './nueva-marca.html',
})
export class NuevaMarca {

  private messageService = inject(MessageService)
  @Input() marcaInicial: any | null = null;
  @Input() modoEdicion = false;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<any>();

  marca ={
    nombre: '',
    descripcion:''
  }

  ngOnInit() {
    if (this.marcaInicial) {
      this.marca = {
        nombre: this.marcaInicial.nombre ?? '',
        descripcion: this.marcaInicial.descripcion ?? ''
      };
    }
  }


  guardarMarca() {
  this.guardar.emit({ ...this.marca, id: this.marcaInicial?.id });
  }
  cerrarDialog() {
  this.cerrar.emit();

  }
}
