import React, { InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  message?: string;
}

const Input: React.ForwardRefExoticComponent<InputProps> = React.forwardRef<
  HTMLInputElement,
  InputProps
>((props, ref) => {
  const { className, label, message, id } = props;

  return (
    <div className={classNames('flex h-14 items-center', className)}>
      {label && (
        <LabelWrapper>
          <label htmlFor={id}>{label}</label>
        </LabelWrapper>
      )}
      <div className="relative flex w-full">
        <InputElement id={id} ref={ref} {...props} autoComplete="off" />
        {message && (
          <ErrorMessage role="alert">{message as string}</ErrorMessage>
        )}
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

const LabelWrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 20%;
  min-width: 64px;
  padding: 0 12px;
  font-size: 14px;
`;

const InputElement = styled.input`
  width: 100%;
  height: 38px;
  padding: 6px 12px;
  margin: 0;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.black};
  outline: none;
  box-sizing: border-box;
  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 0 0.25rem rgb(44 62 118 / 25%);
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors['secondary-gray']};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
  }
`;

const ErrorMessage = styled.small`
  position: absolute;
  bottom: -20px;
  color: ${({ theme }) => theme.colors.red};
  font-size: 12px;
`;
