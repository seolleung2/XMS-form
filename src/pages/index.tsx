import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { BaseLayout } from '@components/layout';
import FormGroup from '@components/formGroup';
import OrderTable from '@components/orderTable';
import { useOrders } from 'hooks/api/orders';
import { FormFields, PageType } from 'types/form';
import { DEFAULT_VALUES } from 'constant/form';

export default function Home() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const [searchInfo, setSearchInfo] = useState<PageType>({
    page: 1,
    size: 20,
  });

  const methods = useForm<FormFields>({
    mode: 'all',
    defaultValues: DEFAULT_VALUES,
  });

  const { data: orderlist, isFetching } = useOrders({
    page: searchInfo.page,
    size: searchInfo.size,
  });

  return (
    <BaseLayout>
      <FormProvider {...methods}>
        <div className="flex flex-col space-y-12">
          <FormGroup setSearchInfo={setSearchInfo} />
          <OrderTable
            isLoading={isFetching}
            selectedRowKeys={selectedRowKeys}
            searchInfo={searchInfo}
            tableData={!isFetching ? orderlist : undefined}
            setSearchInfo={setSearchInfo}
            setSelectedRowKeys={setSelectedRowKeys}
          />
        </div>
      </FormProvider>
    </BaseLayout>
  );
}
