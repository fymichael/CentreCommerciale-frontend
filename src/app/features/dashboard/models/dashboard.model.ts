export interface MallDashboard {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalShops: number;
  activeShops: number;
  inactiveShops: number;
  totalRevenu: number;
}

export interface MallGraph {
  month: number;
  totalRevenue: number;
  totalSubscriptions: number;
}

export interface ShopDashboard {
  totalClients: number;
  totalProducts: number;
  totalRevenu: number;
  totalCump: number;
}

export interface ShopGraph {
  month: number;
  totalOrders: number;
}

export interface DashboardResponse {
  type: 'mall' | 'shop';
  dashboard: MallDashboard | ShopDashboard;
  graphSubscriptions?: MallGraph[];
  graphInvoices?: ShopGraph[];
}