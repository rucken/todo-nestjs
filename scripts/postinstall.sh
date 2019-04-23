node ./scripts/patch.js
if [ ! -d "./vendors/rucken/core-nestjs" ]; then
mkdir -p ./vendors/rucken/core-nestjs
cp -rf ./node_modules/@rucken/core-nestjs/* ./vendors/rucken/core-nestjs
npm link ./vendors/rucken/core-nestjs
fi
if [ -d "./vendors/rucken/core-nestjs/node_modules" ]; then
rm -rf ./vendors/rucken/core-nestjs/node_modules
fi

if [ ! -d "./vendors/rucken/auth-nestjs" ]; then
mkdir -p ./vendors/rucken/auth-nestjs
cp -rf ./node_modules/@rucken/auth-nestjs/* ./vendors/rucken/auth-nestjs
npm link ./vendors/rucken/auth-nestjs
fi
if [ -d "./vendors/rucken/auth-nestjs/node_modules" ]; then
rm -rf ./vendors/rucken/auth-nestjs/node_modules
fi