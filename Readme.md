# Stock Shop API

This is the API for the Stock Shop application. It is a REST API built with Node.js, Express, Typescript and Postgres.

## Getting Started

To run the API locally, you will need to have Node.js and yarn on your machine. For the database, fill the .env file with your database credentials, these are the values that you need to provide:

- PGHOST
- PGPORT
- PGDATABASE
- PGUSERNAME
- PGPASSWORD

Also include a secret key for the JWT token in the .env file as `SECRET_KEY`.

After that, install the dependencies with `yarn` and run the migrations with `yarn generate`. To start the server, run `yarn dev`.

## Endpoints

Some routes need authentication. This is done with a Bearer JWT token, so include the `authorization` header in your requests as `Bearer your_jwt_here`

To get a JWT token there are two ways, see below:

**`POST /auth`**

Used to log in into an already existing account. Pass a valid email and password and get the JWT for that user.

```yml
body:
  email: string
  password: string
errors: 401 - not authorized
returns:
  user: User
  token: string
```

**`POST /user`**

Creates a new user, you need to provide a user name, email and password.

```yml
body:
  userName: string
  email: string
  password: string
errors: 401 - not authorized
returns:
  user: User
  token: string
```

## Authenticated endpoints

Once you got the JWT token, include it in your requesti to access any of these endpoints.

### User

**`GET /user`**: Returns the user data for the current user.

**`POST /user/edit`**: Edits the current user email or userName, password edit is not supported yet. Returns the edited user.

**`DELETE /user`**: Deletes the user from the database.

### Wallets

**`GET /wallet`**: Returns all the wallets for the currently logged user.

**`GET /wallet/:walletId`**: Returns the specified wallet, if exists. Accepts the query param `withStocks`, if true returns the wallet with all the stocks associated.

**`POST /wallet`**: Creates a new wallet and returns it. You have to specify a `title` and a `color` to create it, all the other possible values are optional and default to 0.
