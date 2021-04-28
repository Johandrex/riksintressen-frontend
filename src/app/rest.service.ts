import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NationalInterest } from './nationalInterest';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  /*
    Do this in terminal :)
    npm install -g json-server
    json-server --watch coolDatabase.json
  */
  url: string = "http://localhost:3000/nationalInterests"; // Is accessed through a fake server
  getNationalInterests() {
    return this.http.get<NationalInterest[]>(this.url);
  }
}
