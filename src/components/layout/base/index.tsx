import { FunctionComponent, PropsWithChildren } from 'react';
import Header from '../header';

const BaseLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center">{children}</main>
    </>
  );
};

export default BaseLayout;
