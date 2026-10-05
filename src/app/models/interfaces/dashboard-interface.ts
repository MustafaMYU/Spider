export interface DashboardResponse {
  summary: DashboardSummary;
  recentTransactions: RecentTransaction[];
  salesPurchasesRatio: SalesPurchasesRatio[];
}

export interface DashboardSummary {
  employeesCount: number;
  productsCount: number;

  salesCount: number;
  purchasesCount: number;

  customerCount: number;
  supplierCount: number;

  receiptCount: number;
  paymentCount: number;

  salesTotal: number;
  purchasesTotal: number;

  receiptTotal: number;
  paymentTotal: number;
}

export interface RecentTransaction {
  id: number;

  reference: string | null;

  partyName: string | null;

  amount: number;

  transactionDate: string;

  transactionType: string;
}

export interface SalesPurchasesRatio {
  monthStart: string;

  monthLabel: string;

  salesPercentage: number;

  purchasesPercentage: number;
}
