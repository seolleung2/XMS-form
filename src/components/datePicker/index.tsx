import { FunctionComponent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from 'antd';
import styled from '@emotion/styled';
import classNames from 'classnames';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import locale from 'antd/lib/date-picker/locale/ko_KR';

interface DatePickerFieldProps {
  name: string;
  className: string;
  placeholder?: string;
}

const DatePickerField: FunctionComponent<DatePickerFieldProps> = ({
  name,
  className,
  placeholder,
}) => {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: '값을 입력 해주세요.',
        validate: (value) => {
          if (!value) return '값을 입력 해주세요.';
        },
      }}
      render={({ field, fieldState }) => {
        return (
          <div className={classNames('flex h-14 items-center', className)}>
            <LabelWrapper>
              <label>날짜</label>
            </LabelWrapper>
            <div className="relative w-full">
              <DatePicker
                className="h-[38px] w-full"
                placeholder={placeholder || ''}
                status={fieldState.error ? 'error' : undefined}
                ref={field.ref}
                name={field.name}
                onBlur={field.onBlur}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => {
                  field.onChange(date ? date.valueOf() : null);
                }}
                locale={locale}
                autoComplete="off"
              />

              {fieldState.error ? (
                <span className="absolute left-0 -bottom-5 w-full text-xs text-red">
                  {fieldState.error?.message}
                </span>
              ) : null}
            </div>
          </div>
        );
      }}
    />
  );
};

export default DatePickerField;

const LabelWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  justify-content: flex-start;
  align-items: flex-start;
  width: 20%;
  min-width: 64px;
  padding: 0 12px;
  font-size: 14px;
`;
