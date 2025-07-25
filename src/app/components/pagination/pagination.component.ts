import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgbPagination, CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() totalItems = 0;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();


  pageSizeOptions = [10, 25, 50, 100];
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  onPageChange(newPage: number) {
    this.pageChange.emit(newPage);
  }

  onPageSizeChange(event: Event) {
    const newSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pageSizeChange.emit(newSize);
    this.pageChange.emit(1);
  }


  get startItem(): number {
    return this.totalItems === 0 ? 0 : (this.page - 1) * this.pageSize + 1;
  }

  get endItem(): number {
    return Math.min(this.page * this.pageSize, this.totalItems);
  }
}
