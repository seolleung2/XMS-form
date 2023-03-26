import axios from 'axios';

export const getOrders = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const { data } = await axios.get('/orders', {
    params: {
      page,
      size,
    },
  });

  return data.data;
};
