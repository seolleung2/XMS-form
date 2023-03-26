import React, { SelectHTMLAttributes } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import styled from '@emotion/styled';
import classNames from 'classnames';
import { FieldError } from 'react-hook-form';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  label?: string;
  fieldError?: FieldError | undefined;
}

const Select: React.ForwardRefExoticComponent<SelectProps> = React.forwardRef<
  HTMLSelectElement,
  SelectProps
>((props, ref) => {
  const {
    className,
    id,
    placeholder,
    label,
    fieldError,
    value,
    defaultValue,
    children,
  } = props;

  return (
    <div className={classNames('flex h-14 items-center', className)}>
      {label && (
        <LabelWrapper>
          <label htmlFor={id}>{label}</label>
        </LabelWrapper>
      )}
      <div className="relative flex w-full">
        <SelectElement
          id={id}
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {children}
        </SelectElement>
        <SelectIcon width={14} />
        {fieldError && (
          <ErrorMessage role="alert">
            {fieldError.message as string}
          </ErrorMessage>
        )}
      </div>
    </div>
  );
});

Select.displayName = 'Select';

export default Select;

const LabelWrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 20%;
  padding: 0 12px;
  font-size: 14px;
`;

const SelectElement = styled.select`
  width: 100%;
  height: 38px;
  padding: 6px 36px 6px 12px;
  margin: 0;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.black};
  outline: none;
  box-sizing: border-box;
  appearance: none;
  font-size: 14px;
  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 0 0.25rem rgb(44 62 118 / 25%);
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors['secondary-gray']};
  }
`;

const ErrorMessage = styled.small`
  position: absolute;
  bottom: -20px;
  color: ${({ theme }) => theme.colors.red};
  font-size: 12px;
`;

const SelectIcon = styled(ChevronDownIcon)`
  position: absolute;
  top: 50%;
  right: 18px;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.black};
`;
