import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SEARCH_STRING, searchTypes } from '../../../../constants/constants';
import { SearchService } from '../../services/search.service';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbModule
      ],
      providers: [ SearchService ]
    })
    .compileComponents();
    searchService = TestBed.inject(SearchService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search string', fakeAsync(() => {
    const longQuery = 'longQuery';
    component.form.patchValue({
      [SEARCH_STRING]: longQuery
    });

    tick(500);

    expect(searchService.searchString$.getValue()).toBe(longQuery);
  }));

  it('should not emit search string', fakeAsync(() => {
    const shortQuery = 's';
    component.form.patchValue({
      [SEARCH_STRING]: shortQuery
    });

    tick(500);

    expect(searchService.searchString$.getValue()).toBe('');
  }));

  it('should change search type', () => {
    const newValue = searchTypes.DATE;
    component.onSearchTypeToggle(newValue);
    expect(searchService.searchType$.getValue()).toBe(newValue);
    expect(component.searchType).toBe(newValue);
  });
});
