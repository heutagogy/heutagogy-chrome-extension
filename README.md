# Heutagogy

> Heutagogy  chrome extension project.

## Features

 - Hot reloading React/Redux (Using [Webpack](https://github.com/webpack/webpack) and [React Transform](https://github.com/gaearon/react-transform))
 - Write code with ES2015+ syntax (Using [Babel](https://github.com/babel/babel))

## Examples


#### Popup

![Popup](http://res.cloudinary.com/faradey27/image/upload/v1479574864/Screen_Shot_2016-11-19_at_18.54.19_qtpd74.png)

#### Window

![Window]()

The context menu is created by [chrome/extension/background/contextMenus.js](chrome/extension/background/contextMenus.js).

#### Inject page

The inject script is being run by [chrome/extension/background/inject.js](chrome/extension/background/inject.js).

## Preparing

```bash
# clone it
$ git clone https://github.com/heutagogy/heutagogy-chrome-extension

# Install dependencies
$ npm install
```

## Development

* Run script
```bash
# build files to './dev'
# start webpack development server
$ npm run dev
```
* If you're developing Inject page, please allow `https://localhost:3000` connections. (Because `injectpage` injected GitHub (https) pages, so webpack server procotol must be https.)
* [Load unpacked extensions](https://developer.chrome.com/extensions/getstarted#unpacked) with `./dev` folder.

#### React/Redux hot reload

This uses `Webpack` and `react-transform`, and use `Redux`. You can hot reload by editing related files of Popup & Window & Inject page.

#### Using Redux DevTools Extension

You can use [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) on development mode.

## Build

```bash
# build files to './build'
$ npm run build
```

## Compress

```bash
# compress build folder to {manifest.name}.zip and crx
$ npm run build
$ npm run compress -- [options]
```

#### Options

If you want to build `crx` file (auto update), please provide options, and add `update.xml` file url in [manifest.json](https://developer.chrome.com/extensions/autoupdate#update_url manifest.json).

* --app-id: your extension id (can be get it when you first release extension)
* --key: your private key path (default: './key.pem')  
  you can use `npm run compress-keygen` to generate private key `./key.pem`
* --codebase: your `crx` file url

See [autoupdate guide](https://developer.chrome.com/extensions/autoupdate) for more information.

## Test

* `test/app`: React components, Redux actions & reducers tests

```bash
# lint
$ npm run lint
# test/app
$ npm test
$ npm test -- --watch  # watch files
$ npm run build
```

## LICENSE

[AGPLv3](LICENSE)
