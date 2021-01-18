import { searchTypes } from '../../../constants/constants';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchString$: BehaviorSubject<string> = new BehaviorSubject('');
  public searchType$: BehaviorSubject<searchTypes> = new BehaviorSubject<searchTypes>(searchTypes.NAME);

  constructor() { }
}
