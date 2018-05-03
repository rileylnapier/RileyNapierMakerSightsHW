import React from 'react';
import Link from 'next/link';

export default () => (
  <div>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/users">
      <a>Users</a>
    </Link>
  </div>
);
