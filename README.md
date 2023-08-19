# Whisky tasting

## Start / dev

### Prerequis

Start a Mongodb database instance

```sh
docker run -d -p 27017:27017 --name=mongodb mongo:latest
```

Then execute to start built version :

```sh
pnpm start
```

To execute dev mode :

```sh
pnpm dev
```

## Build

```sh
pnpm build
```

The output directory is `./lib`

## Tests

```sh
pnpm test
```

## To do

- [ ] Add all properties of tasting
- [ ] Logging
- [ ] Check node formation
- [ ] Check awesome nodejs
- [ ] Consider Vite and Vitest for Node
- [ ] Picture handling
- [ ] Use Rational Database
- [ ] Validation des entrants
- [ ] Add linter + prettier
- [ ] Define a type for TastingScore
- [ ] Error handling
- [ ] VSCode ligatures
- [ ] Configuration using environment variables
- [ ] Deploy (Via Github actions ?)
- [ ] Add an authentication
