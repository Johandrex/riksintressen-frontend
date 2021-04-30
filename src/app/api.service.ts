import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Riksintresse } from './classes/Riksintresse';
import { Geometri } from './classes/Geometri';

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

  /* hämta ett riksintresse */
  getRiksintresse(id: number) {
    return this.http.get<Riksintresse[]>(this.url + "riksintresse/" + id);
  }

  /* hämta all geografi */
  getGeometri() {
    return this.http.get<Geometri[]>(this.url + "geometrier");
  }
}