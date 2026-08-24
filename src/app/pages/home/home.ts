import { Component, signal } from '@angular/core';
import { Menu } from '../../components/menu/menu';
import { Header } from '../../components/header/header';
import { DrawerModule } from '@openng/optimus-ui/drawer';
import { Toast } from '@openng/optimus-ui/toast';
import { MessageService } from '@openng/optimus-ui/api';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Menu, Header, DrawerModule, Toast, RouterOutlet],
  providers: [MessageService],
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
