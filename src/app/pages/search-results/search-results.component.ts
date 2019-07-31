import { Component, Input } from '@angular/core';
import { Fixture } from 'src/app/models/fixture';

// Didn't have enough time to implement p.5 properly;
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {

  @Input()
  private searchResults: Fixture[] = [];
}
