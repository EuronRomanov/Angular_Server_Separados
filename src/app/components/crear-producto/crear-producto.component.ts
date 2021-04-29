import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
    productoForm: FormGroup;
    tittle='Crear producto';
    id: string | null;

  constructor(private fb: FormBuilder,
    private route:Router,
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private aRoute: ActivatedRoute) {
    this.productoForm=this.fb.group({
      producto:['', Validators.required],
      categoria:['', Validators.required],
      ubicacion:['', Validators.required],
      precio:['', Validators.required]
    })

    this.id= this.aRoute.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.isEditar();
  }

  agregarProducto(){

    const producto: Producto={
    nombre: this.productoForm.get('producto').value,
    categoria: this.productoForm.get('categoria').value,
    ubicacion: this.productoForm.get('ubicacion').value,
    precio: this.productoForm.get('precio').value
  }
    //console.log(this.productoForm);
    //console.log(producto)

    if (this.id !== null) {
      this._productoService.editarProducto(this.id,producto).subscribe(data=>{
        this.showMessage('editado');
        this.route.navigate(['/']);
      },error=>{
        console.log(error);
        this.productoForm.reset();
      })
    }else{
      this._productoService.guardarProducto(producto).subscribe(data=>{
        this.showMessage('agregado');
        this.route.navigate(['/']);
      },error=>{
        console.log(error);
        this.productoForm.reset();
      })
    }
    
   
  };



  isEditar(){
    if (this.id !== null) {
      this.tittle='Editar porducto';
      this._productoService.obtenerProducto(this.id).subscribe(data=>{
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio
        })
      }, erro=>{})
    }
  }

  showMessage(action: string) {
    this.toastr.success('Se ha '+action+' el producto con exito!', 'Producto se ha '+action+'!');
  }

}
