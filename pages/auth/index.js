import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import { NextAuth } from 'next-auth/client';
import {
  compose,
  withStateHandlers,
  withHandlers,
  setStatic,
  branch,
  renderComponent
} from 'recompose';

const SignInProvider = props => (
  <a href={props.provider.signin}>Sign in with {props.providerName}</a>
);

const SignedOut = props => (
  <div className="container">
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
    </Head>
    <div className="text-center">
      <h1>Auth</h1>
    </div>
    <div>
      <div>
        {Object.keys(props.providers).map((providerName, i) => (
          <SignInProvider
            key={providerName}
            providerName={providerName}
            provider={props.providers[providerName]}
          />
        ))}
        <div>
          <form
            id="signin"
            method="post"
            action="/auth/email/signin"
            onSubmit={props.handleSignInSubmit}>
            <input name="_csrf" type="hidden" value={props.session.csrfToken} />
            <p>
              <label htmlFor="email">Email address</label>
              <br />
              <input
                name="email"
                type="text"
                placeholder="email@example.com"
                id="email"
                value={props.email}
                onChange={props.handleInputChange}
              />
              <br />
            </p>
            <p>
              <button id="submitButton" type="submit">
                Sign In via Email
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
    <p>
      <Link href="/">
        <a>Home</a>
      </Link>
    </p>
  </div>
);

export default compose(
  setStatic('getInitialProps', async ({ req }) => ({
    session: await NextAuth.init({ req }),
    linkedAccounts: await NextAuth.linked({ req }),
    providers: await NextAuth.providers({ req })
  })),
  withStateHandlers(
    props => ({
      email: '',
      password: '',
      session: props.session
    }),
    {
      handleInputChange: state => event => ({
        [event.target.name]: event.target.value
      })
    }
  ),
  withHandlers({
    handleSignInSubmit: props => event => {
      event.preventDefault();

      if (!props.email) return;

      NextAuth.signin(props.email)
        .then(() => {
          Router.push(`/auth/check-email?email=${props.email}`);
        })
        .catch(() => {
          Router.push(
            `/auth/error?action=signin&type=email&email=${props.email}`
          );
        });
    }
  })
)(SignedOut);
