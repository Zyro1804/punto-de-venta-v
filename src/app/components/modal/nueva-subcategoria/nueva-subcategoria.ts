import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { SelectModule } from '@openng/optimus-ui/select';

@Component({
  imports: [ButtonModule, DialogModule, FormsModule, InputTextModule, SelectModule],
  selector: 'app-nueva-subcategoria',
  styleUrl: './nueva-subcategoria.css',
  templateUrl: './nueva-subcategoria.html',
})
export class NuevaSubcategoria {
  @Input() categorias:any='';
  @Input() subcategoriaInicial: any | null = null;
  @Input() modoEdicion = false;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<{ nombre: string; descripcion: string }>();

  subcategoria = { nombre: '', descripcion: '', categoriaId: null };

   ngOnInit(): void {
    console.log(this.categorias)
    if (this.subcategoriaInicial) {
      this.subcategoria = {
        nombre: this.subcategoriaInicial.nombre ?? '',
        descripcion: this.subcategoriaInicial.descripcion ?? '',
        categoriaId: this.subcategoriaInicial.categoriaId ?? this.subcategoriaInicial.categoria?.id ?? null
      };
    }
  }
  guardarSubcategoria() {
    this.guardar.emit({ ...this.subcategoria, id: this.subcategoriaInicial?.id } as any);
  }

  cerrarDialog() {
    this.cerrar.emit();
  }
}
