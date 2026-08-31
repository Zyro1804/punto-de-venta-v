import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TextareaModule } from '@openng/optimus-ui/textarea';
import { SelectModule } from '@openng/optimus-ui/select';

@Component({
  imports: [
    FormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    SelectModule
  ],
  selector: 'app-nuevo-producto',
  styleUrl: './nuevo-producto.css',
  templateUrl: './nuevo-producto.html',
})
export class NuevoProducto {
  @Input() categorias: any[] = [];
  @Input() subcategorias: any[] = [];
  @Input() unidadesDeMedida: any[] = [];
  @Input() proveedores: any[] = [];
  @Input() marcas: any[] = [];
  @Output() cerrar = new EventEmitter<void>();

  @Output() guardar = new EventEmitter<any>();

  producto = {
    nombre: '',
    clave: '',
    codigoBarra: '',
    precio: 0,
    tamano:0,
    categoriaId: '',
    subCategoriaId: '',
    unidadMedidaId: '',
    proveedorId: '',
    marcaId: '',   
  };

  subcategoriasDisponibles: any[] = [];

  ngOnInit() {
    this.actualizarSubcategorias();
  }

  actualizarSubcategorias() {
    const categoriaId = this.producto.categoriaId;
    this.subcategoriasDisponibles = this.subcategorias.filter((subcategoria) =>
      subcategoria.categoriaId === categoriaId ||
      subcategoria.categoria?.id === categoriaId
    );

    if (!this.subcategoriasDisponibles.some((subcategoria) => subcategoria.id === this.producto.subCategoriaId)) {
      this.producto.subCategoriaId = '';
    }
  }

  guardarProducto() {

  console.log(this.producto);

  this.guardar.emit(this.producto);

  }

  cerrarDialog() {

    this.cerrar.emit();

  }
}
