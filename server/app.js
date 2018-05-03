const express = require('express');
const next = require('next');
const nextAuth = require('next-auth');
const nextAuthConfig = require('../next-auth.config');

const mongoose = require('mongoose');
const User = require('../models/user');

// Load environment variables from .env
require('dotenv').load();

// Initialize Next.js
const nextApp = next({
  dir: '.',
  dev: process.env.NODE_ENV === 'development'
});

// Add next-auth to next app
nextApp
  .prepare()
  .then(nextAuthConfig)
  .then(nextAuthOptions => {
    if (nextAuthOptions.port) delete nextAuthOptions.port;
    return nextAuth(nextApp, nextAuthOptions);
  })
  .then(nextAuthApp => {
    const { expressApp } = nextAuthApp;

    expressApp.get('/api/users', (req, res) => {
      if (!req.user) {
        return res.sendStatus(401);
      }

      User.find({}).then(result => {
        res.json(result);
      });
    });

    expressApp.post('/api/user/toggle-enable', (req, res) => {
      if (!req.user) {
        return res.sendStatus(401);
      }

      User.findOne({ email: req.body.email }).then(user => {
        user.set({ enabled: !user.enabled });

        user.save().then(() => {
          User.find({}).then(result => {
            res.json(result);
          });
        });
      });
    });

    expressApp.post('/api/user/delete', (req, res) => {
      if (!req.user) {
        return res.sendStatus(401);
      }

      User.findOne({ email: req.body.email }).then(user => {
        user.remove().then(() => {
          User.find({}).then(result => {
            res.json(result);
          });
        });
      });
    });

    expressApp.all('*', (req, res) => {
      let nextRequestHandler = nextApp.getRequestHandler();
      return nextRequestHandler(req, res);
    });

    const port = process.env.PORT || 3000;

    expressApp.listen(port, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:' + port);
    });
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
