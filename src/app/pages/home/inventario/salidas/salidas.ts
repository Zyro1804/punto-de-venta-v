import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import { SelectModule } from '@openng/optimus-ui/select';
import { TableModule } from '@openng/optimus-ui/table';
import { firstValueFrom } from 'rxjs';
import {
  CatalogoOption,
  MovimientoInventario,
} from '../../../../interfaces/inventario';
import { SalidasService } from '../../../../services/inventario/salidas-service';
import { ProductoService } from '../../../../services/producto/producto-service';
import { SucursalesService } from '../../../../services/sucursales/sucursales-service';
import { NuevaSalida } from '../../../../components/modal/nueva-salida/nueva-salida';

@Component({
  imports: [CommonModule, FormsModule, ButtonModule, NuevaSalida, SelectModule, TableModule],
  selector: 'app-salidas',
  styleUrl: './salidas.css',
  templateUrl: './salidas.html',
})
export class Salidas {
  readonly salidas = signal<MovimientoInventario[]>([]);
  readonly productos = signal<CatalogoOption[]>([]);
  readonly sucursales = signal<CatalogoOption[]>([]);
  readonly lotesUtilizados = signal<any[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');
  readonly total = signal(0);
  readonly totalPages = signal(0);
  readonly page = signal(1);
  readonly limit = 10;
  modalVisible = false;
  selectedProducto: string | number | null = null;
  selectedSucursal: string | number | null = null;
  filtroDesde = '';
  filtroHasta = '';

  private readonly service = inject(SalidasService);
  private readonly productoService = inject(ProductoService);
  private readonly sucursalesService = inject(SucursalesService);


  ngOnInit(): void {
    this.cargarCatalogos();
    this.cargarSalidas();
  }
  async cargarCatalogos(): Promise<void> {
    try {
      const [productos, sucursales] = await Promise.all([
        firstValueFrom(this.productoService.obtenerProductos()),
        firstValueFrom(this.sucursalesService.obtenerSucursales()),
      ]);
      this.productos.set(this.lista(productos));
      this.sucursales.set(this.lista(sucursales));
    } catch {
      this.error.set('No se pudieron cargar productos y sucursales.');
    }
  }
  async cargarSalidas(): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    try {
      const response = await firstValueFrom(
        this.service.obtenerSalidas(
          this.page(),
          this.limit,
          this.selectedSucursal,
          this.selectedProducto,
          this.filtroDesde,
          this.filtroHasta,
        ),
      );
      const body = response as any;
      const rows = Array.isArray(body) ? body : (body.data ?? body.items ?? []);
      const total = body.total ?? rows.length;
      this.salidas.set(rows);
      this.total.set(total);
      this.totalPages.set(body.totalPages ?? Math.ceil(total / this.limit));
    } catch (err: any) {
      this.salidas.set([]);
      this.total.set(0);
      this.totalPages.set(0);
      this.error.set(err?.error?.message || 'No se pudo cargar el historial de salidas.');
    } finally {
      this.loading.set(false);
    }
  }
  aplicarFiltros(): void {
    this.page.set(1);
    this.cargarSalidas();
  }
  abrirFormulario(): void {
    this.error.set('');
    this.modalVisible = true;
  }
  salidaRegistrada(lotes: unknown[]): void {
    this.modalVisible = false;
    this.lotesUtilizados.set(lotes);
    this.page.set(1);
    this.cargarSalidas();
  }
  cambiarPagina(event: { page?: number; first?: number }): void {
    this.page.set((event.page ?? Math.floor((event.first ?? 0) / this.limit)) + 1);
    this.cargarSalidas();
  }
  fecha(value?: string): string {
    return value
      ? new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short' }).format(
          new Date(value),
        )
      : '—';
  }
  nombreProducto(row: MovimientoInventario): string {
    return row.producto?.nombre || row.productoNombre || 'Sin producto';
  }
  nombreSucursal(row: MovimientoInventario): string {
    return row.sucursal?.nombre || row.sucursalNombre || 'Sin sucursal';
  }
  nombreUsuario(row: MovimientoInventario): string {
    return row.usuario?.nombre || row.usuario?.name || row.usuarioNombre || '—';
  }
  private lista(response: any): CatalogoOption[] {
    const rows = Array.isArray(response) ? response : (response?.data ?? response?.items ?? []);
    return rows.map((item: any) => ({
      id: item.id,
      nombre: item.nombre ?? item.name ?? 'Sin nombre',
    }));
  }
}
