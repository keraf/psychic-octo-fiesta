# Interview project
This project was created for the purpose of a technical interview I was given.

The goal was to create a page in React that lists construction companies, with the possibility to filter them by name (as the user types) and by speciality. An API in NodeJS should also be made to read the data. 

For this project, I chose [NextJS](https://nextjs.org/) as a framework because it provides a solid foundation to build on and fits the type of project I am building. For styling, I am using [Bulma](https://bulma.io/) as it has all the components I needed to quickly get started. I am also using an SQLite database, with a [Prisma](https://www.prisma.io/migrate) schema which I also use to generate types for the [Prisma client](https://www.prisma.io/client).

I generated some data in a JSON file which I am using for seeding the database. Initially I was working with that file directly but thought it would make sense to have the data in a small SQLite database on disk. It offers more features and makes it easier to play with the data.

The display of the data works in two parts. The initial data is served with the page using Server Side Rendering (see `pages/index.tsx`). Updates, when changing pages or filters, are done via an API request (see `pages/api/companies.ts`). For the demo, the `PAGE_SIZE` variable has been set to `3` in `pages/index.tsx`.

## Running the project
Quick start
```bash
yarn && yarn dev
# OR 
npm i && npm run dev
```

Navigate to https://localhost:3000/.

## Commands
| Command | Description |
| --- | --- |
| dev | Run project in dev |
| build | Build project for production |
| start | Build project |
| lint | Lint project |
| setup | Migrate and seed database (automatically run after dependency install) |
| db:migrate | Run migrations |
| db:seed | Seed database |
| db:generate | Generate database type definitions from schema |
| db:nuke | Destroy database |

## If I had more time, I would...
1. Cache results (if distributed, [Redis](https://redis.io/) is a good fit).
1. Write e2e tests with [Cypress](https://cypress.io).
1. Put filter and page state in URL so it can be shared.
1. Break down form components into their own component.
1. Comment the code more extensively.
1. Make it look prettier.
