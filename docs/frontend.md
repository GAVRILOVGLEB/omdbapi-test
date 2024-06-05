# Usage
Install pnpm (https://pnpm.io/installation) - Fast, disk space efficient package manager
```bash
npm install -g pnpm
```

Install deps.
```bash
pnpm install
```

Run dev server.
```zsh
pnpm run start
```

Run linters (only for `src/**/*`).
```zsh
pnpm run lint
```

Run unit-tests.
```zsh
pnpm run test
```

Build app.
```zsh
pnpm run build
```

# Overview

The project uses `pnpm` as a package manager (use `pnpm start` instead of `npm start` and so on for all scripts).

The webpack configuration is in the `config` folder. 

`src/domain` - contains the application's defining entities. Most of them are anemic models, as well as business logic. **The domain must be independent**.

`src/application` - all user scenarios, such as authorization etc. The `application` layer can only depend on `domain`, in all other cases it is developed through contracts. The contracts are located in the path `src/application/ports.ts`.

`src/infrastructure` is where all requests to the API, use of third-party libraries, and so on happen. Next to it are the adapters that implement the service contracts.

`src/ui` is the application interface. The interface has its own, specific, state (panel status; color theme used, etc.) - `src/ui/state.ts`. There are also entities - `src/ui/entities.ts`.

https://react.fluentui.dev/ - *Fluent UI* is used as UI framework.
