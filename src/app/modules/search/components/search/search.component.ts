import { AfterViewInit, Input } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  searchElement: HTMLElement;
  search: string;
  @Input() searchPlaceholder: string;
  @Output() onSearch: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.startSearch();
  }

  private startSearch(): void {
    this.searchElement = document.getElementById('search');
    fromEvent<any>(this.searchElement, 'input').pipe(
      debounceTime(500),
    ).subscribe(event => {
      this.search = event.target.value;
      if (this.search && this.search.trim()) {
        this.onSearch.emit(this.search);
        console.log(this.search);
      }
      if (!this.search) {
        this.onSearch.emit(this.search);
      }
    });
  }



}
