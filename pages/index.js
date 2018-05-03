import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import { NextAuth } from 'next-auth/client';

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import Container from 'components/container';

import {
  compose,
  withStateHandlers,
  withHandlers,
  setStatic,
  branch,
  renderComponent
} from 'recompose';

import styled, { hydrate } from 'react-emotion';

if (typeof window !== 'undefined' && window.__NEXT_DATA__.ids) {
  hydrate(window.__NEXT_DATA__.ids);
}

const Styled = styled.div`
  text-align: center;
  color: red;
`;

export default setStatic('getInitialProps', async ({ req }) => ({
  session: await NextAuth.init({ req }),
  linkedAccounts: await NextAuth.linked({ req }),
  providers: await NextAuth.providers({ req })
}))(props => {
  return (
    <Container {...props}>
      {() => (
        <Styled>
          <h1>Hello World</h1>
        </Styled>
      )}
    </Container>
  );
});
