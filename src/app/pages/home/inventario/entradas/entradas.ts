import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import { SelectModule } from '@openng/optimus-ui/select';
import { TableModule } from '@openng/optimus-ui/table';
import { firstValueFrom } from 'rxjs';
import { CatalogoOption, MovimientoInventario } from '../../../../interfaces/inventario';
import { EntradasService } from '../../../../services/inventario/entradas-service';
import { ProductoService } from '../../../../services/producto/producto-service';
import { SucursalesService } from '../../../../services/sucursales/sucursales-service';
import { NuevaEntrada } from '../../../../components/modal/nueva-entrada/nueva-entrada';
import { AuthService } from '../../../../services/auth/auth-service';

@Component({
  imports: [CommonModule, FormsModule, ButtonModule, NuevaEntrada, SelectModule, TableModule],
  selector: 'app-entradas',
  styleUrl: './entradas.css',
  templateUrl: './entradas.html',
})
export class Entradas {
  readonly entradas = signal<MovimientoInventario[]>([]);
  readonly productos = signal<CatalogoOption[]>([]);
  readonly sucursales = signal<CatalogoOption[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');
  readonly total = signal(0);
  readonly totalPages = signal(0);
  modalVisible = false;
  readonly page = signal(1);
  readonly limit = 10;
  selectedProducto: string | number | null = null;
  selectedSucursal: string | number | null = null;
  filtroDesde = '';
  filtroHasta = '';
  userId :any;
  private readonly service = inject(EntradasService);
  private readonly productoService = inject(ProductoService);
  private readonly sucursalesService = inject(SucursalesService);
  private readonly authService = inject(AuthService)

  ngOnInit(): void {
    this.cargarCatalogos();
    this.cargarEntradas();
    this.getUserId();
  }

  getUserId(){
   const resp = this.authService.getTokenData()
   this.userId= resp?.['idUser']
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

  async cargarEntradas(): Promise<void> {
    this.loading.set(true);
    this.error.set('');

    try {
      const response = await firstValueFrom(
        this.service.obtenerEntradas(
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
      this.entradas.set(rows);
      this.total.set(body.total ?? rows.length);
      this.totalPages.set(body.totalPages ?? Math.ceil((body.total ?? rows.length) / this.limit));
    } catch (err: any) {
      this.entradas.set([]);
      this.error.set(err?.error?.message || 'No se pudo cargar el historial de entradas.');
    } finally {
      this.loading.set(false);
    }
  }

  aplicarFiltros(): void {
    this.page.set(1);
    this.cargarEntradas();
  }
  abrirFormulario(): void {
    this.error.set('');
    this.modalVisible = true;
  }
  entradaRegistrada(): void {
    this.modalVisible = false;
    this.page.set(1);
    this.cargarEntradas();
  }
  cambiarPagina(event: { page?: number; first?: number }): void {
    this.page.set((event.page ?? Math.floor((event.first ?? 0) / this.limit)) + 1);
    this.cargarEntradas();
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
