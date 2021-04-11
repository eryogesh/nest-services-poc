# nest-services-poc

## Description

Backend rest services POC application created using [Nest](https://github.com/nestjs/nest) framework TypeScript.

## Pre-requisites

- <b>PostgreSQL</b> - dbms should be installed
- <b>nest-services-poc-db</b> - create a database/schema named 'nest-services-poc-db'
- <b>NodeJS</b> - should be installed
- <b>serverless</b> - npm module should be installed globally, only if you need to deploy/run on serverless cloud functions. 

```bash
$ npm install -g serverless
```

## Geeting Ready

1. Update .env file with appropriate settings.
2. On application startup, it seeds mock data into database.


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running serverless

```bash
# deployment
$ npm run deploy

# running serverless offline
$ npm run offline

# deployment logs
$ npm run deploy-logs
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Notes

1. Global manager user should be created with email: 'globalmanager@gmail.com' and password: 'pass@123'
2. CRUD APIs exposed for:  
  a. Users  
  b. Groups  
  c. Collections  
  d. Items    
  e. Auth - /login

### Sample API urls 
- http://localhost:4000/api/v1/auth/login
- http://localhost:4000/api/v1/users
- http://localhost:4000/api/v1/groups
- http://localhost:4000/api/v1/collections
- http://localhost:4000/api/v1/items