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
