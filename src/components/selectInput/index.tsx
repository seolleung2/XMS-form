import { FunctionComponent } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import styled from '@emotion/styled';
import classNames from 'classnames';
import Select from 'components/select';
import Input from 'components/input';
import { ItemSelectionType } from 'constant/form';

interface Props {
  label?: string;
  className?: string;
  item: 'item' | 'supply';
  itemDetail: 'itemDetail' | 'supplyDetail';
  itemField: string;
  itemDetailField: string;
  options: ItemSelectionType[];
}

const SelectInput: FunctionComponent<Props> = ({
  label,
  className,
  item,
  itemDetail,
  itemField,
  itemDetailField,
  options,
}) => {
  const methods = useFormContext();
  const {
    register,
    setValue,
    clearErrors,
    formState: { isDirty, errors },
  } = methods;

  const validateItem = (value: string) => {
    if (!value || (value === '직접입력' && !itemDetailField))
      return '값을 입력 해주세요.';
    if (value !== '직접입력') setValue('itemDetail', '');
  };

  const validateSupply = (value: string) => {
    const check = /^[0-9]+$/;
    if (itemField && !itemDetailField) return '값을 입력 해주세요.';
    if (itemField && (!check.test(itemDetailField) || itemDetailField === '0'))
      return '숫자만 입력 가능합니다.';
    if (!value) setValue('supplyDetail', '');
  };

  const handleValidation = (value: string) => {
    let result: string | undefined;

    if (item === 'item') result = validateItem(value);
    if (item === 'supply') result = validateSupply(value);

    return result;
  };
  return (
    <div className={classNames('flex h-14 items-center', className)}>
      {label && (
        <LabelWrapper>
          <label>{label}</label>
        </LabelWrapper>
      )}
      <div className="flex w-full space-x-2">
        <Select
          {...register(item, {
            validate: (value) => handleValidation(value),
          })}
          id={item}
          name={item}
          className="w-full"
          placeholder="선택"
          fieldError={errors[item] as FieldError | undefined}
        >
          {options.map((type) => {
            return <option key={type.id}>{type.itemType}</option>;
          })}
        </Select>
        <Input
          id={itemDetail}
          className="w-full"
          disabled={
            (item === 'item' && itemField !== '직접입력') ||
            (item === 'supply' && !itemField)
          }
          aria-invalid={
            !isDirty
              ? undefined
              : (errors[item] as FieldError | undefined)
              ? 'true'
              : 'false'
          }
          onClick={() => clearErrors(item)}
          {...register(itemDetail)}
        />
      </div>
    </div>
  );
};

export default SelectInput;

const LabelWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  justify-content: flex-start;
  align-items: flex-start;
  width: 20%;
  padding: 0 12px;
  font-size: 14px;
`;
