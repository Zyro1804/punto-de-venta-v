import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { InputNumberModule } from '@openng/optimus-ui/inputnumber';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { SelectModule } from '@openng/optimus-ui/select';
import { SucursalPayload } from '../../../services/sucursales/sucursales-service';

@Component({
  imports: [ButtonModule, DialogModule, FormsModule, InputNumberModule, InputTextModule, SelectModule],
  selector: 'app-nueva-sucursal',
  styleUrl: './nueva-sucursal.css',
  templateUrl: './nueva-sucursal.html',
})
export class NuevaSucursal {
  @Input() usuarios: any[] = [];
  @Input() sucursalInicial: any | null = null;
  @Input() modoEdicion = false;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<SucursalPayload & { id?: string | number }>();

  sucursal: SucursalPayload = {
    nombre: '',
    numero_sucursal: 0,
    ubicacion: '',
    encargado_de_tienda: '',
  };

  ngOnInit(): void {
    if (this.sucursalInicial) {
      this.sucursal = {
        nombre: this.sucursalInicial.nombre ?? '',
        numero_sucursal: this.sucursalInicial.numero_sucursal ?? 0,
        ubicacion: this.sucursalInicial.ubicacion ?? '',
        encargado_de_tienda: this.sucursalInicial.encargado_de_tienda
          ?? this.sucursalInicial.encargado?.id
          ?? '',
      };
    }
  }

  guardarSucursal(): void {
    this.guardar.emit({ ...this.sucursal, id: this.sucursalInicial?.id });
  }

  cerrarDialog(): void {
    this.cerrar.emit();
  }
}
