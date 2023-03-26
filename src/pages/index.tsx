import { useEffect } from 'react';
import axios from 'axios';
import { BaseLayout } from '@components/layout';
import FormGroup from '@components/formGroup';

export default function Home() {
  const fetchData = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: '/orders',
      });

      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BaseLayout>
      <div className="flex flex-col space-y-12">
        <FormGroup />
      </div>
    </BaseLayout>
  );
}
