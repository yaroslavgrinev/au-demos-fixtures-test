import { Component, OnInit } from '@angular/core';
import { Fixture } from 'src/app/models/fixture';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { FixturesService } from 'src/app/services/fixtures.service';
import { FormControl, FormGroup } from '@angular/forms';
import { switchMap, tap, debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators'

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  searchResults: Fixture[] = [];

  myForm = new FormGroup({
    searchField: new FormControl()
  });

  displayedColumns: string[] = ['fixtureName', 'kickoff', 'venue'];

  isLoading: Observable<boolean> = of(false);

  constructor(private fixturesService: FixturesService) { }

  ngOnInit() {
    this.myForm.controls.searchField.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(_ => this.isLoading = of(true)),
      switchMap(val => this.fixturesService.getFixtures(val)),
      tap(_ => this.isLoading = of(false))
    ).subscribe(data => this.searchResults = data);
  }

}
