import { FormFields } from 'types/form';

export interface ItemSelectionType {
  id: string;
  itemType: string;
}

export const ITEM_SELECTION = [
  { id: '1', itemType: '냉장품' },
  { id: '2', itemType: '냉동품' },
  { id: '3', itemType: '직접입력' },
];

export const SUPPLY_SELECTION = [
  { id: '1', itemType: 'PLT' },
  { id: '2', itemType: 'BOX' },
  { id: '3', itemType: 'EA' },
];

export const DEFAULT_VALUES: FormFields = {
  name: '',
  phoneNumber: '',
  fromDate: 0,
  toDate: 0,
  item: '',
  itemDetail: '',
  supply: '',
  supplyDetail: '',
  address: '',
  loadPlace: [
    {
      name: '',
      address: '',
      date: 0,
    },
  ],
};
