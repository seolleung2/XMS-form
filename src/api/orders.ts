import axios from 'axios';
import { PageType, ReqBody } from 'types/form';

export const getOrders = async ({ page, size }: PageType) => {
  const { data } = await axios.get('/orders', {
    params: {
      page,
      size,
    },
  });

  return data.data;
};

export const addOrder = async (body: ReqBody) => {
  const { data } = await axios.post('/order', body);

  return data;
};

export const deleteOrder = async (ids: number[]) => {
  const { data } = await axios.delete('/order', {
    data: {
      ids,
    },
  });

  return data;
};
