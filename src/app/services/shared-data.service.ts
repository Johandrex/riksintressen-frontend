import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private idSource = new BehaviorSubject<number>(0);
  currentId = this.idSource.asObservable();

  constructor() { }

  changeIdofNationalInterestDisplayed(id: number) {
    this.idSource.next(id);
  }

}
