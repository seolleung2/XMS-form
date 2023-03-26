import { BaseLayout } from '@components/layout';
import FormGroup from '@components/formGroup';
import { useOrders } from 'hooks/api/orders';

export default function Home() {
  const { data: orderlist, isFetching } = useOrders({
    page: 1,
    size: 10,
  });

  console.log(orderlist);

  return (
    <BaseLayout>
      <div className="flex flex-col space-y-12">
        <FormGroup />
      </div>
    </BaseLayout>
  );
}
