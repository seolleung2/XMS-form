export interface FormFields {
  name: string;
  phoneNumber: string;
  fromDate: number;
  toDate: number;
  item: string;
  itemDetail: string;
  supply: string;
  supplyDetail: string;
  address: string;
  loadPlace: LoadPlaceFields[];
}

export interface LoadPlaceFields {
  name: string;
  address: string;
  date: number;
}

export interface ReqBody {
  name: string;
  phoneNumber: string;
  fromDate: string;
  toDate: string;
  item: string;
  itemDetail: string;
  supply: string;
  supplyDetail: string;
  address: string;
  loadPlace: ReqPlaceFields[];
}

export interface ReqPlaceFields {
  name: string;
  address: string;
  date: string;
}

export interface OrderFields extends ReqBody {
  seqNo: number;
}

export interface ResponseType {
  orders: OrderFields[];
  total: number;
}

export interface PageType {
  page: number;
  size: number;
}
