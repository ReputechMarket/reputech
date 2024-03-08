import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-search-pagination',
  templateUrl: './search-pagination.component.html',
  styleUrls: ['./search-pagination.component.css']
})
export class SearchPaginationComponent {

  @Input()
  public totalPages!: number;

  @Output()
  public pageChanged = new EventEmitter<PageEvent>();

}