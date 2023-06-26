# How to run

## Setup

1. Use node version specify in `.nvmrc`
```shell
nvm install
nvm use

# On windows, nvm-windows can't read from .nvmrc
nvm install 18
nvm use 18
```

2. Enable Corepack to install pnpm automatically
```shell
corepack enable
```

3. Install dependencies
```shell
pnpm install
```

## .env

This project require some secret from [TMDB](https://www.themoviedb.org/) in `.env` file
```dotenv
NEXT_PUBLIC_API_TOKEN=
NEXT_PUBLIC_ACCOUNT_ID=
```

- `NEXT_PUBLIC_API_TOKEN` is from API Read Access Token section in https://www.themoviedb.org/settings/api
- `NEXT_PUBLIC_ACCOUNT_ID` can be obtained from https://developer.themoviedb.org/reference/account-details it will be pre-filled in PATH PARAMS `account_id`

## Run develop

You can now run the project on http://localhost:3000/
```shell
pnpm dev
```

## Run docker

You don't need to complete setup node and pnpm, but you still need to set `.env` file

1. Build Docker using the following command
```shell
docker build -t movie-frontend-assignment .
```

2. Run using the following command, project will be available on http://localhost:8080/
```shell
docker run -d -p 8080:8080 movie-frontend-assignment
```

## Stack

Next.js + Redux with no CSS framework, but use SCSS to make writing CSS easier.


