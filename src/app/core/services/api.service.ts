import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Riksintresse, RiksintresseList, Geometri, Kommun, Lan, Kulturmiljotyp } from '../classes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://109.225.108.59:3000/api/"; // accessing node.js server, which handles the database

  constructor(private http: HttpClient) { }

  /* hämta alla riksintressen */
  getRiksintressen() {
    return this.http.get<Riksintresse[]>(this.url + "riksintressen");
  }

  /* hämta alla riksintressen för listan, där riksintressen har kategorier, kategorier, län, osv */
  getRiksintressenList() {
    return this.http.get<RiksintresseList[]>(this.url + "riksintressen/list");
  }

  /* hämta ett riksintresse */
  getRiksintresse(id: number) {
    return this.http.get<Riksintresse[]>(this.url + "riksintressen/" + id);
  }

  /* hämta all geografi */
  getGeometrier() {
    return this.http.get<Geometri[]>(this.url + "geometrier");
  }

  /* hämta ett geografiskt område utifrån riksintresset */
  getGeometri(id: number) {
    return this.http.get<Geometri[]>(this.url + "geometrier/" + id);
  }

  /* hämta all geografi */
  getKommuner() {
    return this.http.get<Kommun[]>(this.url + "kommuner");
  }

  /* hämta all geografi */
  getLan() {
    return this.http.get<Lan[]>(this.url + "lan");
  }

  /* hämta all geografi */
  getKulturmiljotyper() {
    return this.http.get<Kulturmiljotyp[]>(this.url + "kulturmiljotyper");
  }

}