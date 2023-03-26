import { FunctionComponent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import locale from 'antd/lib/date-picker/locale/ko_KR';

interface DatePickerFieldProps {
  name: string;
  placeholder?: string;
}

const DatePickerField: FunctionComponent<DatePickerFieldProps> = ({
  name,
  placeholder,
}) => {
  const methods = useFormContext();
  const { control, clearErrors } = methods;

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: '값을 입력 해주세요.',
        validate: (_, form) => {
          const { fromDate, toDate } = form;

          if (!fromDate || !toDate) return '값을 입력 해주세요.';

          const startDateString = dayjs(fromDate).toISOString().split('T')[0];
          const endDateString = dayjs(toDate).toISOString().split('T')[0];

          if (startDateString === endDateString)
            return '시작날짜 보다 종료날짜가 더 크도록 입력 해주세요.';

          if (fromDate > 0 && toDate > 0 && fromDate > toDate)
            return '시작날짜 보다 종료날짜가 더 크도록 입력 해주세요.';
        },
      }}
      render={({ field, fieldState }) => {
        return (
          <div className="flex w-full flex-col">
            <DatePicker
              placeholder={placeholder}
              status={fieldState.error ? 'error' : undefined}
              ref={field.ref}
              name={field.name}
              onBlur={field.onBlur}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => {
                clearErrors(['fromDate', 'toDate']);
                field.onChange(date ? date.valueOf() : null);
              }}
              locale={locale}
              autoComplete="off"
            />

            {name === 'fromDate' ? (
              <span className="absolute -bottom-5 text-xs text-red">
                {fieldState.error?.message}
              </span>
            ) : null}
          </div>
        );
      }}
    />
  );
};

export default DatePickerField;
