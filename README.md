# Whisky tasting

## Server

### Start / dev

#### Prerequis

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

### Build

```sh
pnpm build
```

The output directory is `./lib`

### Tests

```sh
pnpm test
```

## To do

### Mandatory

- [ ] Add front
- [ ] Deploy (Via Github actions ?)
- [ ] pnpm workspaces

### Optional

- [ ] Consider Vite and Vitest for Node
- [ ] Use Rational Database
- [ ] Add an authentication
- [ ] More accurancy on Tasting properties
- [ ] Use turbo

## Ideas

- [ ] Autocomplete to search tastings
- [ ] Email sending with weekly reports
