import { BaseLayout } from '@components/layout';
import FormGroup from '@components/formGroup';

export default function Home() {
  return (
    <BaseLayout>
      <div className="flex flex-col space-y-12">
        <FormGroup />
      </div>
    </BaseLayout>
  );
}
