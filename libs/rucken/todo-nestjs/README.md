[![Greenkeeper badge](https://badges.greenkeeper.io/rucken/todo-nestjs.svg)](https://greenkeeper.io/)
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/9yo7t483j91vigdp/branch/master?svg=true)](https://ci.appveyor.com/project/EndyKaufman/todo-nestjs/branch/master)
[![dependencies-release][dependencies-image]][dependencies-url]

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/rucken/todo-nestjs)

A simple todo application with [NestJS](https://github.com/nestjs/nest) (Projects, Tasks, Statuses)

## Usage

- clone or fork [repository](https://github.com/rucken/todo-nestjs.git) `git clone --recursive https://github.com/rucken/todo-nestjs.git`
- make sure you have [node.js](https://nodejs.org/) installed version 11+
- copy `develop._env` to `develop.env` and set environments for use (on Windows copy with IDE)
- run `npm install` to install project dependencies
- run `npm run build` to install project dependencies
- run `npm run start:prod` to fire up prod server (`npm run start:dev` - dev server)
- Open browser to [`http://localhost:5000/swagger`](http://localhost:5000/swagger)

## Demo

[https://todo-nestjs.rucken.io](https://todo-nestjs.rucken.io) - Application with [Sqlite](https://www.sqlite.org/index.html) Database on VPS with [Dokku](http://dokku.viewdocs.io/dokku/)

### Users

- user with admin group: admin@admin.com, password: 12345678
- user with user group: user1@user1.com, password: 12345678
- user with user group: user2@user2.com, password: 12345678

### Swagger

- local: [`http://localhost:5000/swagger`](http://localhost:5000/swagger)
- online: [`https://todo-nestjs.rucken.io/swagger`](https://todo-nestjs.rucken.io/swagger)
- apiKey template: `JWT <token_generated_on_login>`

## Typedoc documentations

- local: [`http://localhost:5000/docs`](http://localhost:5000/docs)
- online: [`https://todo-nestjs.rucken.io/docs`](https://todo-nestjs.rucken.io/docs)

## License

MIT

[travis-image]: https://travis-ci.org/rucken/todo-nestjs.svg?branch=master
[travis-url]: https://travis-ci.org/rucken/todo-nestjs
[dependencies-image]: https://david-dm.org/rucken/todo-nestjs/status.svg
[dependencies-url]: https://david-dm.org/rucken/todo-nestjs
[npm-image]: https://badge.fury.io/js/%40rucken%2Ftodo-nestjs.svg
[npm-url]: https://npmjs.org/package/@rucken/todo-nestjs
