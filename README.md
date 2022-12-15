# Giphy search app

[React](https://reactjs.org) + [Typescript](https://www.typescriptlang.org) + [Tailwind CSS](https://tailwindcss.com) + [daisyUI](https://daisyui.com) + [Storybook](http://storybook.js.org) + [Vite](https://vitejs.dev) + [ESLint](https://eslint.org) + [Prettier](https://prettier.io) + [Husky](https://github.com/typicode/husky) + [Vitest](https://vitest.dev) + [jest-dom (React Testing Library)](https://github.com/testing-library/jest-dom) + [c8](https://github.com/bcoe/c8) + [Cypress](https://www.cypress.io)

## Initial setup:

1. Install the node.js
   https://nodejs.org/en/download/

2. Install the latest version of [pnpm package manager](https://pnpm.io/installation#using-npm)
   `npm install -g pnpm` or `brew install pnpm`

3. Install the dependencies
   `pnpm install`

4. Create `.env.local` file in the project root folder with your API key for https://developers.giphy.com/dashboard/?create=true
   `VITE_GIPHY_API_KEY=YOUR_KEY`

## Running

`pnpm start`

## Storybook

The solution uses [Storybook](http://storybook.js.org) as the components style guide.

To run the preview:
`pnpm storybook`

To build the production Storybook setup:
`pnpm build-storybook`

To run the preview server with the production Storybook build:
`pnpm preview-storybook`

## Production build

`pnpm build`

To run the preview server with the production build:

`pnpm preview`

## Testing

Live mode
`pnpm test`

Coverage check
`pnpm coverage`

E2E tests
`pnpm e2e`
or
`pnpm e2e:silent` to run in silent mode (on CI, for example)

Pre-commit checks
`pnpm pre-commit`

## Design decisions

- [Tailwind CSS](https://tailwindcss.com) + [PostCSS](http://postcss.org) for tree-shakable utility classes and minimum amount of hand-written CSS
- [daisyUI](https://daisyui.com) for the basic components like cards, buttons, selects and inputs
- [Storybook](http://storybook.js.org) as the components style guide, so the individual components can be build in the sandbox environment
- [Vite](https://vitejs.dev) for bundling everything (much faster than Webpack)
- [ESLint](http://eslint.org) + [Prettier](http://prettier.io) for linting and prettifying the codeHusky for pre-commit hooks
- [Vitest](http://vitest.dev) + [jest-dom (React Testing Library)](https://github.com/testing-library/jest-dom) + [c8](https://github.com/bcoe/c8) for the unit testing
- [Cypress](http://cypress.io) + [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro/) for the end-to-end testing

## Good sides of the implementation

- The dummy components and the business logic are completely separated, so the solution is can use [Storybook](http://storybook.js.org) `pnpm storybook`
- The design is mobile-first, so can be used on any type of the devices
- The building takes a few seconds
- The unit-tests run takes 2-3 seconds
- The E2E tests run takes a few seconds together with production build creation and serving

## Next steps

- Add tags autocomplete
- Add endless scrolling
- Add caching of the search results to the local storage
- Improve test coverage
- Improve the error handling and connect the [TrackJS](https://trackjs.com) or [Sentry IO](http://sentry.io)
- Set up CI / CD process. For example, using (GitHub Actions)[https://github.com/features/actions] or [Gitlab CI/CD](https://docs.gitlab.com/ee/ci/)
