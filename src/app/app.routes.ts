import { Routes } from '@angular/router';
import { authGuard } from './models/guards/guest-guard-guard';

export const routes: Routes = [
  // =====================================================
  // Root
  // =====================================================

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // =====================================================
  // Login
  // =====================================================

  {
    path: 'login',
    loadComponent: () => import('./layout/login/login').then((m) => m.Login),
  },

  // =====================================================
  // ERP Layout
  // =====================================================

  {
    path: '',
    loadComponent: () => import('./layout/erp-layout/erp-layout').then((m) => m.ErpLayout),

    canActivateChild: [authGuard],

    children: [
      // =================================================
      // Dashboard
      // =================================================

      {
        path: 'dashboard',
        loadComponent: () => import('./feature/dashboard/dashboard').then((m) => m.Dashboard),
      },

      // =================================================
      // Products
      // =================================================

      {
        path: 'products',

        children: [
          {
            path: 'units',
            loadComponent: () => import('./feature/products/units/units').then((m) => m.Units),
          },

          {
            path: 'categories',
            loadComponent: () =>
              import('./feature/products/categories/categories').then((m) => m.Categories),
          },

          {
            path: 'groups',
            loadComponent: () => import('./feature/products/groups/groups').then((m) => m.Groups),
          },

          {
            path: 'item-card',
            loadComponent: () =>
              import('./feature/products/item-card/item-card').then((m) => m.ItemCard),
          },

          {
            path: 'stores',
            loadComponent: () => import('./feature/products/stores/stores').then((m) => m.Stores),
          },

          {
            path: '',
            redirectTo: 'units',
            pathMatch: 'full',
          },
        ],
      },

      // =================================================
      // Purchases
      // =================================================

      {
        path: 'purchases',

        children: [
          {
            path: 'requests',
            loadComponent: () => import('./feature/purchases/order/order').then((m) => m.Order),
          },
          {
            path: 'invoices',
            loadComponent: () => import('./feature/purchases/bill/bill').then((m) => m.Bill),
          },
          {
            path: 'returns',
            loadComponent: () =>
              import('./feature/purchases/returns/returns').then((m) => m.Returns),
          },
          {
            path: '',
            redirectTo: 'order',
            pathMatch: 'full',
          },
        ],
      },

      // =================================================
      // sales
      // =================================================

      {
        path: 'sales',

        children: [
          {
            path: 'quotations',
            loadComponent: () => import('./feature/sales/sales-quotations/sales-quotations').then((m) => m.SalesQuotations),
          },
          {
            path: 'bill',
            loadComponent: () => import('./feature/sales/sales-bill/sales-bill').then((m) => m.SalesBill),
          },
          {
            path: 'returns',
            loadComponent: () => import('./feature/sales/sales-returns/sales-returns').then((m) => m.SalesReturns),
          },
          {
            path: '',
            redirectTo: 'order',
            pathMatch: 'full',
          },
        ],
      },


        // =================================================
      // Accounts
      // =================================================

      {
        path: 'accounts',

        children: [

          // سند صرف
          {
            path: 'payment-voucher',

            loadComponent: () =>
              import('./feature/accounts/payment-voucher/payment-voucher')
                .then((m) => m.PaymentVoucher),
          },

          // سند قبض
          {
            path: 'receipt-voucher',

            loadComponent: () =>
              import('./feature/accounts/receipt-voucher/receipt-voucher')
                .then((m) => m.ReceiptVoucher),
          },

          // شجرة الحسابات
          {
            path: 'account-tree',

            loadComponent: () =>
              import('./feature/accounts/account-tree/account-tree')
                .then((m) => m.AccountTree),
          },

          // القيود اليومية
          {
            path: 'journal-entries',

            loadComponent: () =>
              import('./feature/accounts/journal-entries/journal-entries')
                .then((m) => m.JournalEntries),
          },

          // فتح وغلق السنة المالية
          {
            path: 'fiscal-year',

            loadComponent: () =>
              import('./feature/accounts/fiscal-year/fiscal-year')
                .then((m) => m.FiscalYear),
          },

          // Default Accounts
          {
            path: '',
            redirectTo: 'account-tree',
            pathMatch: 'full',
          },
        ],
      },

      // =================================================
      // ERP Default
      // =================================================

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },

  // =====================================================
  // 404
  // =====================================================

  {
    path: '**',
    redirectTo: 'login',
  },
];
