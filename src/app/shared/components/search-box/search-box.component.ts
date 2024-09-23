import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>;
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output("searchEvent")
  public searchEvent: EventEmitter<string> = new EventEmitter();

  @ViewChild('txtInputSearch')
  public txtInputSearch!: ElementRef<HTMLInputElement>;

  public search(): void {
    this.searchEvent.emit(this.txtInputSearch.nativeElement.value);
  }

  onKeyPress( ) {
    this.debouncer.next(this.txtInputSearch.nativeElement.value);
  }

  ngOnInit(): void {

    this.debouncerSubscription =  this.debouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe ( value => {
        this.search();
    });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }


}
