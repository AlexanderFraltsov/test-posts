import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchString$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() { }
}
