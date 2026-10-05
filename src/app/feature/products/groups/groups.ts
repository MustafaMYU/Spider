
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-groups',
  styleUrls: ['./groups.css' , '../../../shared/product.css'] ,
  templateUrl: './groups.html',
})
export class Groups {

items = [
  { series: 1, unitName: 'الاضافات' },
  { series: 2, unitName: 'القساوه' },
  { series: 1, unitName: 'الاضافات' },
  { series: 2, unitName: 'القساوه' },


];

currentPage = 1;
pageSize = 7;

get totalPages(): number {
  return Math.ceil(this.items.length / this.pageSize);
}

get paginatedItems() {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.items.slice(start, start + this.pageSize);
}

get startItem(): number {
  if (this.items.length === 0) {
    return 0;
  }

  return (this.currentPage - 1) * this.pageSize + 1;
}

get endItem(): number {
  return Math.min(this.currentPage * this.pageSize, this.items.length);
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

previousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

changePageSize(): void {
  this.currentPage = 1;
}














}
