import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { extractCritical } from 'emotion-server';
import Link from 'next/link';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;
import Styled from '../styled';
import { NextAuth } from 'next-auth/client';

import root from 'window-or-global';
import UserHeader from '../components/user-header';

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage, req }) {
    const page = renderPage();
    const styles = extractCritical(page.html);
    return {
      ...page,
      ...styles,
      session: await NextAuth.init({ req })
    };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  render() {
    return (
      <html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main {...this.props} />
          <NextScript />
        </body>
      </html>
    );
  }
}
