import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Riksintresse, Kommun, Lan, Kulturmiljotyp } from '../classes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url: string = "http://109.225.108.59:3000/api/"; // accessing node.js server, which handles the database

  constructor(private http: HttpClient) { }

  /* hämta alla riksintressen för listan, där riksintressen har kategorier, kategorier, län, osv */
  getRiksintressenList() {
    return this.http.get<Riksintresse[]>(this.url + "riksintressen/list");
  }

  /* hämta alla raderade riksintressen för listan */
  getRiksintressenListDeleted() {
    return this.http.get<Riksintresse[]>(this.url + "riksintressen/list/deleted");
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

  /* hämta alla kulturmiljötyper i en lista */
  getFiles(id: number) {
    return this.http.get<any[]>(this.url + "files/" + id);
  }

  /* ladda upp dokument/bilder på backend */
  async postFiles(formData: FormData) {
    return this.http.post<FormData>(this.url + "upload", formData).toPromise().then((data: any) => {
      return data; // returnera data (id o message) till shared-data-services
    });
  }

  /* uppdatera ett riksintresse */
  async postUpdateRiksintresse(riksintresse: Riksintresse) {
    return this.http.post<Riksintresse>(this.url + "update/riksintresse/", riksintresse).toPromise().then((data: any) => {
      console.log(data);
    });
  }

  /* skapa ett nytt riksintresse */
  async postNewRiksintresse(riksintresse: Riksintresse) {
    return this.http.post<Riksintresse>(this.url + "create/riksintresse/", riksintresse).toPromise().then((data: any) => {
      console.log(data);

      return data; // returnera data (id o message) till shared-data-services
    });
  }
}