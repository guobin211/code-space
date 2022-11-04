import Link from 'next/link';
import React from 'react';

const AppHeader: React.FC = () => {
  return (
    <header>
      <ul>
        <li>
          <Link href={'/'}>Home</Link>
        </li>
        <li>
          <Link href={'/user'}>User</Link>
        </li>
        <li>
          <Link href={'/blog'}>Blog</Link>
        </li>
      </ul>
    </header>
  );
};

export default AppHeader;
