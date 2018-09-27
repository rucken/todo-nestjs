# backend: rucken-todo-nestjs

[![Greenkeeper badge](https://badges.greenkeeper.io/rucken/todo-nestjs.svg)](https://greenkeeper.io/)
[![Build Status][travis-image]][travis-url]
[![dependencies-release][dependencies-image]][dependencies-url]

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/rucken/todo-nestjs)

A simple todo application demonstrating the basic usage of permissions with NestJS (JWT, Passport, Facebook, Google+, User, Group, Permission)


## Features

* [NestJS](https://github.com/nestjs/nest) - a JS backend framework providing architecture out of the box with a syntax similar to Angular
* [TypeORM](https://github.com/mongodb/mongo) - ORM for TypeScript and JavaScript (ES7, ES6, ES5). Supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, WebSQL databases.
* [TypeScript](https://github.com/Microsoft/TypeScript) - superset of JS which compiles to JS, providing compile-time type checking
* [Passport](https://github.com/jaredhanson/passport) - a popular library used to implement JavaScript authentication (Facebook, Google+)
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - a JavaScript json web tokens implementation by auth0

## Usage
- clone or fork [repository](https://github.com/rucken/todo-nestjs.git) `git clone --recursive https://github.com/rucken/todo-nestjs.git`
- make sure you have [node.js](https://nodejs.org/) installed version 8+
- make sure you have NPM installed version 5+
- copy `develop._env` to `develop.env` and set environments for use (on Windows copy with IDE)
- run `npm install` to install project dependencies
- run `npm run build` to install project dependencies
- run `npm run start:prod` to fire up prod server (`npm run start:dev` - dev server)
- Open browser to [`http://localhost:5000/swagger`](http://localhost:5000/swagger)

### Users
- user with admin group: admin@admin.com, password: 12345678
- user with user group: user1@user1.com, password: 12345678
- user with user group: user2@user2.com, password: 12345678

### Swagger
- local: [`http://localhost:5000/swagger`](http://localhost:5000/swagger)
- online on now with db sqlite: [`https://rucken-todo-nestjs.now.sh/swagger`](https://rucken-todo-nestjs.now.sh/swagger)
- online on now with db postgres: [`https://rucken-todo-nestjs-postgres.now.sh/swagger`](https://rucken-todo-nestjs-postgres.now.sh/swagger)
- apiKey template: ```JWT <token_generated_on_login>```

### Docs
- local: [`http://localhost:5000/docs`](http://localhost:5000/docs)
- online on now: [`https://rucken-todo-nestjs.now.sh/docs`](https://rucken-todo-nestjs.now.sh/docs)

### With UI on Angular 6+
- online on now with gh-pages: [`https://rucken.github.io/todo`](https://rucken.github.io/todo)
- online on now with ssr: [`https://rucken-todo.now.sh`](https://rucken-todo.now.sh)

## License

MIT

[travis-image]: https://travis-ci.org/rucken/todo-nestjs.svg?branch=master
[travis-url]: https://travis-ci.org/rucken/todo-nestjs
[dependencies-image]: https://david-dm.org/rucken/todo-nestjs/status.svg
[dependencies-url]: https://david-dm.org/rucken/todo-nestjs

---
# frontend: rucken-todo

[![Greenkeeper badge](https://badges.greenkeeper.io/rucken/todo.svg)](https://greenkeeper.io/)
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Gitter][gitter-image]][gitter-url]
[![Join the chat at telegram][telegram-image]][telegram-url]

Core with UI for web and native todo application maked on Angular6+

## Usage
```
git clone https://github.com/rucken/todo.git my-app
cd my-app
npm install
npm run start:prod
```

## Quick links

[@rucken/cli](https://github.com/rucken/cli) - Console tools to create and build [Angular6+](https://angular.io/) and [NestJS](https://nestjs.com/) application based on [Rucken](https://github.com/rucken) template

[Live demo: master (SPA on GhPages)](https://rucken.github.io/todo) [[source]](https://github.com/rucken/todo) - Demo application (backend: https://rucken-todo-nestjs.now.sh ).

[Live demo: develop (SSR on Now)](https://rucken-todo.now.sh ) [[source]](https://github.com/rucken/todo) - Demo application with server side rendering (backend: https://rucken-todo-nestjs.now.sh ).

[Live demo: develop (NestJS on Now)](https://rucken-todo-nestjs.now.sh) [[source]](https://github.com/rucken/todo-nestjs) - Demo application with live backend (backend: https://nestjs.com).


## License

MIT

[travis-image]: https://travis-ci.org/rucken/todo.svg?branch=master
[travis-url]: https://travis-ci.org/rucken/todo
[gitter-image]: https://img.shields.io/gitter/room/rucken/todo.js.svg
[gitter-url]: https://gitter.im/rucken/todo
[npm-image]: https://badge.fury.io/js/%40rucken%2Ftodo-web.svg
[npm-url]: https://npmjs.org/package/@rucken/todo-web
[dependencies-image]: https://david-dm.org/rucken/todo-web/status.svg
[dependencies-url]: https://david-dm.org/rucken/todo-web
[telegram-image]: https://img.shields.io/badge/chat-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/rucken