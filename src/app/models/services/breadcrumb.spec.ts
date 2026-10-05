import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {

  // فارغة في البداية لأن Dashboard لا يحتاج اسم إضافي
  private currentSectionSubject =
    new BehaviorSubject<string>('');

  currentSection$ =
    this.currentSectionSubject.asObservable();

  constructor(private router: Router) {

    // أول تحميل
    this.updateSection(this.router.url);

    // عند تغيير الصفحة
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        this.updateSection(event.urlAfterRedirects);
      });
  }

  private updateSection(url: string): void {

    const cleanUrl = url
      .split('?')[0]
      .split('#')[0];

    // Dashboard
    if (
      cleanUrl === '/' ||
      cleanUrl === '/dashboard'
    ) {
      this.currentSectionSubject.next('الرئيسية');
      return;
    }

    // Products
    if (cleanUrl.startsWith('/products/')) {
      this.currentSectionSubject.next('الأصناف');
      return;
    }

    // Purchases
    if (cleanUrl.startsWith('/purchases/')) {
      this.currentSectionSubject.next('المشتريات');
      return;
    }

    // Sales
    if (cleanUrl.startsWith('/sales/')) {
      this.currentSectionSubject.next('المبيعات');
      return;
    }

    // Accounting
    if (cleanUrl.startsWith('/accounting/')) {
      this.currentSectionSubject.next('الحسابات');
      return;
    }

    // Cost Centers & Projects
    if (
      cleanUrl.startsWith('/cost-centers') ||
      cleanUrl.startsWith('/projects')
    ) {
      this.currentSectionSubject.next(
        'مراكز التكلفة والمشاريع'
      );
      return;
    }

    // Customers & Suppliers
    if (
      cleanUrl.startsWith('/customers') ||
      cleanUrl.startsWith('/suppliers') ||
      cleanUrl.startsWith('/branches')
    ) {
      this.currentSectionSubject.next(
        'العملاء والموردين'
      );
      return;
    }

    // Barcode
    if (cleanUrl.startsWith('/barcodes')) {
      this.currentSectionSubject.next('الباركود');
      return;
    }

    // Manufacturing
    if (cleanUrl.startsWith('/manufacturing')) {
      this.currentSectionSubject.next('التصنيع');
      return;
    }

    // Users
    if (
      cleanUrl.startsWith('/users') ||
      cleanUrl.startsWith('/user-groups') ||
      cleanUrl.startsWith('/permissions')
    ) {
      this.currentSectionSubject.next(
        'المستخدمون والصلاحيات'
      );
      return;
    }

    // HR
    if (cleanUrl.startsWith('/hr')) {
      this.currentSectionSubject.next(
        'الموارد البشرية والأقسام'
      );
      return;
    }

    // Reports
    if (cleanUrl.startsWith('/reports')) {
      this.currentSectionSubject.next('التقارير');
      return;
    }

    // Settings
    if (cleanUrl.startsWith('/settings')) {
      this.currentSectionSubject.next('الإعدادات');
      return;
    }

    // Default
    this.currentSectionSubject.next(' الرئيسيه');
  }
}
