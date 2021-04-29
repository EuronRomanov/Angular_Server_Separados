import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url= 'http://localhost:4000/api/productos/'

constructor(private http:HttpClient) { }


//get data products
getProductos():Observable<any>{
  return this.http.get(this.url);
}


//delete product

deleteProducto(id:String):Observable<any>{
  return this.http.delete(this.url+id);
}

//save product
guardarProducto(producto:Producto){
  return this.http.post(this.url, producto);
}

//get data by id
obtenerProducto(id:string):Observable<any>{
  return this.http.get(this.url+id);
}

//upate product
editarProducto(id: string, producto:Producto): Observable<any>{
  return this.http.put(this.url+id, producto);
}

}

