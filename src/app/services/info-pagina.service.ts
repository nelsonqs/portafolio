import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InfoPagina} from '../interfaces/info-pagina.interface';
import {InfoEquipo} from '../interfaces/info-equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina  = {};
  equipo: any [] = [];
  cargada = false;
  constructor(  private http: HttpClient) {
    //  console.log('info pagina sql cargando!!!!!');
    //  leer archivo jso
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina)  =>  {
        this.cargada = true;
        this.info = resp;
        console.log(resp);
      });
  }
  private cargarEquipo () {
    this.http.get('https://angular-html-37fff.firebaseio.com/equipo.json')
      .subscribe( (resp: any)  =>  {
        this.cargada = true;
        this.equipo = resp;
        console.log(resp);
      });
  }
}
