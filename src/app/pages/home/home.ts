import { Component, inject, signal } from '@angular/core';
import { Menu } from '../../components/menu/menu';
import { Header } from '../../components/header/header';
import { DrawerModule } from '@openng/optimus-ui/drawer';
import { Toast } from '@openng/optimus-ui/toast';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialogModule } from '@openng/optimus-ui/confirmdialog';
import { ChartModule } from '@openng/optimus-ui/chart';
import { TagModule } from '@openng/optimus-ui/tag';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

type TagSeverity = 'success' | 'warn' | 'secondary' | 'info' | 'danger' | 'contrast' | null;

@Component({
  imports: [Menu, Header, DrawerModule, Toast, RouterOutlet, ConfirmDialogModule, ChartModule, TagModule],
  providers: [MessageService, ConfirmationService],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {

  private readonly router = inject(Router);
  readonly currentUrl = signal(this.router.url);

  readonly summaryCards = [
    { label: 'Ventas totales', value: '$48,280', detail: '+12.8% vs. mes anterior', icon: 'pi pi-chart-line', tone: 'blue' },
    { label: 'Ventas del día', value: '$3,840', detail: '+8.4% vs. ayer', icon: 'pi pi-wallet', tone: 'green' },
    { label: 'Órdenes pendientes', value: '18', detail: '6 requieren atención', icon: 'pi pi-clock', tone: 'amber' },
    { label: 'Productos por agotarse', value: '7', detail: 'Revisar inventario', icon: 'pi pi-exclamation-triangle', tone: 'red' },
  ];

  readonly recentSales: Array<{
    id: string;
    customer: string;
    date: string;
    items: number;
    total: string;
    status: string;
    severity: TagSeverity;
  }> = [
      { id: '#V-1048', customer: 'María González', date: 'Hoy, 10:42', items: 4, total: '$1,280', status: 'Completada', severity: 'success' },
      { id: '#V-1047', customer: 'Carlos Ramírez', date: 'Hoy, 10:18', items: 2, total: '$640', status: 'Completada', severity: 'success' },
      { id: '#V-1046', customer: 'Ana Martínez', date: 'Hoy, 09:56', items: 7, total: '$2,145', status: 'Pendiente', severity: 'warn' },
      { id: '#V-1045', customer: 'Luis Torres', date: 'Ayer, 18:32', items: 3, total: '$875', status: 'Completada', severity: 'success' },
    ];

  readonly lowStock = [
    { name: 'Café molido 500 g', stock: 3, minimum: 10 },
    { name: 'Leche entera 1 L', stock: 5, minimum: 12 },
    { name: 'Azúcar refinada 1 kg', stock: 7, minimum: 15 },
  ];

  readonly salesChartData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [{
      label: 'Ventas', data: [4200, 5100, 4650, 6200, 7400, 8900, 3840], fill: true, tension: 0.4,
      borderColor: '#2563eb', backgroundColor: 'rgba(37, 99, 235, 0.12)', pointBackgroundColor: '#2563eb',
    }],
  };

  readonly salesChartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(148, 163, 184, 0.16)' }, ticks: { callback: (value: string | number) => `$${Number(value) / 1000}k` } },
      x: { grid: { display: false } },
    },
  };

  readonly categoryChartData = {
    labels: ['Abarrotes', 'Bebidas', 'Lácteos', 'Limpieza'],
    datasets: [{ data: [38, 27, 21, 14], backgroundColor: ['#2563eb', '#14b8a6', '#f59e0b', '#f97316'], borderWidth: 0 }],
  };

  readonly categoryChartOptions = {
    maintainAspectRatio: false, cutout: '72%',
    plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 18 } } },
  };

  constructor() {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this.currentUrl.set(event.urlAfterRedirects));
  }

  isDashboardVisible(): boolean {
    return this.currentUrl() === '/home' || this.currentUrl() === '/home/';
  }

  menuVisible = signal(false);

  openMenu() {
    this.menuVisible.set(true);
  }

  closeMenu() {
    this.menuVisible.set(false);
  }
}


