require('dotenv').load();

const mongoose = require('mongoose');
const User = require('./models/user');

// Use Node Mailer for email sign in
const nodemailer = require('nodemailer');
const nodemailerSmtpTransport = require('nodemailer-smtp-transport');
const nodemailerDirectTransport = require('nodemailer-direct-transport');

// Send email direct from localhost if no mail server configured
let nodemailerTransport = nodemailerDirectTransport();
if (
  process.env.EMAIL_SERVER &&
  process.env.EMAIL_USERNAME &&
  process.env.EMAIL_PASSWORD
) {
  nodemailerTransport = nodemailerSmtpTransport({
    host: process.env.EMAIL_SERVER,
    port: process.env.EMAIL_PORT || 25,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
}

module.exports = () =>
  mongoose.connect(process.env.MONGO_URI).then(() => ({
    find: ({ id, email, emailToken, provider } = {}) => {
      let query = {};

      if (email) {
        query = { email: email };
      } else if (emailToken) {
        query = { emailToken: emailToken };
      } else if (provider) {
        query = { [`${provider.name}.id`]: provider.id };
      }

      return User.findOne(query);
    },
    insert: (user, oAuthProfile) => {
      const newUser = new User(user);

      nodemailer.createTransport(nodemailerTransport).sendMail(
        {
          to: user.email,
          from: process.env.EMAIL_FROM,
          subject: 'Welcome To Riley Maker App',
          text: `So happy to have you :)`
        },
        err => {
          if (err) {
            console.error('Error sending email to ' + user.email, err);
          }
        }
      );

      return newUser.save();
    },
    update: (user, profile) => User.findByIdAndUpdate(user.id, user),
    serialize: user => {
      if (user.id) {
        return Promise.resolve(user.id);
      }

      return Promise.resolve();
    },
    deserialize: id => {
      console.log('id', id);
      if (!id) {
        return {};
      }

      return User.findById(id).then(user => {
        if (!user) {
          return {};
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          admin: user.admin || false
        };
      });
    },
    sendSignInEmail: ({ email, url, req }) => {
      nodemailer.createTransport(nodemailerTransport).sendMail(
        {
          to: email,
          from: process.env.EMAIL_FROM,
          subject: 'Sign in link',
          text: `Use the link below to sign in:\n\n${url}\n\n`,
          html: `<p>Use the link below to sign in:</p><p>${url}</p>`
        },
        err => {
          if (err) {
            console.error('Error sending email to ' + email, err);
          }
        }
      );
      if (process.env.NODE_ENV === 'development') {
        console.log('Generated sign in link ' + url + ' for ' + email);
      }
    }
    // Credentials Sign In
    //
    // If you use this you will need to define your own way to validate
    // credentials. Unlike with oAuth or Email Sign In, accounts are not
    // created automatically so you will need to provide a way to create them.
    //
    // This feature is intended for strategies like Two Factor Authentication.
    //
    // To disable this option, do not set signin (or set it to null).
    /*
    signIn: ({form, req}) => {
      return new Promise((resolve, reject) => {
        // Should validate credentials (e.g. hash password, compare 2FA token
        // etc) and return a valid user object from a database.
          return usersCollection.findOne({
          email: form.email
        }, (err, user) => {
          if (err) return reject(err)
          if (!user) return resolve(null)

          // Check credentials - e.g. compare bcrypt password hashes
          if (form.password == "test1234") {
            // If valid, return user object - e.g. { id, name, email }
            return resolve(user)
          } else {
            // If invalid, return null
            return resolve(null)
          }
        })
      })
    }
    */
  }));
