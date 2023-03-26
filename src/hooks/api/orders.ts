import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import * as api from 'api/orders';
import { OrderFields, PageType, ReqBody } from 'types/form';

export const useOrders = ({ page, size }: PageType) => {
  return useQuery<{ orders: OrderFields[]; total: number }, unknown>(
    ['orderlist', page, size],
    () => api.getOrders({ page, size }),
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useAddOrderMutation = (
  successCallback: (result: {
    success: boolean;
    message: string;
    data: OrderFields;
  }) => void
) => {
  const client = useQueryClient();
  return useMutation((body: ReqBody) => api.addOrder(body), {
    onSuccess: (result) => {
      client
        .invalidateQueries(['orderlist'])
        .then(() => successCallback(result));
    },
  });
};
