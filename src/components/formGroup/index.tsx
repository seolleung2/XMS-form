import React, { FunctionComponent } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import Input from '@components/input';
import Button from '@components/button';
import RangePicker from '@components/rangePicker';

const FormGroup: FunctionComponent = () => {
  const methods = useFormContext();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty, errors, isSubmitting },
  } = methods;

  const onSubmit = (data: FieldValues) => {
    const { name, phoneNumber, fromDate, toDate } = data;

    const fromDateString = dayjs(fromDate).toISOString().split('T')[0];
    const toDateString = dayjs(toDate).toISOString().split('T')[0];

    const body = {
      name,
      phoneNumber,
      fromDate: fromDateString,
      toDate: toDateString,
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
          maxLength={20}
          aria-invalid={!isDirty ? undefined : errors.name ? 'true' : 'false'}
          message={errors['name']?.message as string}
          {...register('name', {
            required: '값을 입력 해주세요.',
            validate: (value) => {
              const check = /^[가-힣a-zA-Z\s]+$/;

              if (!check.test(value))
                return '한글, 영어, 공백만 입력 가능 합니다.';
            },
          })}
        />
        <Input
          label="휴대폰 번호"
          id="phoneNumber"
          className="mb-4"
          maxLength={13}
          aria-invalid={!isDirty ? undefined : errors.name ? 'true' : 'false'}
          message={errors['phoneNumber']?.message as string}
          {...register('phoneNumber', {
            required: '값을 입력 해주세요.',
            validate: (value) => {
              const check = /^([0-9]{3})-?([0-9]{4})-?([0-9]{4})$/;

              if (!check.test(value))
                return '알맞는 핸드폰 번호 형식을 입력 해주세요.';

              setValue(
                'phoneNumber',
                value
                  .replace(/^(\d{3})(\d{4})(\d{4})$/g, '$1-$2-$3')
                  .replace(/-{1,2}$/g, '')
              );
            },
          })}
        />
        <RangePicker label="날짜" className="mb-4" />
      </div>
      <div className="addButton mt-1.5">
        <Button text="등록" className="" />
      </div>
    </form>
  );
};

export default FormGroup;
