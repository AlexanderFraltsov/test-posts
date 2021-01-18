import { filter, debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { SearchService } from '../../services/search.service';

enum searchTypes {
  NAME = 'имени автора',
  DATE = 'дате создания',
  WORD = 'ключевому слову',
  DOCUMENT = 'названию документа'
}

const SEARCH_STRING = 'searchString';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnDestroy {

  public searchType: string = searchTypes.NAME;
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
          console.log(query);
          this.searchService.searchString$.next(query);
        }
      );
  }

  public onSearchTypeToggle( type: string ): void {
    this.searchType = type;
  }

  public ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
