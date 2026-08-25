import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Productos } from './pages/home/productos/productos';
import { Proveedores } from './pages/home/proveedores/proveedores';

export const routes: Routes = [
    {
        path:'login', component : Login
    },
    {
        path:'home', component: Home,
        children: [
            { path:'productos', component: Productos },
            { path:'proveedores', component: Proveedores }
        ]
    }
];
