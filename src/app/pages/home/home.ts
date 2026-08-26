import { Component, signal } from '@angular/core';
import { Menu } from '../../components/menu/menu';
import { Header } from '../../components/header/header';
import { DrawerModule } from '@openng/optimus-ui/drawer';
import { Toast } from '@openng/optimus-ui/toast';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialogModule } from '@openng/optimus-ui/confirmdialog';

@Component({
  imports: [Menu, Header, DrawerModule, Toast, RouterOutlet, ConfirmDialogModule],
  providers: [MessageService,ConfirmationService],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {

    menuVisible = signal(false);

  openMenu() {
    this.menuVisible.set(true);
  }

  closeMenu() {
    this.menuVisible.set(false);
  }
}
