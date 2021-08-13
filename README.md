# ixo-dippersync
Exposes endpoints that return data from a MongoDB populated by [Big Dipper](https://github.com/forbole/big-dipper).

## API Documentation
Refer to [src/schema/api.yml](src/schema/api.yml) or visit the online version (coming soon).

## Run

### From Source
**Requirements**: [MongoDB](https://docs.mongodb.com/manual/installation/)

Copy `.env-example` to `.env` and configure. If this step is skipped, ixo-dippersync will use `.env-example` as the configuration by default.

Then:
```bash
npm install
npm run build
npm start
```

### Using Docker (with Compose)
**Requirements**: [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)

Configure environment in `docker-compose.yml`.

Then:
```bash
mkdir ./data/       # may need to give write permission
mkdir ./data/db/    # may need to give write permission
npm install         # npm version used: 6.14.5; this creates node_modules/ folder
npm run build       # npm version used: 6.14.5; this creates build/ folder
bash bin/start.sh   # may need to superuser privileges
```
