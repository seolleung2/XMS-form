import { useForm, FormProvider } from 'react-hook-form';
import { BaseLayout } from '@components/layout';
import FormGroup from '@components/formGroup';
import { useOrders } from 'hooks/api/orders';
import { FormFields } from 'types/form';
import { DEFAULT_VALUES } from 'constant/form';

export default function Home() {
  const methods = useForm<FormFields>({
    mode: 'all',
    defaultValues: DEFAULT_VALUES,
  });

  const { data: orderlist, isFetching } = useOrders({
    page: 1,
    size: 10,
  });

  console.log(orderlist);

  return (
    <BaseLayout>
      <FormProvider {...methods}>
        <div className="flex flex-col space-y-12">
          <FormGroup />
        </div>
      </FormProvider>
    </BaseLayout>
  );
}
