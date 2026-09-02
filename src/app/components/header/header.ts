import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AvatarModule } from '@openng/optimus-ui/avatar';
import { ButtonModule } from '@openng/optimus-ui/button';
import { ToolbarModule } from '@openng/optimus-ui/toolbar';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  imports: [ToolbarModule, AvatarModule, ButtonModule],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private authService = inject(AuthService);
  usuario:any;
  @Output() menuClick = new EventEmitter<any>()

  ngOnInit(): void {
   this.obtenerDatosUsuario()
  }

  async obtenerDatosUsuario(){
    this.usuario = this.authService.getTokenData()
    console.log('TOKEN DE USUARIO',this.usuario)
  } 

  openMenu() {
    this.menuClick.emit();
  }
}
