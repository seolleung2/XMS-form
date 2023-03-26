import { useQuery } from '@tanstack/react-query';
import * as api from 'api/orders';
import { OrderFields } from 'types/form';

export const useOrders = ({ page, size }: { page: number; size: number }) => {
  return useQuery<{ orders: OrderFields[]; total: number }, unknown>(
    ['orderlist', page, size],
    () => api.getOrders({ page, size }),
    {
      refetchOnWindowFocus: false,
    }
  );
};
