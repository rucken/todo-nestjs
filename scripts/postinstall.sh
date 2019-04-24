node ./scripts/patch.js
if [ ! -f "./vendors/rucken/core-nestjs/package.json" ]; then
mkdir -p ./vendors/rucken/core-nestjs
fi
if [ -f "./node_modules/@rucken/core-nestjs/package.json" ]; then
cp -rf ./node_modules/@rucken/core-nestjs/* ./vendors/rucken/core-nestjs
fi
if [ -f "./vendors/rucken/core-nestjs/package.json" ]; then
npm link ./vendors/rucken/core-nestjs
fi
if [ -f "./vendors/rucken/core-nestjs/node_modules" ]; then
rm -rf ./vendors/rucken/core-nestjs/node_modules
fi

if [ ! -f "./vendors/rucken/auth-nestjs/package.json" ] ; then
mkdir -p ./vendors/rucken/auth-nestjs
fi
if [ -f "./node_modules/@rucken/auth-nestjs/package.json" ]; then
cp -rf ./node_modules/@rucken/auth-nestjs/* ./vendors/rucken/auth-nestjs
fi
if [ -f "./vendors/rucken/auth-nestjs/package.json" ]; then
npm link ./vendors/rucken/auth-nestjs
fi
if [ -f "./vendors/rucken/auth-nestjs/node_modules" ]; then
rm -rf ./vendors/rucken/auth-nestjs/node_modules
fi