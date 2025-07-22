---
title: Installieren
weight: 100
---

## Hugo Module 

```
hugo mod init "example/seite"
hugo mod get github.com/ci-db/hugo-theme-cidb-dokus
```

```
cat >> hugo.yaml <<EOL
module:
  proxy: "direct"
  imports:
    - path: "github.com/ci-db/hugo-theme-cidb-dokus"
EOL
```

### Optional

add .env 
```
cat >> .env.example <<EOL
DEV_BASE_URL=http://localhost:9003/
DEV_PORT=9003
EOL
cp .env.example .env
```

add package.json 
```
cat >> package.json <<\EOL
{
  "name": "project-name",
  "version": "0.0.0",
  "repository": "github:cidb/hugo-theme-cidb-dokus",
  "license": "Apache-2.0",
  "scripts": {
    "_dev": "hugo   --bind  0.0.0.0 --baseURL \"${DEV_BASE_URL:-http://localhost}\" -p ${DEV_PORT:-9001} server  --disableFastRender",
    "_build:paged_search_index": "hugo  --cleanDestinationDir -d 'public_pagefind' && pagefind --site './public_pagefind' --output-path ./static/_pagefind",
    "_upd:mod": "hugo mod get -u github.com/ci-db/hugo-theme-cidb-dokus",
    "search": "npm run _build:paged_search_index",
    "dev": "dotenv -- npm run _dev",
    "build": "hugo  --cleanDestinationDir",
    "prepare": "npm run _upd:mod"
  },
  "dependencies": {
    "bootstrap": "5.3.7",
    "bootstrap-icons": "^1.13.1",
    "dotenv-cli": "^8.0.0",
    "fuse.js": "^7.1.0",
    "jquery": "^3.7.1",
    "pagedjs": "^0.4.3",
    "pagefind": "^1.3.0"
  },
  "peerDependencies": {
    "hugo-extended": "0.147.8"
  }
}
EOL
```
install npm package

```
npm install
```

