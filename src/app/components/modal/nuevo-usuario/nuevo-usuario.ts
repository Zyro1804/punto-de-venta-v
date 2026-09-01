import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '@openng/optimus-ui/api';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { PasswordModule } from '@openng/optimus-ui/password';
import { SelectModule } from '@openng/optimus-ui/select';
import { inject } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [ButtonModule, DialogModule, FormsModule, InputTextModule, PasswordModule, SelectModule],
  selector: 'app-nuevo-usuario',
  styleUrl: './nuevo-usuario.css',
  templateUrl: './nuevo-usuario.html',
})
export class NuevoUsuario {
  private readonly messageService = inject(MessageService);

  @Input() roles: any[] = [];
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<any>();

  usuario = {
    name: '',
    email: '',
    roleId: '',
    password: '',
    numero_telefono:''
  };

  guardarUsuario() {
    if (!this.usuario.name.trim() || !this.usuario.email.trim() || !this.usuario.password.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Campos incompletos',
        detail: 'Completa nombre, correo y contraseña antes de guardar.',
      });
      return;
    }

    if (!this.usuario.roleId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Rol requerido',
        detail: 'Selecciona un rol para el usuario.',
      });
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.usuario.email);
    if (!emailValido) {
      this.messageService.add({
        severity: 'error',
        summary: 'Correo inválido',
        detail: 'Ingresa un correo electrónico válido.',
      });
      return;
    }

    if (this.usuario.password.length < 6) {
      this.messageService.add({
        severity: 'error',
        summary: 'Contraseña débil',
        detail: 'La contraseña debe tener al menos 6 caracteres.',
      });
      return;
    }

    const rolSeleccionado = this.roles.find((rol) => rol.id === this.usuario.roleId);

    this.guardar.emit(this.usuario);
  }

  cerrarDialog() {
    this.cerrar.emit();
  }
}
