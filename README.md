# riley-maker

> requires >= node 8

## technologies used:

* `react`
  * `recompose` to avoid uses es6 classes and use functional stateless components instead for cleaner code https://github.com/acdlite/recompose
  * `nextjs` to provide react SSR framework
  * `next-auth` to help with oAuth. took lots of inspiration from https://github.com/iaincollins/next-auth/tree/master/example
* `mongodb`
  * `mongoose` to help with schemas/models
  * `mlabs` to host server
* `heroku` to host app

## commands:

* dev: `npm run dev`
* production: `npm start`

## env variables:

we use `dotenv` so create a `.env` file in root of directory with the following variables

```
SERVER_URL=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/my-database

// TODO
// FACEBOOK_ID=
// FACEBOOK_SECRET=

GOOGLE_ID=ID
GOOGLE_SECRET=SECRET

EMAIL_FROM=
EMAIL_SERVER=
EMAIL_PORT=465
EMAIL_USERNAME=
EMAIL_PASSWORD=
```

## mongodb

you can run mongo locally by running `mongod`.

> you can install mongo with `brew install mongodb`
