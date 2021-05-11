import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Riksintresse, RiksintresseList, Kommun, Lan, Kulturmiljotyp } from '../classes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://109.225.108.59:3000/api/"; // accessing node.js server, which handles the database

  constructor(private http: HttpClient) { }

  /*********** GET ***********/

  /* hämta alla riksintressen för listan, där riksintressen har kategorier, kategorier, län, osv */
  getRiksintressenList() {
    return this.http.get<RiksintresseList[]>(this.url + "riksintressen/list");
  }

  /* hämta ett riksintresse */
  getRiksintresse(id: number) {
    return this.http.get<Riksintresse[]>(this.url + "riksintressen/" + id);
  }

  /* hämta alla kommuner i en lista */
  getKommuner() {
    return this.http.get<Kommun[]>(this.url + "kommuner");
  }

  /* hämta alla län i en lista */
  getLan() {
    return this.http.get<Lan[]>(this.url + "lan");
  }

  /* hämta alla kulturmiljötyper i en lista */
  getKulturmiljotyper() {
    return this.http.get<Kulturmiljotyp[]>(this.url + "kulturmiljotyper");
  }

  /*********** POST ***********/

  /* uppdatera ett riksintresse */
  postUpdateRiksintresse(riksintresse: Riksintresse) {
    return this.http.post<Riksintresse>(this.url + "update/riksintresse/", riksintresse).toPromise().then((data: any) => {
      console.log(data);
    });
  }
}