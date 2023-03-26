import React, { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@components/input';
import Button from '@components/button';

interface IForm {
  name: string;
  phoneNumber: string;
}

const FormGroup: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<IForm>({
    mode: 'all',
    defaultValues: {
      name: '',
      phoneNumber: '',
    },
  });

  const onSubmit = (data: IForm) => {
    const { name, phoneNumber } = data;

    const body = {
      name,
      phoneNumber,
    };

    console.log('body', body);
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await new Promise((r) => setTimeout(r, 1000));
        try {
          onSubmit(data);
        } catch (error) {
          console.log(error);
        }
      })}
    >
      <div className="formGroup">
        <Input
          label="이름"
          id="name"
          className="mb-4"
          autoFocus
          aria-invalid={!isDirty ? undefined : errors.name ? 'true' : 'false'}
          {...register('name', {
            required: '이름은 필수 입력입니다.',
          })}
        />
        <Input
          label="휴대폰 번호"
          id="phoneNumber"
          className="mb-4"
          aria-invalid={!isDirty ? undefined : errors.name ? 'true' : 'false'}
          {...register('phoneNumber', {
            required: '전화번호는 필수 입력입니다.',
          })}
        />
      </div>
      <div className="addButton mt-1.5">
        <Button text="등록" className="" />
      </div>
    </form>
  );
};

export default FormGroup;
