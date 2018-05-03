import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import { NextAuth } from 'next-auth/client';
import { compose, setStatic, lifecycle } from 'recompose';

const AuthCallback = props => (
  <React.Fragment>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
    </Head>

    <a href="/" className="circle-loader">
      <svg
        className="circle"
        width="60"
        height="60"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="15" />
      </svg>
    </a>
  </React.Fragment>
);

export default compose(
  setStatic('getInitialProps', async ({ req }) => {
    return {
      session: await NextAuth.init({ force: true, req })
    };
  }),
  lifecycle({
    async componentDidMount() {
      const session = await NextAuth.init({ force: true });
      Router.push('/');
    }
  })
)(AuthCallback);
