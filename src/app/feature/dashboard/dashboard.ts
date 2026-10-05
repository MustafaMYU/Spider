import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';

import { BaseChartDirective } from 'ng2-charts';

import {
  ChartConfiguration,
  ChartData,
  ChartEvent,
} from 'chart.js';

import { DashboardServices } from '../../models/services/dashboard-services';

import {
  DashboardResponse,
  RecentTransaction,
} from '../../models/interfaces/dashboard-interface';

export interface DashboardItem {
  title: string;
  Number: number;
  icon: string;
  iconClass: string;
}

export interface DistributionItem {
  title: string;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [
    CommonModule,
    BaseChartDirective,
    DatePipe,
  ],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {

  // =========================================================
  // Current Date
  // =========================================================

  currentDate = new Date();

  private timer = setInterval(() => {
    this.currentDate = new Date();
  }, 1000);

  // =========================================================
  // Constructor
  // =========================================================

  constructor(
    private dashboardService: DashboardServices
  ) {}

  // =========================================================
  // Destroy
  // =========================================================

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  // =========================================================
  // API State
  // =========================================================

  dashboardData?: DashboardResponse;

  loading = false;

  errorMessage = '';

  // =========================================================
  // Net Cash Flow
  // =========================================================

  netCashFlow = 0;

  // =========================================================
  // Dashboard Cards
  // =========================================================

  dashboardItems: DashboardItem[] = [
    {
      title: 'فواتير المبيعات',
      Number: 0,
      icon: 'fa-solid fa-file-invoice-dollar',
      iconClass: 'bg-primary-subtle text-primary',
    },

    {
      title: 'فواتير المشتريات',
      Number: 0,
      icon: 'fa-solid fa-cart-shopping',
      iconClass: 'bg-success-subtle text-success',
    },

    {
      title: 'العملاء',
      Number: 0,
      icon: 'fa-solid fa-users',
      iconClass: 'bg-info-subtle text-info',
    },

    {
      title: 'الموردين',
      Number: 0,
      icon: 'fa-solid fa-truck-field',
      iconClass: 'bg-warning-subtle text-warning',
    },

    {
      title: 'الأصناف',
      Number: 0,
      icon: 'fa-solid fa-box-open',
      iconClass: 'bg-danger-subtle text-danger',
    },

    {
      title: 'سندات القبض',
      Number: 0,
      icon: 'fa-solid fa-money-bill-transfer',
      iconClass: 'bg-primary-subtle text-primary',
    },

    {
      title: 'سندات الصرف',
      Number: 0,
      icon: 'fa-solid fa-money-bill-wave',
      iconClass: 'bg-secondary-subtle text-secondary',
    },

    {
      title: 'الموظفين',
      Number: 0,
      icon: 'fa-solid fa-user-tie',
      iconClass: 'bg-dark-subtle text-dark',
    },
  ];

  // =========================================================
  // Finance
  // =========================================================

  financeItems = [
    {
      title: 'إجمالي المبيعات',
      amount: 0,
      borderClass: 'border-success',
    },

    {
      title: 'إجمالي المشتريات',
      amount: 0,
      borderClass: 'border-primary',
    },

    {
      title: 'المقبوضات',
      amount: 0,
      borderClass: 'border-warning',
    },

    {
      title: 'المصروفات',
      amount: 0,
      borderClass: 'border-danger',
    },
  ];

  // =========================================================
  // Recent Transactions
  // =========================================================

  tableItems: RecentTransaction[] = [];

  // =========================================================
  // Progress / Distribution Colors
  // =========================================================

  distributionItems: DistributionItem[] = [
    {
      title: 'المبيعات',
      percentage: 0,
      color: '#137aa8',
    },

    {
      title: 'المشتريات',
      percentage: 0,
      color: '#083448',
    },

    {
      title: 'سندات القبض',
      percentage: 0,
      color: '#22c55e',
    },

    {
      title: 'سندات الصرف',
      percentage: 0,
      color: '#6366f1',
    },

    {
      title: 'العملاء',
      percentage: 0,
      color: '#0891b2',
    },

    {
      title: 'الموردين',
      percentage: 0,
      color: '#6366f1',
    },

    {
      title: 'الأصناف',
      percentage: 0,
      color: '#94a3b8',
    },

    {
      title: 'الموظفين',
      percentage: 0,
      color: '#137aa8',
    },
  ];

  // =========================================================
  // Bar Chart
  // =========================================================

  @ViewChild(BaseChartDirective)
  chart?: BaseChartDirective;

  public barChartType: 'bar' = 'bar';

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {

    responsive: true,

    maintainAspectRatio: false,

    scales: {

      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: '#6c757d',

          font: {
            size: 11,
          },
        },
      },

      y: {

        beginAtZero: true,

        max: 100,

        ticks: {

          color: '#6c757d',

          font: {
            size: 11,
          },

          callback: (value) => {
            return value + '%';
          },
        },

        grid: {
          color: '#e9ecef',
        },
      },
    },

    plugins: {

      legend: {
        display: false,
      },

      tooltip: {

        mode: 'index',

        intersect: false,

        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          },
        },
      },
    },
  };

  public barChartLabels: string[] = [];

  public barChartData: ChartData<'bar'> = {

    labels: [],

    datasets: [

      {
        label: 'المبيعات',

        data: [],

        backgroundColor: '#137aa8',

        borderColor: '#137aa8',

        borderWidth: 1,

        borderRadius: 6,
      },

      {
        label: 'المشتريات',

        data: [],

        backgroundColor: '#083448',

        borderColor: '#083448',

        borderWidth: 1,

        borderRadius: 6,
      },
    ],
  };

  // =========================================================
  // Doughnut
  // =========================================================

  public doughnutChartLabels: string[] = [

    'المبيعات',

    'المشتريات',

    'سندات القبض',

    'سندات الصرف',

    'العملاء',

    'الموردين',

    'الأصناف',

    'الموظفين',
  ];

  public doughnutChartData: ChartData<'doughnut'> = {

    labels: this.doughnutChartLabels,

    datasets: [

      {
        data: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ],

        backgroundColor: [

          '#137aa8',

          '#083448',

          '#22c55e',

          '#6366f1',

          '#0891b2',

          '#6366f1',

          '#94a3b8',

          '#137aa8',
        ],

        borderWidth: 1,

        borderColor: '#ffffff',
      },
    ],
  };

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {

    responsive: true,

    maintainAspectRatio: false,

    cutout: '80%',

    plugins: {

      legend: {
        display: false,
      },

      title: {
        display: false,
      },
    },
  };

  public doughnutChartType: 'doughnut' = 'doughnut';

  // =========================================================
  // Quick Shortcuts
  // =========================================================

  quickItems = [

    {
      title: 'فاتورة مبيعات',

      description: 'إنشاء فاتورة جديدة',

      icon: 'fa-solid fa-receipt',

      color: '#137aa8',
    },

    {
      title: 'فاتورة مشتريات',

      description: 'إنشاء فاتورة مشتريات جديدة',

      icon: 'fa-solid fa-cart-shopping',

      color: '#083448',
    },

    {
      title: 'سند قبض',

      description: 'إنشاء سند قبض جديد',

      icon: 'fa-solid fa-money-bill-transfer',

      color: '#22c55e',
    },

    {
      title: 'سند صرف',

      description: 'إنشاء سند صرف جديد',

      icon: 'fa-solid fa-money-bill-wave',

      color: '#6366f1',
    },

    {
      title: 'العملاء',

      description: 'إدارة بيانات العملاء',

      icon: 'fa-solid fa-users',

      color: '#0891b2',
    },

    {
      title: 'الأصناف',

      description: 'إدارة الأصناف والمخزون',

      icon: 'fa-solid fa-box-open',

      color: '#94a3b8',
    },
  ];

  // =========================================================
  // On Init
  // =========================================================

  ngOnInit(): void {
    this.loadDashboard();
  }

  // =========================================================
  // Load Dashboard
  // =========================================================

  loadDashboard(): void {

    this.loading = true;

    this.errorMessage = '';

    this.dashboardService.getDashboard().subscribe({

      next: (apiResponse: any) => {

        console.log(
          'Dashboard API Response:',
          apiResponse
        );

        /*
          Supports both:

          {
            summary: {},
            recentTransactions: [],
            salesPurchasesRatio: []
          }

          OR

          {
            isSuccess: true,
            data: {
              summary: {},
              recentTransactions: [],
              salesPurchasesRatio: []
            }
          }
        */

        const response: DashboardResponse =
          apiResponse?.data ?? apiResponse;

        console.log(
          'Dashboard Data:',
          response
        );

        if (
          !response ||
          !response.summary
        ) {

          console.error(
            'Invalid Dashboard Response:',
            response
          );

          this.errorMessage =
            'بيانات لوحة التحكم غير صحيحة';

          this.loading = false;

          return;
        }

        // Store data

        this.dashboardData = response;

        // Load sections

        this.loadSummary(response);

        this.loadTransactions(response);

        this.loadSalesPurchasesChart(response);

        this.loadDistribution(response);

        this.loading = false;
      },

      error: (error) => {

        console.error(
          'Dashboard API Error:',
          error
        );

        this.errorMessage =
          'حدث خطأ أثناء تحميل بيانات لوحة التحكم';

        this.loading = false;
      },
    });
  }

  // =========================================================
  // Load Summary
  // =========================================================

  loadSummary(
    response: DashboardResponse
  ): void {

    const summary = response.summary;

    // -------------------------------------------------------
    // Cards
    // -------------------------------------------------------

    this.dashboardItems = [

      {
        title: 'فواتير المبيعات',

        Number: Number(
          summary.salesCount ?? 0
        ),

        icon:
          'fa-solid fa-file-invoice-dollar',

        iconClass:
          'bg-primary-subtle text-primary',
      },

      {
        title: 'فواتير المشتريات',

        Number: Number(
          summary.purchasesCount ?? 0
        ),

        icon:
          'fa-solid fa-cart-shopping',

        iconClass:
          'bg-success-subtle text-success',
      },

      {
        title: 'العملاء',

        Number: Number(
          summary.customerCount ?? 0
        ),

        icon:
          'fa-solid fa-users',

        iconClass:
          'bg-info-subtle text-info',
      },

      {
        title: 'الموردين',

        Number: Number(
          summary.supplierCount ?? 0
        ),

        icon:
          'fa-solid fa-truck-field',

        iconClass:
          'bg-warning-subtle text-warning',
      },

      {
        title: 'الأصناف',

        Number: Number(
          summary.productsCount ?? 0
        ),

        icon:
          'fa-solid fa-box-open',

        iconClass:
          'bg-danger-subtle text-danger',
      },

      {
        title: 'سندات القبض',

        Number: Number(
          summary.receiptCount ?? 0
        ),

        icon:
          'fa-solid fa-money-bill-transfer',

        iconClass:
          'bg-primary-subtle text-primary',
      },

      {
        title: 'سندات الصرف',

        Number: Number(
          summary.paymentCount ?? 0
        ),

        icon:
          'fa-solid fa-money-bill-wave',

        iconClass:
          'bg-secondary-subtle text-secondary',
      },

      {
        title: 'الموظفين',

        Number: Number(
          summary.employeesCount ?? 0
        ),

        icon:
          'fa-solid fa-user-tie',

        iconClass:
          'bg-dark-subtle text-dark',
      },
    ];

    // -------------------------------------------------------
    // Finance
    // -------------------------------------------------------

    this.financeItems = [

      {
        title: 'إجمالي المبيعات',

        amount: Number(
          summary.salesTotal ?? 0
        ),

        borderClass:
          'border-success',
      },

      {
        title: 'إجمالي المشتريات',

        amount: Number(
          summary.purchasesTotal ?? 0
        ),

        borderClass:
          'border-primary',
      },

      {
        title: 'المقبوضات',

        amount: Number(
          summary.receiptTotal ?? 0
        ),

        borderClass:
          'border-warning',
      },

      {
        title: 'المصروفات',

        amount: Number(
          summary.paymentTotal ?? 0
        ),

        borderClass:
          'border-danger',
      },
    ];

    // -------------------------------------------------------
    // Net Cash Flow
    // -------------------------------------------------------

    this.netCashFlow =

      Number(
        summary.receiptTotal ?? 0
      )

      -

      Number(
        summary.paymentTotal ?? 0
      );
  }

  // =========================================================
  // Recent Transactions
  // =========================================================

  loadTransactions(
    response: DashboardResponse
  ): void {

    this.tableItems =
      response.recentTransactions ?? [];
  }

  // =========================================================
  // Bar Chart
  // =========================================================

  loadSalesPurchasesChart(
    response: DashboardResponse
  ): void {

    const ratio =
      response.salesPurchasesRatio ?? [];

    console.log(
      'SALES PURCHASES RATIO:',
      ratio
    );

    if (!ratio.length) {

      this.barChartData = {

        labels: [],

        datasets: [

          {
            label: 'المبيعات',

            data: [],

            backgroundColor: '#137aa8',

            borderColor: '#137aa8',

            borderWidth: 1,

            borderRadius: 6,
          },

          {
            label: 'المشتريات',

            data: [],

            backgroundColor: '#083448',

            borderColor: '#083448',

            borderWidth: 1,

            borderRadius: 6,
          },
        ],
      };

      return;
    }

    this.barChartLabels =
      ratio.map(
        item => item.monthLabel
      );

    this.barChartData = {

      labels:
        this.barChartLabels,

      datasets: [

        {
          label: 'المبيعات',

          data:
            ratio.map(
              item =>
                Number(
                  item.salesPercentage ?? 0
                )
            ),

          backgroundColor:
            '#137aa8',

          borderColor:
            '#137aa8',

          borderWidth: 1,

          borderRadius: 6,
        },

        {
          label: 'المشتريات',

          data:
            ratio.map(
              item =>
                Number(
                  item.purchasesPercentage ?? 0
                )
            ),

          backgroundColor:
            '#083448',

          borderColor:
            '#083448',

          borderWidth: 1,

          borderRadius: 6,
        },
      ],
    };

    console.log(
      'CHART DATA:',
      this.barChartData
    );

    this.chart?.update();
  }

  // =========================================================
  // Distribution
  // =========================================================

  loadDistribution(
    response: DashboardResponse
  ): void {

    const summary =
      response.summary;

    const values = [

      Number(
        summary.salesCount ?? 0
      ),

      Number(
        summary.purchasesCount ?? 0
      ),

      Number(
        summary.receiptCount ?? 0
      ),

      Number(
        summary.paymentCount ?? 0
      ),

      Number(
        summary.customerCount ?? 0
      ),

      Number(
        summary.supplierCount ?? 0
      ),

      Number(
        summary.productsCount ?? 0
      ),

      Number(
        summary.employeesCount ?? 0
      ),
    ];

    const total =
      values.reduce(
        (sum, value) =>
          sum + value,
        0
      );

    const getPercentage = (
      value: number
    ): number => {

      if (!total) {
        return 0;
      }

      return Math.round(
        (value / total) * 100
      );
    };

    // =======================================================
    // Progress Bars
    // =======================================================

    this.distributionItems = [

      {
        title: 'المبيعات',

        percentage:
          getPercentage(values[0]),

        color: '#137aa8',
      },

      {
        title: 'المشتريات',

        percentage:
          getPercentage(values[1]),

        color: '#083448',
      },

      {
        title: 'سندات القبض',

        percentage:
          getPercentage(values[2]),

        color: '#22c55e',
      },

      {
        title: 'سندات الصرف',

        percentage:
          getPercentage(values[3]),

        color: '#6366f1',
      },

      {
        title: 'العملاء',

        percentage:
          getPercentage(values[4]),

        color: '#0891b2',
      },

      {
        title: 'الموردين',

        percentage:
          getPercentage(values[5]),

        color: '#6366f1',
      },

      {
        title: 'الأصناف',

        percentage:
          getPercentage(values[6]),

        color: '#94a3b8',
      },

      {
        title: 'الموظفين',

        percentage:
          getPercentage(values[7]),

        color: '#137aa8',
      },
    ];

    // =======================================================
    // Doughnut
    // =======================================================

    this.doughnutChartData = {

      labels:
        this.doughnutChartLabels,

      datasets: [

        {
          data: values,

          backgroundColor: [

            '#137aa8',

            '#083448',

            '#22c55e',

            '#6366f1',

            '#0891b2',

            '#6366f1',

            '#94a3b8',

            '#137aa8',
          ],

          borderWidth: 1,

          borderColor:
            '#ffffff',
        },
      ],
    };
  }

  // =========================================================
  // Chart Click
  // =========================================================

  chartClicked(
    event: {
      event?: ChartEvent;
      active?: object[];
    }
  ): void {

    console.log(
      'Chart clicked:',
      event
    );
  }

  // =========================================================
  // Chart Hover
  // =========================================================

  chartHovered(
    event: {
      event?: ChartEvent;
      active?: object[];
    }
  ): void {

    console.log(
      'Chart hovered:',
      event
    );
  }
}
