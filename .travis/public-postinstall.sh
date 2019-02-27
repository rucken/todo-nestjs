#!/bin/bash
node ./scripts/patch.js
npm i --save ./dist/rucken/todo-nestjs
mkdir -p ./vendors/rucken/core-nestjs
mkdir -p ./vendors/rucken/auth-nestjs
cp -rf ./node_modules/@rucken/core-nestjs/* ./vendors/rucken/core-nestjs
cp -rf ./node_modules/@rucken/auth-nestjs/* ./vendors/rucken/auth-nestjs
npm link ./vendors/rucken/core-nestjs
npm link ./vendors/rucken/auth-nestjs