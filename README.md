## Description

Recruitment task, a simple time tracking API.

## Goal

User stories:

* As a user, I want to be able to start tracking the new, named Task so that tracking of previously started task is stopped, and start time of the new Task is saved.
* As a user, I want to be able to stop tracking task at any moment so that the task finish time is saved.
* As a user, I want to be able to fetch current running task.

## Installation

```bash
$ npm install
```

## Running the app

Run Docker on your machine.

```bash
#docker postgres DB
$ docker-compose build
$ docker-compose up

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Swagger API is available at: **localhost:3000/api**

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Technologies

- Node.js
- NestJS
- Docker
- PostgreSQL
- TypeScript
- Jest
- Swagger

## My thoughts

Event modelling for this case:
[Miro](https://miro.com/app/board/o9J_lB4NYDU=/)

I tried to implement solution using clean architecture principles.

There are few setbacks:
- not enough test coverage (run out of time)
- repository adn controller implementation not tested
- lack of edit and delete functions
- implementation safe only for one user case

