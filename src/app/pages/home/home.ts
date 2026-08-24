import { Component, signal } from '@angular/core';
import { Menu } from '../../components/menu/menu';
import { Header } from '../../components/header/header';
import { DrawerModule } from '@openng/optimus-ui/drawer';

@Component({
  imports: [Menu, Header, DrawerModule],
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
