import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductoInterface} from '../interfaces/producto.interface';
import {promise} from 'selenium-webdriver';
import rejected = promise.rejected;
import {reject, resolve} from 'q';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: ProductoInterface[] = [];
  productosFiltrado: ProductoInterface[] = [];

  constructor(private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos () {
    return new Promise ( ( resolve , reject ) => {
      this.http.get('https://angular-html-37fff.firebaseio.com/productos_idx.json')
        .subscribe((resp: ProductoInterface[]) => {
          console.log(resp);
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    });
  }

  getProductos (id: String) {
   return this.http.get(`https://angular-html-37fff.firebaseio.com/productos/${id}.json`);
  }
  buscarProducto( termino: string ) {
    if ( this.productos.length  === 0 ) {
      // cargar producto
      this.cargarProductos().then(  () => {
      // ejecutar despues de tener los productos
      // aplicar filtro
        this.filtrarProductos( termino );
      });
    } else {
      this.filtrarProductos( termino );
    }


  }

  private filtrarProductos ( termino: string ) {
    this.productosFiltrado = [];
    termino = termino.toLowerCase();
    this.productos.forEach( prod => {
       const titulolower = prod.titulo.toLocaleLowerCase();
       if (prod.categoria.indexOf( termino) >= 0 || titulolower.indexOf( termino ) >= 0 ) {
         this.productosFiltrado.push( prod );
       }
    });
  }

}
