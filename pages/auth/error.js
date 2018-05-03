import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { compose, setStatic } from 'recompose';

const AuthError = props => {
  if (props.action == 'signin' && props.type == 'oauth') {
    return (
      <div className="container">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
        </Head>
        <div>
          <h1>Unable to sign in</h1>
          <p>An account associated with your email address already exists.</p>
          <p>
            <Link href="/auth">
              <a>Sign in with email or another service</a>
            </Link>
          </p>
        </div>
        <div>
          <div>
            <p>
              It looks like you might have already signed up using another
              service.
            </p>
          </div>
        </div>
      </div>
    );
  } else if (props.action == 'signin' && props.type == 'token-invalid') {
    return (
      <div className="container">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
        </Head>
        <div className="text-center">
          <h1 className="display-4 mt-5 mb-2">Link not valid</h1>
          <p className="lead">This sign in link is no longer valid.</p>
          <p className="lead">
            <Link href="/auth">
              <a>Get a new sign in link</a>
            </Link>
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
        </Head>
        <div className="text-center">
          <h1 className="display-4 mt-5">Error signing in</h1>
          <p className="lead">An error occured while trying to sign in.</p>
          <p className="lead">
            <Link href="/auth">
              <a>Sign in with email or another service</a>
            </Link>
          </p>
        </div>
      </div>
    );
  }
};

export default setStatic('getInitialProps', ({ query }) => query)(AuthError);
