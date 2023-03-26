import React, { FunctionComponent } from 'react';
import Input from '@components/input';

const FormGroup: FunctionComponent = () => {
  return (
    <form>
      <Input label="이름" id="name" className="mb-4" autoFocus maxLength={20} />
      <Input
        label="휴대폰 번호"
        id="phoneNumber"
        className="mb-4"
        maxLength={13}
      />
    </form>
  );
};

export default FormGroup;
