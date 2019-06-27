# tsconfig-ui

Built using `create-react-app`

Deployed with Netlify: https://tsconfig-ui.netlify.com/

Notable Dependencies:
- `json-to-ast`: transforms the TypeScript configuration file into a JSON AST that can be built into an extendable HTML String
- `conditional-reduce`: provides a functional-programming like reduce method that replaces the need of IIFE switch statements
- `react-html-parser`: Uses the HTML String built from the JSON AST and renders functional React components.
- `typography`: standardizes font styles for the application
  - `typopgraphy-plugin-code`: styles `pre` and `code` blocks
  - `typography-theme-github`: uses font style similar to that of GitHub

## Dev
```
yarn install
yarn start
```

Created by Ethan Arrowood & Alyssa Cooper