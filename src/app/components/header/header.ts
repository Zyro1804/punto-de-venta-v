import { Component } from '@angular/core';
import { AvatarModule } from '@openng/optimus-ui/avatar';
import { ToolbarModule } from '@openng/optimus-ui/toolbar';

@Component({
  imports: [ToolbarModule, AvatarModule],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {}
