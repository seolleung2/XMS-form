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
