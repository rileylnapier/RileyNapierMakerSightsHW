import React from 'react';
import Head from 'next/head';
import { NextAuth } from 'next-auth/client';
import Styled from './styled';
import Router from 'next/router';

import {
  compose,
  withStateHandlers,
  withHandlers,
  setStatic,
  branch,
  renderComponent
} from 'recompose';

import Menu from './menu';
import UserHeader from './user-header';

const SignInProvider = props => (
  <a href={props.provider.signin}>Sign in with {props.providerName}</a>
);

const Container = props => (
  <Styled className="container">
    <div className="menu">
      <Menu {...props} />
    </div>
    <div className="user-header">
      <UserHeader {...props} />
    </div>
    {props.children(props)}
  </Styled>
);

export default compose(
  withHandlers({
    handleSignOut: props => () => {
      NextAuth.signout().then(() => {
        Router.push('/');
      });
    }
  })
)(Container);
