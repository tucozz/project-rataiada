<div align="center">
  <h3 align="center">Rataiada</h3>
</div>

## About

A mobile web app for Mausritter's RPG character sheet.

## Made with

- [SvelteKit](https://kit.svelte.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn-svelte](https://www.shadcn-svelte.com/)
- [Flowbite Svelte](https://flowbite-svelte.com/)
- [Iconify](https://iconify.design/)
- [Dexie.js](https://dexie.org/)
- [Vite](https://vitejs.dev/)
- [Playwright](https://playwright.dev/)
- [pnpm](https://pnpm.io/)
- [pwa](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

## Contribuiting

1. Clone the repository

   ```sh
   git clone https://github.com/tucozz/project-rataiada.git
   ```

2. Head to the project directory

   ```sh
   cd project-rataiada/
   ```

3. Set up dependencies

   ```sh
   pnpm i
   ```

4. Spin up development server

```sh
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

### Testing

The project also has unit testing, with vitest, and integration testing, with playwright.

```sh
pnpm test:integration

pnpm test:unit
```

## Building

To create a production version of your app:

```sh
pnpm build
```

You can preview the production build with `pnpm preview`.

## License

Licensed under [Unlicense](./LICENSE).
