import { Component,Inject } from '@angular/core';
import { UsuariosForm } from 'src/app/shared/formsModels/usuariosForms';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss'],
  providers: [DatePipe]
})

export class AdminUsuariosComponent {
  usuarioActual:any;
  titulo = 'Crear Usuario';
  isCreate = true
  constructor(public usuarioForm:UsuariosForm, 
    private srvUsuarios: UsuariosService,
    @Inject(MAT_DIALOG_DATA) public data: {usuario: any}){}

  ngOnInit(){
    // Si tiene datos, cambia el titulo
    if(this.data?.usuario){
      // Si es modificar pongo el create false
      this.isCreate = false;
      this.titulo = "Modificar Usuario";
      this.cargarDatosForm();
    }else{
      // Si es crear pongo el create false
      this.isCreate = true;
      this.titulo = "Crear Usuario";
    }
  }
  cargarDatosForm(){

    //El patchValue me a pintar en el formulario los datos que actualmente tengo en la base de datos,
    //pero puedo modificarlo.
    this.usuarioForm.baseForm.patchValue({
      cedula: this.data.usuario.cedula,
      nombre: this.data.usuario.nombre,
      apellido1: this.data.usuario.apellido1,
      apellido2: this.data.usuario.apellido2,
      fecha_ingreso: this.data.usuario.fecha_ingreso,
      correo: this.data.usuario.correo,
      rol: this.data.usuario.rol,
      contrasena: this.data.usuario.contrasena,
      estado: true
    });
  }

  guardar(){
    //El valid, me va a devolver un true o un false
    if(this.usuarioForm.baseForm.valid){

      if(this.isCreate){
        this.srvUsuarios.guardar(this.usuarioForm.baseForm.value).subscribe((dato) =>{
          alert("SE GUARDO CORRECTAMENTE EL USUARIO");
          window.location.reload(); 
        },(error) =>{
          alert(error.error.mensaje);
        });
      }else{
        this.srvUsuarios.modificar(this.usuarioForm.baseForm.value).subscribe((dato) =>{
          alert("SE MODIFICO CORRECTAMENTE EL USUARIO");
          window.location.reload(); 
        },(error) =>{
          alert(error.error.mensaje);
        });
      }
      
      
    }

  }

}
