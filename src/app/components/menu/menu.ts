import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { icon } from '@openng/optimus-ui-themes/aura/avatar';
import { ButtonModule } from '@openng/optimus-ui/button';
import { MenuModule } from '@openng/optimus-ui/menu';
import { PanelMenuModule } from '@openng/optimus-ui/panelmenu';
import { AuthService } from '../../services/auth/auth-service';

interface MenuItem {
  label: string;
  icon?: string;
  routerLink?: string;
  items?: MenuItem[];
  hiddenForRoles?: string[];
}

@Component({
  imports: [ PanelMenuModule, MenuModule, ButtonModule],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {
  private router = inject(Router);
  private authService = inject(AuthService)
  roleName: string | null = null;
  
  usuario:any;
  ngOnInit() : void {
   this.obtenerRol()
  }


  items: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      routerLink: '/home'
    },
    {
      label: 'Ventas',
      icon: 'pi pi-shopping-cart',
      items: [
        {
          label: 'Nueva venta',
          icon: 'pi pi-plus',
          routerLink: 'nueva-venta'
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
          routerLink: 'productos'
        },
        {
          label: 'Categorías',
          icon: 'pi pi-tag',
          routerLink: 'categorias'
        },
        {
          label: 'Sub-Categorías',
          icon: 'pi pi-tags',
          routerLink: 'subcategorias'
        },
        {
          label: 'Marcas',
          icon: 'pi pi-bookmark',
          routerLink: 'marcas'
        },
        {
          label: 'Proveedores',
          icon: 'pi pi-truck',
          routerLink: 'proveedores'
        },
        {
          label: 'Unidades de Medida',
          icon: 'pi pi-calculator',
          routerLink: 'unidades-de-medida'
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
      label: 'Sucursales',
      icon: 'pi pi-building',
      items: [
        {
          label: 'Lista de Sucursales',
          icon: 'pi pi-building',
          routerLink: 'sucursales'
        },
      
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
      hiddenForRoles: ['ADMINISTRADOR'],
      items: [
        {
          label: 'Lista de Usuarios',
          icon: 'pi pi-users',
          routerLink: 'usuarios'
        },
        {
          label: 'Roles',
          icon: 'pi pi-shield',
          routerLink: 'roles'
        }
      ]
    },
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      routerLink: '/configuracion'
    }
  ];

  visibleItems: MenuItem[] = this.items;

  private filterItemsByRole(items: MenuItem[]): MenuItem[] {
    const currentRole = this.roleName?.trim().toUpperCase();

    return items
      .filter(item => !currentRole || !item.hiddenForRoles?.some(
        role => role.trim().toUpperCase() === currentRole
      ))
      .map(item => item.items
        ? { ...item, items: this.filterItemsByRole(item.items) }
        : item
      )
      .filter(item => !item.items || item.items.length > 0 || !!item.routerLink);
  }

  logoutItems = [
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => this.logout(),
    }
  ];

  async logout(): Promise<void> {
    localStorage.clear();
    sessionStorage.clear();
    await this.router.navigateByUrl('/login');
  }

  irVenta(){
    this.router.navigateByUrl('/home/nueva-venta')
  }

  async obtenerRol(){
    try{
      const rol = this.authService.getRolToken()
      console.log('Este es rol de la persona',rol)
      this.roleName = rol
      this.visibleItems = this.filterItemsByRole(this.items)
    }catch(err:any){

    }
  }
}
