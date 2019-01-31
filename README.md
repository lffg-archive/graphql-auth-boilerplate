# GraphQL Auth Boilerplate

A GraphQL API boilerplate with some features:

- User auth:
  - Login
  - Logout
  - Register (with e-mail)
  - Reset password (with e-mail)
  - Auth middleware
- Dataloader implementation
- Cookies
- Rate limiting
- Tests

## Notes:

1. There is a global variable called **`__ROOT__`** that points to the `src` directory. You can use it anywhere inside your app.
2. The possible NODE_ENV environment variable values are, _by convention_, **`production`**, **`development`** or **`testing`**.

## To run:

```shell
git clone https://github.com/lffg/graphql-auth-boilerplate
cd graphql-auth-boilerplate

yarn install
```

Then copy the `.env.example` file (creating a new one with the `.env` name) and add your environment variables to it.  
**Note:** You must have MySQL installed.

Then run:

```shell
yarn start
```

---

Copyright (c) Luiz Felipe Gonçalves | 2019-current.  
MIT Licensed.
