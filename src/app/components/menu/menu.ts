import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from '@openng/optimus-ui/button';
import { MenuModule } from '@openng/optimus-ui/menu';
import { PanelMenuModule } from '@openng/optimus-ui/panelmenu';

@Component({
  imports: [ PanelMenuModule, MenuModule, ButtonModule],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {

   items = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      routerLink: '/inicio'
    },
    {
      label: 'Ventas',
      icon: 'pi pi-shopping-cart',
      items: [
        {
          label: 'Nueva venta',
          icon: 'pi pi-plus',
          routerLink: '/ventas/nueva'
        },
        {
          label: 'Historial',
          icon: 'pi pi-history',
          routerLink: '/ventas/historial'
        },
        {
          label: 'Devoluciones',
          icon: 'pi pi-replay',
          routerLink: '/ventas/devoluciones'
        }
      ]
    },
    {
      label: 'Productos',
      icon: 'pi pi-box',
      items: [
        {
          label: 'Productos',
          icon: 'pi pi-list',
          routerLink: '/productos'
        },
        {
          label: 'Categorías',
          icon: 'pi pi-tags',
          routerLink: '/productos/categorias'
        },
        {
          label: 'Sub-Categorías',
          icon: 'pi pi-tags',
          routerLink: '/productos/categorias'
        },
        {
          label: 'Marcas',
          icon: 'pi pi-bookmark',
          routerLink: '/productos/marcas'
        },
        {
          label: 'Proveedores',
          icon: 'pi pi-bookmark',
          routerLink: '/productos/proveedores'
        }
      ]
    },
    {
      label: 'Inventario',
      icon: 'pi pi-warehouse',
      items: [
        {
          label: 'Existencias',
          icon: 'pi pi-box',
          routerLink: '/inventario/existencias'
        },
        {
          label: 'Entradas',
          icon: 'pi pi-arrow-down',
          routerLink: '/inventario/entradas'
        },
        {
          label: 'Salidas',
          icon: 'pi pi-arrow-up',
          routerLink: '/inventario/salidas'
        },
        {
          label: 'Kardex',
          icon: 'pi pi-book',
          routerLink: '/inventario/salidas'
        }
      ]
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      routerLink: '/clientes'
    },
    {
      label: 'Reportes',
      icon: 'pi pi-chart-bar',
      items: [
        {
          label: 'Ventas',
          routerLink: '/reportes/ventas'
        },
        {
          label: 'Inventario',
          routerLink: '/reportes/inventario'
        }
      ]
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-user',
      routerLink: '/clientes'
    },
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      routerLink: '/configuracion'
    }
  ];

  async logout(){

  }
}
