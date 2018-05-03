import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { compose, setStatic, lifecycle } from 'recompose';

const CheckEmail = props => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
    </Head>
    <div>
      <h1>Check your email</h1>
      <p>
        A sign in link has been sent to{' '}
        {props.email ? <span>{props.email}</span> : <span>your inbox</span>}.
      </p>
      <p>
        <Link href="/">
          <a>Home</a>
        </Link>
      </p>
    </div>
  </div>
);

export default setStatic('getInitialProps', ({ query }) => query)(CheckEmail);
