import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Productos } from './pages/home/catalogos/productos/productos';
import { Proveedores } from './pages/home/catalogos/proveedores/proveedores';
import { Marcas } from './pages/home/catalogos/marcas/marcas';
import { Categorias } from './pages/home/catalogos/categorias/categorias';
import { Subcategoria } from './pages/home/catalogos/subcategoria/subcategoria';
import { UnidadDeMedida } from './pages/home/catalogos/unidad-de-medida/unidad-de-medida';
import { Usuarios } from './pages/home/usuarios/usuarios';
import { Roles } from './pages/home/usuarios/roles/roles';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path:'login', component : Login
    },
    {
        path:'home', component: Home, canActivate: [authGuard],
        children: [
            { path:'productos', component : Productos },
            { path:'proveedores', component : Proveedores },
            { path: 'marcas', component : Marcas},
            { path: 'categorias', component : Categorias},
            { path:'subcategorias', component : Subcategoria},
            { path:'unidades-de-medida', component : UnidadDeMedida},
            { path: 'usuarios', component : Usuarios},
            { path: 'roles', component : Roles}
        ]
    }
];
