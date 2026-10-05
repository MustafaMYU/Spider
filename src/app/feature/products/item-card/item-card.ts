
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-item-card',
  styleUrl: './item-card.css',
  templateUrl: './item-card.html',
})
export class ItemCard {

items = [
  {
    series: 1,
    code: 'PRD-001',
    name: 'لابتوب HP',
    type: 'منتج',
    vat: '15%',
    transitionalTax: '0%',
    units: 3
  },
  {
    series: 2,
    code: 'PRD-002',
    name: 'ماوس Logitech',
    type: 'منتج',
    vat: '15%',
    transitionalTax: '0%',
    units: 2
  },
  {
    series: 3,
    code: 'SRV-001',
    name: 'خدمة صيانة',
    type: 'خدمة',
    vat: '15%',
    transitionalTax: '0%',
    units: 1
  },
  {
    series: 4,
    code: 'PRD-003',
    name: 'كيبورد',
    type: 'منتج',
    vat: '15%',
    transitionalTax: '0%',
    units: 4
  }
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


  // =========================================================
  // Search Type
  // =========================================================

  searchType: 'code' | 'name' = 'code';

  searchTypeOpen = false;

  get searchPlaceholder(): string {
    return this.searchType === 'code'
      ? 'ابحث بالكود'
      : 'ابحث باسم الصنف';
  }

  selectSearchType(
    type: 'code' | 'name'
  ): void {

    this.searchType = type;

    this.searchTypeOpen = false;
  }










}
