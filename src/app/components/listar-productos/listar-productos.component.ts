import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from "src/app/models/producto";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  listProdcutos: Producto[]=[];
  constructor(private _productoService: ProductoService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }


  obtenerProductos(){
    this._productoService.getProductos().subscribe(data=>{
      console.log(data);
      this.listProdcutos=data;
    },error=>{
      console.log(error);
    })
    
  }

  getCategoria(id:number){
    var Categorias =["","GOLOSINAS","BEBIDAS","ARTICULOS DE LIMPIEZA","ARTICULOS DE ASEO PERSONAL","VIVERES"];
    return Categorias[id];
  }

  eliminarProducto(id:any){
    this._productoService.deleteProducto(id).subscribe(data=>{
          this.toastr.error('El proucto fue eliminado con exito','Producto eliminado');
          this.obtenerProductos();
    }, error=>{console.error(error);
    })
  }

}
