import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientosRoutingModule } from './mantenimientos-routing.module';
import { MantenimientosComponent } from './mantenimientos.component';
import { ProductosComponent } from './productos/productos.component';
import { MaterialModule } from 'src/app/material.module';
import { AdminProductosComponent } from './productos/admin-productos/admin-productos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientesComponent } from './clientes/clientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdminUsuariosComponent } from './usuarios/admin-usuarios/admin-usuarios.component';

@NgModule({
  declarations: [
    MantenimientosComponent,
    ClientesComponent,
    ProductosComponent,
    UsuariosComponent,
    AdminProductosComponent,
    AdminUsuariosComponent
  ],
  imports: [
    CommonModule,
    MantenimientosRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MantenimientosModule { }
