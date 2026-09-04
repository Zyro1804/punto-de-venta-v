import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DrawerModule } from '@openng/optimus-ui/drawer';
import { IconFieldModule } from '@openng/optimus-ui/iconfield';
import { InputIconModule } from '@openng/optimus-ui/inputicon';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { SelectModule } from '@openng/optimus-ui/select';
import { TagModule } from '@openng/optimus-ui/tag';
import { CategoriasService } from '../../../services/categorias/categorias-service';
import { firstValueFrom } from 'rxjs';
import { Categoria } from '../catalogos/categorias/categorias';
import { SubcategoriaItem } from '../catalogos/subcategoria/subcategoria';
import { SubcategoriasService } from '../../../services/categorias/subcategorias-service';
import { SucursalesService } from '../../../services/sucursales/sucursales-service';

interface Product {
  id: number;
  name: string;
  code: string;
  category: string;
  subcategory: string;
  price: number;
  stock: number;
  image: string;
}

@Component({
  imports: [CommonModule, FormsModule, ButtonModule, DrawerModule, InputTextModule, TagModule, IconFieldModule, InputIconModule, SelectModule],
  selector: 'app-nueva-venta',
  styleUrl: './nueva-venta.css',
  templateUrl: './nueva-venta.html',
})
export class NuevaVenta {
  
  private readonly categoriasService= inject(CategoriasService)
  private readonly subcategoriasService = inject(SubcategoriasService)
  private readonly sucursalesService = inject(SucursalesService)
  ngOnInit(): void {
    this.obtenerCategorias() 
    this.obtenerSubcategorias()   
    this.obtenerSucursales()
  }

  readonly categories = ['Todos', 'Electrónica', 'Accesorios', 'Hogar', 'Oficina'];
  readonly products: Product[] = [
    { id: 1, name: 'Audífonos Quantum Noise-Canceling', code: 'ELC-882', category: 'Electrónica', subcategory: 'Audio', price: 249.99, stock: 12, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
    { id: 2, name: 'Teclado mecánico Pro Tactile', code: 'ACC-104', category: 'Accesorios', subcategory: 'Computación', price: 129.50, stock: 4, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80' },
    { id: 3, name: 'Botella inteligente Smart Hydration', code: 'HMG-055', category: 'Hogar', subcategory: 'Cocina', price: 45, stock: 28, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80' },
    { id: 4, name: 'SSD portátil Ultra-Fast 2TB', code: 'ELC-212', category: 'Electrónica', subcategory: 'Computación', price: 189.99, stock: 0, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80' },
    { id: 5, name: 'Mochila urbana commuter', code: 'ACC-901', category: 'Accesorios', subcategory: 'Bolsos', price: 85, stock: 8, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80' },
    { id: 6, name: 'Lámpara de escritorio Line', code: 'OFF-310', category: 'Oficina', subcategory: 'Escritorio', price: 64.90, stock: 15, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80' },
  ];
  sucursales:any;
  sucursal:any;
  categorias=signal<Categoria[]>([])
  subcategorias=signal<SubcategoriaItem[]>([])
  suursales:any;
  search = signal('');
  selectedCategory = signal<Categoria | null>(null);
  selectedSubcategory = signal<SubcategoriaItem | null>(null);
  cart = signal<{ product: Product; quantity: number }[]>([]);
  drawerVisible = signal(false);
  // subcategories = computed(() => ['Todas', ...new Set(this.products.filter(product => this.selectedCategory() === 'Todos' || product.category === this.selectedCategory()).map(product => product.subcategory))]);
  // filteredProducts = computed(() => this.products.filter(product => {
  //   const query = this.search().toLowerCase().trim();
  //   return (this.selectedCategory() === 'Todos' || product.category === this.selectedCategory()) &&
  //     (this.selectedSubcategory() === 'Todas' || product.subcategory === this.selectedSubcategory()) &&
  //     (!query || `${product.name} ${product.code} ${product.category}`.toLowerCase().includes(query));
  // }));
  cartCount = computed(() => this.cart().reduce((total, item) => total + item.quantity, 0));
  subtotal = computed(() => this.cart().reduce((total, item) => total + item.product.price * item.quantity, 0));
  tax = computed(() => this.subtotal() * 0.085);
  total = computed(() => this.subtotal() + this.tax());

  async obtenerSubcategorias(){
    try{
      const resp = await firstValueFrom(this.subcategoriasService.obtenerSubcategorias())
      console.log(resp,'subcategorias');
      this.subcategorias.set(resp.data) 
    }catch(err:any){

    }
  }

  async obtenerCategorias(){
    try{
      const resp = await firstValueFrom(this.categoriasService.obtenerCategorias())
      this.categorias.set(resp.data)
      console.log(resp)
    }catch(err:any){

    }
  }

  async obtenerSucursales(){
    try{
      const resp = await firstValueFrom(this.sucursalesService.obtenerSucursales())
      console.log(resp)
      this.sucursales=resp.data
    }catch(err:any){

    }
  }
  selectCategory(categoria: Categoria) {
    this.selectedCategory.set(categoria);
    // this.selectedSubcategory.set();
  }

  addToCart(product: Product) {
    if (!product.stock) return;
    this.cart.update(items => {
      const existing = items.find(item => item.product.id === product.id);
      if (existing) return items.map(item => item.product.id === product.id && item.quantity < product.stock ? { ...item, quantity: item.quantity + 1 } : item);
      return [...items, { product, quantity: 1 }];
    });
    this.drawerVisible.set(true);
  }
  changeQuantity(productId: number, amount: number) {
    this.cart.update(items => items.flatMap(item => {
      if (item.product.id !== productId) return [item];
      const quantity = Math.min(item.product.stock, item.quantity + amount);
      return quantity > 0 ? [{ ...item, quantity }] : [];
    }));
  }
  removeFromCart(productId: number) { this.cart.update(items => items.filter(item => item.product.id !== productId)); }
  formatPrice(value: number) { return value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }); }
}
