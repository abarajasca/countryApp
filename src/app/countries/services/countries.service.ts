import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country, Languages } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  public searchCapital(term: string) : Observable<Country[]>{
    return this.httpClient.get<Country[]>(`${this.apiUrl }/capital/${term}`)
      .pipe(
        catchError( error => of([]) )
      );
  }

  public searchCountry(term: string) : Observable<Country[]>{
    return this.httpClient.get<Country[]>(`${this.apiUrl }/name/${term}`)
      .pipe(
        catchError( error => of([]) )
      );
  }

  public searchRegion(term: string) : Observable<Country[]>{
    return this.httpClient.get<Country[]>(`${this.apiUrl }/region/${term}`)
      .pipe(
        catchError( error => of([]) )
      );
  }

  public searchCountryByAlphaCode(code: string): Observable<Country | null > {
    return this.httpClient.get<Country[]>(`${this.apiUrl }/alpha/${code}`)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError( error => of(null) )
      );
  }
}
