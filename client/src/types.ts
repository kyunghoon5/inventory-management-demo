
export interface Receive {
  id: number;
  invno: string;
  vendno: string;
  purdate: string;
  shpdate: string;
  reqdate: string;
  recdate: string;
  invoiceDes: string
}

export interface Vendor {
  list_no: number;
  vendor: string;
  region: string;
  vendor_name: string;
  open_orders?: number;
}

export interface ProductsMain {
  brand_name: string;
  class: string;
  cost: number;
  descrip: string;
  length_cat: string;
  num_of_pd: number;
  onhand: number;
  percentile: number;
  price: number;
  qtybo: number;
  qtyshp: number;
  rank: number;
  wowTrend: number;
  vendno: string;
  target_qtyshp: number;
  days_left: number;
  sale_on: number
}

export interface NewLaunchType {
  class: string;
  descrip: string;
  recqty: number;
  onhand: number;
  sample_qty: number;
  start_dte: string; 
  vend_image_url?: string;
  qtyshp?: number;
  sales_qty_30days?: number;
  sales_qty_60days?: number;
  sales_qty_90days?: number;
}

export interface ScheduleCalType {
  invno: string;
  vendno: string;
  purno: number;
  descrip: string;
  purdate: string;
  shpdate: string
  reqdate: string;
  recdate: string;
  qtyord: number;
  amount: number;
  newitem: string;
  weight: number;
  ctns: number;
}

export interface GrowthPlanType {
  SalesmanName: string;
  month: number;
  qtyshp: number;
  year: number;  
}