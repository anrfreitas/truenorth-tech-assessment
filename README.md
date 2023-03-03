# TRUENORTH TECH ASSESSMENT

This backend exercise involves building a Node.js/Express.js app that will serve a REST API.

There's also a Postman collection related to every endpoint in this project, it's located in `resources` folder.

### Important

I skipped the frontend and the integration to get a random string. About the missing parts we could have a conversation and I'd be able to explain how I'd do it instead.

Last but not least, I'm storing the password in the DB using base64, I know it would need to be hashed but doing that takes more time. I just did it to gain some time.

## Achievements
- All necessary endpoints were implemented
- Implemented caching strategy using Node-Cache
- Implemented Helpers and a way to Abstract Routes
- Some simple unit tests, and a very simple example of integration tests

### What would I have done more?
- Implement remaining Unit and Integration Tests where it's applicable

- Add Pagination on `GET: /operation` and where else it's applicable

- Add Rate limiting where it's applicable

- Add Swagger to help our developers understand our endpoints

- Add Observability System to check our Microservice Health (Eg. Prometheus, Grafana, Cloudwatch)

- Add Logging System (Eg. [Sentry](https://sentry.io/))

- Setup Typescript + EsLint + Prettier + Husky to make sure the code looks nice

- Setup Github Actions or AWS CodePipeline to perform CI/CD to staging / production servers

## Getting Set Up

The exercise requires [Node.js](https://nodejs.org/en/) to be installed. We recommend using the LTS version.

1. Start by creating a local repository for this folder.

1. In the repo root directory, run `npm install` to gather all dependencies.

1. Next, `npm run seed` will seed the local SQLite database. **Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.

1. Then run `npm start` which should start both the server and the React client.

## Technical Notes

- The server is running with [nodemon](https://nodemon.io/) which will automatically restart for you when you modify and save a file.

- The database provider is SQLite, which will store data in a file local to your repository called `database.sqlite3`. The ORM [Sequelize](http://docs.sequelizejs.com/) is on top of it. You should only have to interact with Sequelize - **please spend some time reading sequelize documentation before starting the exercise.**

- To authenticate users use the `checkAuthentication` middleware that is located under src/middleware/checkAuthentication.js. users are authenticated by passing Basic Authentication in the request header. After a user is authenticated his data will be available under `req.user`.

- The server is running on port 3001.

## Running Tests

- To run the projects unit tests is very simple, you just need to run `npm run test` on root directory

- If you want to run integration tests, you gotta first seed our local database by running `npm run seed` and then `npm run test:integration`

- Test patterns:
    - Integration tests: `*.test.js`
    - Unit tests: `*.spec.js`
