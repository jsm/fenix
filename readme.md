# Fenix

[The Rebirth](http://starcraft.wikia.com/wiki/Fenix)

## Setup

### Local Environment

```
yarn
yarn run serve
```

### VSCode

#### TsLint

* Install TSLint Extension

#### Prettier

* Install Prettier - Code formatter Extension
* In your workspace or user settings, add:

```json
  "editor.formatOnSave": true,
```

#### Redux Dev Tools

* [Install Browser Extension](https://github.com/zalmoxisus/redux-devtools-extension#installation)

#### TS Syntax Highlighting

* Prettier breaks function arguments into thier own lines. This behaviour is not overwriteable.
* This breaks the current TS syntax highlighting engine which ships with VSCode. [Github Issue](https://github.com/Microsoft/TypeScript-TmLanguage/issues/481).
* Workaround - use [a development branch version](https://marketplace.visualstudio.com/items?itemName=ms-vscode.typescript-javascript-grammar) of the TS syntax highlighting engine.
