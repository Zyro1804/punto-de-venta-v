import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import { SelectModule } from '@openng/optimus-ui/select';
import { TableModule } from '@openng/optimus-ui/table';
import { firstValueFrom } from 'rxjs';
import { InventarioItem, CatalogoOption } from '../../../../interfaces/inventario';
import { InventarioService } from '../../../../services/inventario/inventario-service';
import { ProductoService } from '../../../../services/producto/producto-service';
import { SucursalesService } from '../../../../services/sucursales/sucursales-service';
import { environment } from '../../../../../environments/environment';

@Component({
  imports: [CommonModule, FormsModule, ButtonModule, SelectModule, TableModule],
  selector: 'app-inventario',
  styleUrl: './inventario.css',
  templateUrl: './inventario.html',
})
export class Inventario {
  readonly inventario = signal<InventarioItem[]>([]);
  readonly sucursales = signal<CatalogoOption[]>([]);
  readonly productos = signal<CatalogoOption[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');
  readonly total = signal(0);
  readonly totalPages = signal(0);
  readonly page = signal(1);
  readonly limit = 10;
  selectedSucursal: string | number | null = null;
  selectedProducto: string | number | null = null;
  detalle: InventarioItem | null = null;

  private readonly inventarioService = inject(InventarioService);
  private readonly sucursalesService = inject(SucursalesService);
  private readonly productoService = inject(ProductoService);

  ngOnInit(): void {
    this.cargarCatalogos();
    this.cargarInventario();
  }

  async cargarCatalogos(): Promise<void> {
    try {
      const [sucursales, productos] = await Promise.all([
        firstValueFrom(this.sucursalesService.obtenerSucursales()),
        firstValueFrom(this.productoService.obtenerProductos()),
      ]);
      this.sucursales.set(this.lista(sucursales));
      this.productos.set(this.lista(productos));
    } catch {
      this.error.set('No se pudieron cargar los filtros de inventario.');
    }
  }

  async cargarInventario(): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    try {
      const response = await firstValueFrom(this.inventarioService.obtenerInventario(this.page(), this.limit, this.selectedSucursal, this.selectedProducto));
      const body = response as any;
      const rows = Array.isArray(body) ? body : body.data ?? body.items ?? [];
      this.inventario.set(rows);
      this.total.set(body.total ?? rows.length);
      this.totalPages.set(body.totalPages ?? Math.ceil((body.total ?? rows.length) / this.limit));
      if (this.detalle && !rows.some((item: InventarioItem) => item.id === this.detalle?.id)) this.detalle = null;
    } catch (err: any) {
      this.inventario.set([]);
      this.error.set(err?.error?.message || 'No se pudo cargar el inventario.');
    } finally {
      this.loading.set(false);
    }
  }

  aplicarFiltros(): void {
    this.page.set(1);
    this.detalle = null;
    this.cargarInventario();
  }

  cambiarPagina(event: { page?: number; first?: number; rows?: number }): void {
    this.page.set((event.page ?? Math.floor((event.first ?? 0) / this.limit)) + 1);
    this.cargarInventario();
  }

  seleccionar(item: InventarioItem): void {
    this.detalle = this.detalle?.id === item.id ? null : item;
  }

  nombreProducto(item: InventarioItem): string {
    return item.producto?.nombre || item.productoNombre || 'Sin producto';
  }

  nombreSucursal(item: InventarioItem): string {
    return item.sucursal?.nombre || item.sucursalNombre || 'Sin sucursal';
  }

  stock(item: InventarioItem): number {
    return item.stockTotal ?? item.stock ?? 0;
  }

  fecha(value?: string | null): string {
    return value ? new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' }).format(new Date(value)) : 'Sin fecha';
  }

  lotes(item: InventarioItem): any[] {
    return item.lotes ?? [];
  }

  private lista(response: any): CatalogoOption[] {
    const rows = Array.isArray(response) ? response : response?.data ?? response?.items ?? [];
    return rows.map((item: any) => ({ id: item.id, nombre: item.nombre ?? item.name ?? 'Sin nombre' }));
  }

    obtenerUrlImagen(imagen?: string): string {
      if (!imagen) {
        return '';
      }
  
      return imagen.startsWith('http') ? imagen : `${environment.url}${imagen}`;
    }
}
