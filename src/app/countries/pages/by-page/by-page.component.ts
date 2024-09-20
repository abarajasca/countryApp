import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-page',
  templateUrl: './by-page.component.html',
  styles: [
  ]
})
export class ByPageComponent implements OnInit {

  public country? : Country;

  constructor(private activatedRoute: ActivatedRoute,
              private countriesService: CountriesService,
              private router: Router){

  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesService.searchCountryByAlphaCode( id ))
      )
      .subscribe( country => {
            if ( !country ){
              this.router.navigateByUrl('');
            } else {
              this.country = country!;
            }
        });
  }

}
