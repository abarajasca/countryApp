import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  public cacheStore : CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore',JSON.stringify( this.cacheStore ) );
  }

  private loadFromLocalStorage() {
    if ( !localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
  }

  private getCountryRequest(url: string ): Observable<Country[]> {
    return this.httpClient.get<Country[]>( url )
      .pipe(
        catchError( error => of([]) ),
      );
  }

  public searchCapital(term: string) : Observable<Country[]>{
    const url = `${this.apiUrl }/capital/${term}`;
    return this.getCountryRequest(url)
      .pipe(
        map( countries => countries.sort(this.sortCountries)),
        tap( countries => this.cacheStore.byCapital = { term,countries}),
        tap( () => this.saveToLocalStorage()),
      );
  }

  public searchCountry(term: string) : Observable<Country[]>{
    const url = `${this.apiUrl }/name/${term}`;
    return this.getCountryRequest(url)
      .pipe(
        map ( countries => countries.sort(this.sortCountries)),
        tap ( countries => this.cacheStore.byCountries = {term,countries}),
        tap( () => this.saveToLocalStorage())
      );
  }

  public searchRegion(term: string) : Observable<Country[]>{
    const url = `${this.apiUrl }/region/${term}`;
    return this.getCountryRequest(url)
      .pipe(
        map( countries => countries.sort(this.sortCountries)),
        tap( countries => this.cacheStore.byRegion = { region: term as Region, countries}),
        tap ( () => { this.saveToLocalStorage()} )
      );
  }

  public searchCountryByAlphaCode(code: string): Observable<Country | null > {
    return this.httpClient.get<Country[]>(`${this.apiUrl }/alpha/${code}`)
      .pipe(
        map( countries => countries.sort(this.sortCountries)),
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError( error => of(null) )
      );
  }

  private sortCountries(a: Country, b: Country): number {
    return (b.population - a.population);
  }
}
