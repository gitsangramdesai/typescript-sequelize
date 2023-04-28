rimraf dist

export NODE_ENV=developement

tsc -p ./tsconfig.build.json --pretty

cp -R src/public dist/src/public

cp package.json dist/

cp .env dist/