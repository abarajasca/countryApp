import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions: Region[] = ["America","Asia","Africa","Oceania","Europe"];
  public selectedRegion?: Region;
  public isLoading: boolean = false;
  public initialValue: Region = '';

  constructor(private countriesService: CountriesService){

  }
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  public onSearch(searchText: Region): void {
    this.selectedRegion = searchText;
    this.isLoading = true;
    this.countriesService.searchRegion(searchText).subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
