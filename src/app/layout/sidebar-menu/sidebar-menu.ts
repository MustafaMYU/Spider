import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface SidebarItem {
  title: string;
  breadcrumb?: string;
  icon?: string;
  route?: string;
  children?: SidebarItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.css',
})
export class SidebarMenu {
  @Input() isOpen = false;

  sidebarItems: SidebarItem[] = [
    // =========================
    // Dashboard
    // =========================
    {
      title: 'لوحه التحكم',
      breadcrumb: 'الرئيسية',
      route: '/dashboard',
    },

    // =========================
    // Products
    // =========================
    {
      title: 'الأصناف',
      icon: 'fa-solid fa-box',
      children: [
        {
          title: 'وحدات الأصناف',
          route: '/products/units',
        },

        {
          title: 'الفئات',
          route: '/products/categories',
        },

        {
          title: 'المجموعات',
          route: '/products/groups',
        },

        {
          title: 'كارت الصنف',
          route: '/products/item-card',
        },

        {
          title: 'المخازن',
          route: '/products/stores',
        },
      ],
    },

    // =========================
    // Purchases
    // =========================
    {
      title: 'المشتريات',
      icon: 'fa-solid fa-cart-shopping',
      children: [
        {
          title: 'طلب الشراء',
          route: '/purchases/requests',
        },

        {
          title: 'فاتورة الشراء',
          route: '/purchases/invoices',
        },

        {
          title: 'مرتجعات المشتريات',
          route: '/purchases/returns',
        },
      ],
    },

    // =========================
    // Sales
    // =========================
    {
      title: 'المبيعات',
      icon: 'fa-solid fa-cash-register',
      children: [
        {
          title: 'عرض أسعار المبيعات',
          route: '/sales/quotations',
        },
        {
          title: 'فاتورة مبيعات',
          route: '/sales/bill',
        },

        {
          title: 'مرتجعات المبيعات',
          route: '/sales/returns',
        },
      ],
    },
    // =========================
    // Accounting
    // =========================
    {
      title: 'الحسابات',
      icon: 'fa-solid fa-wallet',

      children: [

        {
          title: 'شجرة الحسابات',
          route: '/accounts/account-tree',
        },

        {
          title: 'القيود اليومية',
          route: '/accounts/journal-entries',
        },

        {
          title: 'فتح وإغلاق السنة المالية',
          route: '/accounts/fiscal-year',
        },

        {
          title: 'سند قبض مبسط',
          route: '/accounts/receipt-voucher',
        },

        {
          title: 'سند صرف مبسط',
          route: '/accounts/payment-voucher',
        },

      ],
    },
    // =========================
    // Cost Centers & Projects
    // =========================
    {
      title: 'مراكز التكلفة والمشاريع',
      icon: 'fa-solid fa-coins',
      children: [
        {
          title: 'مركز التكلفة',
          route: '/cost-centers',
        },

        {
          title: 'المشاريع',
          route: '/projects',
        },
      ],
    },

    // =========================
    // Customers & Suppliers
    // =========================
    {
      title: 'العملاء والموردين',
      icon: 'fa-solid fa-users',
      children: [
        {
          title: 'العملاء',
          route: '/customers',
        },

        {
          title: 'الموردين',
          route: '/suppliers',
        },

        {
          title: 'الفروع',
          route: '/branches',
        },
      ],
    },

    // =========================
    // Barcode
    // =========================
    {
      title: 'الباركود',
      icon: 'fa-solid fa-barcode',
      children: [
        {
          title: 'طباعة الباركود',
          route: '/barcodes/print',
        },
      ],
    },

    // =========================
    // Manufacturing
    // =========================
    {
      title: 'التصنيع',
      icon: 'fa-solid fa-industry',
      children: [
        {
          title: 'الكاشير',
          route: '/manufacturing/cashier',
        },

        {
          title: 'قبول طلب الإنتاج',
          route: '/manufacturing/accept-production',
        },

        {
          title: 'التسكين',
          route: '/manufacturing/putaway',
        },

        {
          title: 'التحويلات',
          route: '/manufacturing/transfers',
        },

        {
          title: 'طباعة باركود',
          route: '/manufacturing/barcode',
        },

        {
          title: 'سجلات تسجيل الخروج',
          route: '/manufacturing/logout-records',
        },

        {
          title: 'الإعدادات',
          route: '/manufacturing/settings',
        },
      ],
    },

    // =========================
    // Users & Permissions
    // =========================
    {
      title: 'المستخدمون والصلاحيات',
      icon: 'fa-solid fa-user-shield',
      children: [
        {
          title: 'المستخدمون',
          route: '/users',
        },

        {
          title: 'المجموعات',
          route: '/user-groups',
        },

        {
          title: 'الصلاحيات',
          route: '/permissions',
        },
      ],
    },

    // =========================
    // Human Resources
    // =========================
    {
      title: 'الموارد البشرية والأقسام',
      icon: 'fa-solid fa-people-group',
      children: [
        {
          title: 'الموظفون',
          route: '/hr/employees',
        },

        {
          title: 'إثبات رواتب',
          route: '/hr/salary-proof',
        },

        {
          title: 'صرف الرواتب',
          route: '/hr/payroll',
        },

        {
          title: 'الإضافات',
          route: '/hr/additions',
        },

        {
          title: 'البدلات',
          route: '/hr/allowances',
        },

        {
          title: 'استلام العهدة',
          route: '/hr/custody-receipt',
        },

        {
          title: 'العهد',
          route: '/hr/assets',
        },
      ],
    },

    // =========================
    // Reports
    // =========================
    {
      title: 'التقارير',
      icon: 'fa-solid fa-chart-column',
      children: [
        {
          title: 'مركز التقارير',
          route: '/reports',
        },
      ],
    },

    // =========================
    // Settings
    // =========================
    {
      title: 'الإعدادات',
      icon: 'fa-solid fa-gear',
      children: [
        {
          title: 'الملف الشخصي',
          route: '/settings/profile',
        },

        {
          title: 'الحسابات الافتراضية',
          route: '/settings/default-accounts',
        },

        {
          title: 'الإعدادات العامة',
          route: '/settings/general',
        },

        {
          title: 'تصفير قاعدة البيانات',
          route: '/settings/reset-database',
        },
      ],
    },
  ];

  toggleItem(item: SidebarItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }
}
