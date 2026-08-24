import { Component, EventEmitter, Output } from '@angular/core';
import { AvatarModule } from '@openng/optimus-ui/avatar';
import { ButtonModule } from '@openng/optimus-ui/button';
import { ToolbarModule } from '@openng/optimus-ui/toolbar';

@Component({
  imports: [ToolbarModule, AvatarModule, ButtonModule],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {

  @Output() menuClick = new EventEmitter<any>()

  openMenu() {
    this.menuClick.emit();
  }
}
