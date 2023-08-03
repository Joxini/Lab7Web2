import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Productos } from 'src/app/shared/models/productos';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { AdminProductosComponent } from './admin-productos/admin-productos.component';
import { DatePipe } from '@angular/common';


// const ELEMENT_DATA: Productos[] = [];
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  providers: [DatePipe]
})

export class ProductosComponent {

  displayedColumns: string[] = ['id', 'nombre', 'precio','acciones'];
  dataSource = new MatTableDataSource();
  //Para poder de jalar los datos, lo hacemos por inyeccion de dependencia.
  constructor(private srvProductos: ProductosService, public dialog: MatDialog, 
    private datePipe: DatePipe){

  }
  ngOnInit(){
    this.srvProductos.getAll().subscribe((datos) => {
      this.dataSource.data = datos;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(id:number):void{
    this.srvProductos.eliminar(id).subscribe((dato) =>{
      alert("SE ELEMINO EL PRODUCTO")
      window.location.reload(); 
    },(error)=>{
      alert("ERROR AL ELIMINAR")
    })
  }

  detalle(dato:Productos):void{

    const mensaje = `
    ID: ${dato.id}
    Nombre: ${dato.nombre}
    Precio: ${dato.precio}
    Stock: ${dato.stock}
    Fecha Ingreso: ${this.datePipe.transform(dato.fechaIngreso, 'shortDate')}
    Estado: ${dato.estado}
  `;
  alert(mensaje);
}
  // ? eso es para decir que va a recibir un producto opcional(que llegue o que no llegue)
  abrirDialog(producto?:Productos):void{
    if(producto){
      this.dialog.open(AdminProductosComponent, {width:'700px', height:'700px', data:{producto}});
    }else{
      this.dialog.open(AdminProductosComponent, {width:'700px', height:'700px'});
    }
  }
  
}
