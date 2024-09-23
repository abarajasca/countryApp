import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countriesService: CountriesService){

  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  public countries: Country[] = [];

  public onSearch(searchText: string): void {
    this.isLoading = true;
    this.countriesService.searchCapital(searchText).subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
