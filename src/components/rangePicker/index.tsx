import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import classNames from 'classnames';
import DatePicker from './DatePicker';

interface RangePickerProps {
  label?: string;
  className?: string;
}

const RangePicker: FunctionComponent<RangePickerProps> = ({
  label,
  className,
}) => {
  return (
    <div className={classNames('flex h-14 items-center', className)}>
      {label && (
        <LabelWrapper>
          <label>{label}</label>
        </LabelWrapper>
      )}
      <div className="relative flex w-full space-x-2">
        <DatePicker placeholder="시작일" name="fromDate" />
        <div className="flex h-8 w-8 items-center justify-center">~</div>
        <DatePicker placeholder="종료일" name="toDate" />
      </div>
    </div>
  );
};

export default RangePicker;

const LabelWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  justify-content: flex-start;
  align-items: flex-start;
  width: 20%;
  padding: 0 12px;
  font-size: 14px;
`;
