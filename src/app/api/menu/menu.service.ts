import { Injectable } from '@angular/core';

// component
// import { ArticlesComponent, Article } from '../../components/articles/articles.component';

// service
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../../pages/menu/menu.model';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private SERVER = 'http://localhost:8080/api';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(
              private http: HttpClient,
              ) {}

  getAllMenu() {
    return this.http.get(`${ this.SERVER }/product`);
  }

  getMenu(id: number) {
    return this.http.get(`${ this.SERVER }/product/${id}`);
  }

  getAllCategories() {
    return this.http.get(`${this.SERVER}/product/categories`);
  }

  updateMenu(m: Menu) {
    return this.http.put<any>(`${ this.SERVER }/product/${m.id}`, m, { headers: this.httpHeaders });
  }

  createMenu(m: Menu) {
    return this.http.post<any>(`${ this.SERVER }/product`, m, { headers: this.httpHeaders });
  }

//   loadCategories() {
//     return this.http.get(`${ this.SERVER }/categorias`);
//   }

//   createArticle(article: Article) {

//     return this.http.post<any>(`${ this.SERVER }/articulos/new`, article, { headers: this.httpHeaders });

//   }

//   editArticle(idArticle: number, articulo: Article): Observable<any> {
//     // let params = new HttpParams().set( 'id_cliente', cliente.id_cliente.toString() );
//     // cliente.empresa.id_empresa = 2;
//     console.log("articulo", articulo);
//     return this.http.put<any>(`${ this.SERVER }/articulos/edit/?id=${idArticle}`, articulo, { headers: this.httpHeaders });
//   }

//   deleteArticle(id: number) {
//     return this.http.delete(`${ this.SERVER }/articulos/delete/?id=${id}`, { headers: this.httpHeaders });
//   }

}
