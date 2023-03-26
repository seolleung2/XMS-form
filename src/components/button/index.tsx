import React, { FunctionComponent } from 'react';
import { cls } from 'utils';

type Props = {
  text: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  handleClick?: () => void;
};

const Button: FunctionComponent<Props> = ({
  text,
  className,
  type = 'submit',
  disabled = false,
  handleClick,
}) => {
  return (
    <button
      type={type}
      className={cls(
        'h-[38px] rounded-md py-1.5 px-3 text-white',
        disabled
          ? 'cursor-not-allowed border-none bg-slate-200 text-slate-500'
          : 'bg-[#2C3E76] hover:bg-indigo-700',
        className as string
      )}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
