import React from 'react';
import {
  compose,
  setStatic,
  branch,
  renderComponent,
  withHandlers
} from 'recompose';
import { NextAuth } from 'next-auth/client';

const SignInProvider = props => (
  <a href={props.provider.signin}>Sign in with {props.providerName}</a>
);

const LinkAccount = props => {
  if (props.linked === true) {
    return (
      <form
        method="post"
        action={`/auth/oauth/${props.providerName.toLowerCase()}/unlink`}>
        <input name="_csrf" type="hidden" value={props.session.csrfToken} />
        <p>
          <button className="btn btn-block btn-outline-danger" type="submit">
            Unlink from {props.providerName}
          </button>
        </p>
      </form>
    );
  } else {
    return (
      <p>
        <a
          className="btn btn-block btn-outline-primary"
          href={`/auth/oauth/${props.providerName.toLowerCase()}`}>
          Link with {props.providerName}
        </a>
      </p>
    );
  }
};

const LoggedOut = props =>
  Object.keys(props.providers).map((providerName, i) => (
    <SignInProvider
      key={providerName}
      providerName={providerName}
      provider={props.providers[providerName]}
    />
  ));

const LoggedIn = props => {
  console.log('props', props);
  return (
    <div>
      <div>
        Signed in as <strong>{props.session.user.email}</strong>
      </div>
      <button onClick={props.handleSignOut}>Log Out</button>
    </div>
  );
};

export default compose(
  branch(props => {
    return !props.session.user;
  }, renderComponent(LoggedOut))
)(LoggedIn);
