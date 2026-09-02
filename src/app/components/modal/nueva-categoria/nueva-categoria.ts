import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
  @Input() categoriaInicial: any | null = null;
  @Input() modoEdicion = false;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<any>();

  categoria ={
    nombre: '',
    descripcion:''
  }

  ngOnInit() {
    if (this.categoriaInicial) {
      this.categoria = {
        nombre: this.categoriaInicial.nombre ?? '',
        descripcion: this.categoriaInicial.descripcion ?? ''
      };
    }
  }


  guardarCategoria() {
  this.guardar.emit({ ...this.categoria, id: this.categoriaInicial?.id });
  }

  cerrarDialog() {
  this.cerrar.emit();

  }
}


