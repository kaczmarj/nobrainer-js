#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# copy models into build output directory
cp -r models dist/

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:kaczmarj/nobrainer-js.git master:gh-pages

cd -
