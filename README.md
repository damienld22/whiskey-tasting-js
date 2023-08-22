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

### Mandatory

- [ ] API Doc
- [ ] Add front
- [ ] Deploy (Via Github actions ?)

### Optional

- [ ] Consider Vite and Vitest for Node
- [ ] Use Rational Database
- [ ] VSCode ligatures
- [ ] Add an authentication
- [ ] Email sending with weekly reports
- [ ] More accurancy on Tasting properties

## Ideas

- [ ] Autocomplete to search tastings
