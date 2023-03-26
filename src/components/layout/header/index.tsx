import Image from 'next/image';
import { FunctionComponent } from 'react';

const Header: FunctionComponent = () => {
  return (
    <header className="border-0 border-b-2 border-solid border-b-primary p-2.5">
      <Image
        src="/images/logo.png"
        priority
        alt="logo"
        width={200}
        height={30}
      />
    </header>
  );
};

export default Header;
