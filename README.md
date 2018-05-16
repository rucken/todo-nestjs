# rucken-todo-nestjs

[![Greenkeeper badge](https://badges.greenkeeper.io/rucken/todo-nestjs.svg)](https://greenkeeper.io/)
[![Build Status][travis-image]][travis-url]
[![dependencies-release][dependencies-image]][dependencies-url]


A simple todo application demonstrating the basic usage of [Rucken](https://github.com/rucken) and [Angular5+](https://angular.io) with [NestJS](https://nestjs.com) as backend.


## Usage
- clone or fork [repository](https://github.com/rucken/todo-nestjs.git) `git clone --recursive https://github.com/rucken/todo-nestjs.git`
- make sure you have [node.js](https://nodejs.org/) installed version 6+
- make sure you have NPM installed version 3+
- copy `_env` to `.env` and set environments for use (on Windows copy with IDE)
- run `npm install` to install project dependencies
- run `npm build` to install project dependencies
- run `npm run start` to fire up prod server (`npm run start:watch` - dev server)
- Open browser to [`http://localhost:5000`](http://localhost:5000)

## Demo application on [Heroku](https://rucken-todo-nestjs.herokuapp.com)

### Users
- user with admin group: admin@admin.com, password: 12345678
- user with user group: user1@user1.com, password: 12345678
- user with user group: user2@user2.com, password: 12345678

### Site
- local: http://localhost:5000
- online: https://rucken-todo-nestjs.herokuapp.com

### Swagger
- local: http://localhost:5000/swagger
- online: https://rucken-todo-nestjs.herokuapp.com/swagger
- apiKey template: ```JWT <token_generated_on_login>```

### Docs
- local: http://localhost:5000/docs
- online: https://rucken-todo-nestjs.herokuapp.com/docs

## Quick links

[Live demo](https://rucken.github.io/todo) [[source]](https://github.com/rucken/todo) - Demo application (backend: http://www.mockapi.io).

[Live demo (SSR)](https://rucken-todo.herokuapp.com) [[source]](https://github.com/rucken/todo) - Demo application with server side rendering (backend: http://www.mockapi.io).

[Live demo (NestJS)](https://rucken-todo-nestjs.herokuapp.com) [[source]](https://github.com/rucken/todo-nestjs) - Demo application with live backend (backend: https://nestjs.com).

## License

MIT

[travis-image]: https://travis-ci.org/rucken/todo-nestjs.svg?branch=master
[travis-url]: https://travis-ci.org/rucken/todo-nestjs
[dependencies-image]: https://david-dm.org/rucken/todo-nestjs/status.svg
[dependencies-url]: https://david-dm.org/rucken/todo-nestjs
