import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface SalesReturnItem {
  series: number;
  returnNumber: string;
  date: string;
  customer: string;
  phone: string;
  invoiceType: string;
  net: number;
}

@Component({
  selector: 'app-sales-returns',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sales-returns.html',
  styleUrls: [
    './sales-returns.css',
    './../../products/item-card/item-card.css'
  ],
})
export class SalesReturns {

  // =========================================================
  // Items
  // =========================================================

  items: SalesReturnItem[] = [
    {
      series: 1,
      returnNumber: 'RET-001',
      date: '2026-10-01',
      customer: 'أحمد محمد',
      phone: '01012345678',
      invoiceType: 'نقدي',
      net: 1500,
    },

    {
      series: 2,
      returnNumber: 'RET-002',
      date: '2026-10-02',
      customer: 'محمد علي',
      phone: '01123456789',
      invoiceType: 'آجل',
      net: 750,
    },

    {
      series: 3,
      returnNumber: 'RET-003',
      date: '2026-10-03',
      customer: 'شركة النور',
      phone: '01234567890',
      invoiceType: 'نقدي',
      net: 2200,
    },
  ];

  // =========================================================
  // Pagination
  // =========================================================

  currentPage = 1;

  pageSize = 7;

  get totalPages(): number {
    return Math.max(
      1,
      Math.ceil(this.items.length / this.pageSize)
    );
  }

  get paginatedItems(): SalesReturnItem[] {
    const start =
      (this.currentPage - 1) * this.pageSize;

    return this.items.slice(
      start,
      start + this.pageSize
    );
  }

  get startItem(): number {
    if (this.items.length === 0) {
      return 0;
    }

    return (
      (this.currentPage - 1) *
      this.pageSize
    ) + 1;
  }

  get endItem(): number {
    return Math.min(
      this.currentPage * this.pageSize,
      this.items.length
    );
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
  // Search
  // =========================================================

  searchType: 'code' | 'name' = 'code';

  searchTypeOpen = false;

  get searchPlaceholder(): string {
    return this.searchType === 'code'
      ? 'ابحث برقم المرتجع'
      : 'ابحث باسم العميل';
  }

  selectSearchType(
    type: 'code' | 'name'
  ): void {
    this.searchType = type;
    this.searchTypeOpen = false;
  }
}
