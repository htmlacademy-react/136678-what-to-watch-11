import React, { ReactNode } from 'react';

import UserBlock from '../user-block/user-block';
import Logo from '../logo/logo';

type HeaderProps = {
  className?: string;
  children?: ReactNode;
}

function Header({ className = '', children } : HeaderProps): JSX.Element {
  return (
    <header className={`page-header ${className}`}>
      <Logo/>
      {children}
      <UserBlock />
    </header>
  );
}

export default React.memo(Header);
