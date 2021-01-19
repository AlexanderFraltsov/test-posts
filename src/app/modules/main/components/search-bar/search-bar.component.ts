import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';

import { SearchService } from '../../services/search.service';
import { searchTypes, SEARCH_STRING } from '../../../../constants/constants';



@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnDestroy {

  public searchType: searchTypes = searchTypes.NAME;
  public form: FormGroup;

  public searchSubscription: Subscription;

  constructor(
    private searchService: SearchService
  ) {
    this.form = new FormGroup({
      [SEARCH_STRING]: new FormControl('')
    });

    this.searchSubscription = this.form.get(SEARCH_STRING)!.valueChanges
      .pipe(
        filter(str => str.trim().length >= 3),
        debounceTime(400)
      )
      .subscribe(
        query => {
          this.searchService.searchString$.next(query);
        }
      );
  }

  public onSearchTypeToggle( type: string ): void {
    this.searchType = (type as searchTypes);
    this.searchService.searchType$.next(type as searchTypes);
  }

  public ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
