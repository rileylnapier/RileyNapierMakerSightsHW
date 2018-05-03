import React from 'react';
import Container from 'components/container';
import { NextAuth } from 'next-auth/client';
import {
  mapProps,
  setStatic,
  compose,
  lifecycle,
  withStateHandlers,
  withHandlers
} from 'recompose';

const User = compose(
  mapProps(props => ({
    ...props,
    fetchConfig: {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: `_csrf=${props.session.csrfToken}&email=${props.user.email}`
    }
  })),
  withHandlers({
    deleteUser: props => () =>
      fetch('/api/user/delete', props.fetchConfig)
        .then(response => response.json())
        .then(users => {
          props.setUsers(users);
          console.log(props);
          if (props.user.email === props.session.user.email) {
            props.handleSignOut();
          }
        }),
    toggleEnable: props => () =>
      fetch('/api/user/toggle-enable', props.fetchConfig)
        .then(response => response.json())
        .then(users => {
          props.setUsers(users);
        })
  })
)(props => (
  <div>
    <div>
      Name: <strong>{props.user.name}</strong>
    </div>
    <div>
      Email: <strong>{props.user.email}</strong>
    </div>
    <div>
      Enabled: <strong>{props.user.enabled ? 'true' : 'false'}</strong>
      <button onClick={props.toggleEnable}>
        {props.user.enabled ? 'Disable' : 'Enable'}
      </button>
      <button onClick={props.deleteUser}>Delete</button>
    </div>
    <hr />
  </div>
));

export default compose(
  setStatic('getInitialProps', async ({ req }) => ({
    session: await NextAuth.init({ req }),
    linkedAccounts: await NextAuth.linked({ req }),
    providers: await NextAuth.providers({ req })
  })),
  withStateHandlers(
    {
      users: []
    },
    {
      setUsers: state => users => ({
        users
      })
    }
  ),
  withHandlers({}),
  lifecycle({
    componentDidMount() {
      console.log(this.props);
      fetch('/api/users', {
        credentials: 'same-origin'
      })
        .then(response => response.json())
        .then(users => {
          this.props.setUsers(users);
        });
    }
  })
)(props => (
  <Container {...props}>
    {containerProps =>
      props.users.map(user => (
        <User {...props} {...containerProps} key={user._id} user={user} />
      ))
    }
  </Container>
));
