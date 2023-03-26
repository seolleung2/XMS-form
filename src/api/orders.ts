import axios from 'axios';
import { PageType } from 'types/form';

export const getOrders = async ({ page, size }: PageType) => {
  const { data } = await axios.get('/orders', {
    params: {
      page,
      size,
    },
  });

  return data.data;
};
