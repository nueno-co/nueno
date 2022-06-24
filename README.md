<p align="center">
  <a href="https://codeclimate.com/github/Simba-City/nueno/maintainability"><img src="https://api.codeclimate.com/v1/badges/1e547d9b8a46c47be067/maintainability" /></a>
  <a href="https://codeclimate.com/github/Simba-City/nueno/test_coverage"><img src="https://api.codeclimate.com/v1/badges/1e547d9b8a46c47be067/test_coverage" /></a>
</p>

# Nueno - Open Source ATS (Applicant Tracking System)

## Project setup

### Database

1. Duplicate `env.example` and `.env.test.example` and rename to `.env` and `.env.test`
2. run `docker-compose up -d`

<details>
<summary>You haven't installed docker and docker-compose on your system?</summary>

<a href="https://docs.docker.com/compose/install/">Here's an installation guide</a>

You'll only need these commands when using docker-compose:

```bash
# start running containers
docker-compose up -d

# shut-down running containers
docker-compose down

# list running containers
docker-compose ps
```

</details>

### Code Climate (for code quality check)

Create a <a href="https://codeclimate.com/quality/pricing/">free code climate account</a> and add the `CODE_CLIMATE_TEST_REPORTER_ID` to your github repo settings.

<details>
<summary>Screenshot</summary>
<img width="1114" alt="image" src="https://user-images.githubusercontent.com/98182227/160672909-f596095f-7820-4b39-9260-0582d117287d.png">
</details>

## Development workflow

**Default setup:**

1. `npm run dev`
2. open `localhost:3000`

**Test Driven Development:**

Recommended workflow when writing code for `./business-logic`.

1. `npm run test`
2. in chrome open: `chrome://inspect` and click on the remote target URL. This will open a console with your test process.
3. add `debugger` statement in your code
4. tests will be re-run once you save a file

## Run tests

```
npm run test
```

Optionally, you can add a name pattern of the file name:

```
npm run test User
```

**Check test coverage:**

1. `npm run test:coverage`
2. open file `./coverage/lcov-report/index.html`

# Useful Prisma Commands

1. Run `npx prisma migrate dev` to run migrations.

2. Run `npx prisma studio` to open Prisma Studio in the browser.

3. Seed the database using `npx prisma db seed`.

4. Because Prisma Client is tailored to your own schema, you need to update it every time your Prisma schema file is changing by running the following command: `npx prisma generate`.

5. Run `npx prisma db push` executes the changes required to make your database schema reflect the state of your Prisma schema.