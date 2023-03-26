import { FunctionComponent, PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import Header from '../header';

const BaseLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <MainWrapper>{children}</MainWrapper>
    </>
  );
};

export default BaseLayout;

const MainWrapper = styled.main`
  padding: 1rem;
`;
