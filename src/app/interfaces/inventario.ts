export interface CatalogoOption {
  id: string | number;
  nombre: string;
}

export interface PaginatedResponse<T> {
  data?: T[];
  items?: T[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface InventarioLote {
  id?: string | number;
  lote?: string;
  numeroLote?: string;
  fechaCaducidad?: string | null;
  stockDisponible?: number;
  stock?: number;
  cantidad?: number;
}

export interface InventarioItem {
  id?: string | number;
  producto?: CatalogoOption;
  productoId?: string | number;
  productoNombre?: string;
  sucursal?: CatalogoOption;
  sucursalId?: string | number;
  sucursalNombre?: string;
  stockTotal?: number;
  stock?: number;
  proximaCaducidad?: string | null;
  fechaCaducidad?: string | null;
  cantidadLotes?: number;
  lotes?: InventarioLote[];
}

export interface MovimientoInventario {
  id?: string | number;
  fechaRegistro?: string;
  createdAt?: string;
  tipo?: string;
  tipoMovimiento?: string;
  producto?: CatalogoOption;
  productoId?: string | number;
  productoNombre?: string;
  sucursal?: CatalogoOption;
  sucursalId?: string | number;
  sucursalNombre?: string;
  lote?: string;
  numeroLote?: string;
  cantidad?: number;
  entrada?: number;
  salida?: number;
  usuario?: { id?: string | number; name?: string; nombre?: string };
  usuarioNombre?: string;
}

export interface EntradaPayload {
  productoId: string | number;
  sucursalId: string | number;
  usuarioId: string | number;
  cantidad: number;
  lote: string;
  fechaCaducidad?: string;
  observaciones?: string;
}

export interface SalidaPayload {
  productoId: string | number;
  sucursalId: string | number;
  usuarioId: string | number;
  cantidad: number;
  observaciones?: string;
}