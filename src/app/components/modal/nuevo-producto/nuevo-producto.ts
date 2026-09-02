import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TextareaModule } from '@openng/optimus-ui/textarea';
import { SelectModule } from '@openng/optimus-ui/select';
import { environment } from '../../../../environments/environment';

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
export class NuevoProducto implements OnDestroy {
  @Input() categorias: any[] = [];
  @Input() subcategorias: any[] = [];
  @Input() unidadesDeMedida: any[] = [];
  @Input() proveedores: any[] = [];
  @Input() marcas: any[] = [];
  @Input() productoInicial: any | null = null;
  @Input() modoEdicion = false;
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

  imagen: File | undefined;
  vistaPreviaImagen: string | undefined;
  imagenExistente: string | undefined;

  subcategoriasDisponibles: any[] = [];

  ngOnInit() {
    if (this.productoInicial) {
      this.producto = {
        nombre: this.productoInicial.nombre ?? '',
        clave: this.productoInicial.clave ?? '',
        codigoBarra: this.productoInicial.codigoBarra ?? '',
        precio: this.productoInicial.precio ?? 0,
        tamano: this.productoInicial.tamano ?? 0,
        categoriaId: this.productoInicial.categoriaId ?? this.productoInicial.categoria?.id ?? '',
        subCategoriaId: this.productoInicial.subCategoriaId ?? this.productoInicial.subCategoria?.id ?? '',
        unidadMedidaId: this.productoInicial.unidadMedidaId ?? this.productoInicial.unidadMedida?.id ?? '',
        proveedorId: this.productoInicial.proveedorId ?? this.productoInicial.proveedor?.id ?? '',
        marcaId: this.productoInicial.marcaId ?? this.productoInicial.marca?.id ?? '',
      };
      this.imagenExistente = this.productoInicial.imagen;
      this.vistaPreviaImagen = this.obtenerUrlImagen(this.imagenExistente);
    }
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

  seleccionarImagen(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
      input.value = '';
      return;
    }

    this.liberarVistaPrevia();
    this.imagen = file;
    this.vistaPreviaImagen = URL.createObjectURL(file);
  }

  quitarImagen(input: HTMLInputElement) {
    input.value = '';
    this.imagen = undefined;
    this.imagenExistente = undefined;
    this.liberarVistaPrevia();
  }

  guardarProducto() {

  console.log(this.producto);

  this.guardar.emit({ ...this.producto, id: this.productoInicial?.id, imagen: this.imagen });

  }

  cerrarDialog() {

    this.cerrar.emit();

  }

  ngOnDestroy() {
    this.liberarVistaPrevia();
  }

  obtenerUrlImagen(imagen?: string): string {
    if (!imagen) {
      return '';
    }

    return imagen.startsWith('http') ? imagen : `${environment.url}${imagen}`;
  }

  private liberarVistaPrevia() {
    if (this.vistaPreviaImagen) {
      URL.revokeObjectURL(this.vistaPreviaImagen);
      this.vistaPreviaImagen = undefined;
    }
  }
}
