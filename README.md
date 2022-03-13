<p align="center">
  <a href="https://codeclimate.com/github/Simba-City/nueno/maintainability"><img src="https://api.codeclimate.com/v1/badges/1e547d9b8a46c47be067/maintainability" /></a>
  <a href="https://codeclimate.com/github/Simba-City/nueno/test_coverage"><img src="https://api.codeclimate.com/v1/badges/1e547d9b8a46c47be067/test_coverage" /></a>
</p>

# Nueno - Open Source ATS (Applicant Tracking System)

## Project setup
1. Create `.env.development` + `.env.test` file and add `DATABASE_URL`
2. Create code climate account and set `CODE_CLIMATE_TEST_REPORTER_ID` in your github repo settings

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
1. `test:coverage`
2. open file `./coverage/lcov-report/index.html`
