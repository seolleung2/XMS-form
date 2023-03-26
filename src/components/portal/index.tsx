import ReactDOM from 'react-dom';
import React, { FunctionComponent } from 'react';

type Props = {
  children: React.ReactNode;
  selector: string;
};

const Portal: FunctionComponent<Props> = ({ children, selector }) => {
  const element =
    typeof window !== 'undefined' && document.querySelector(selector);
  return element && children ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;
