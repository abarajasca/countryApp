import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = '';

  @Output("searchEvent")
  public searchEvent: EventEmitter<string> = new EventEmitter();

  @ViewChild('txtInputSearch')
  public txtInputSearch!: ElementRef<HTMLInputElement>;

  public search(): void {
    this.searchEvent.emit(this.txtInputSearch.nativeElement.value);
  }
}
