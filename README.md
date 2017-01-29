# Heutagogy

> Heutagogy  chrome extension project.

## Features

 - Hot reloading React/Redux (Using [Webpack](https://github.com/webpack/webpack) and [React Transform](https://github.com/gaearon/react-transform))
 - Write code with ES2015+ syntax (Using [Babel](https://github.com/babel/babel))

## Examples

#### Window

The context menu is created by [chrome/extension/background/contextMenus.js](chrome/extension/background/contextMenus.js).

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
* [Load unpacked extensions](https://developer.chrome.com/extensions/getstarted#unpacked) with `./dev` folder.

#### React/Redux hot reload

This uses `Webpack` and `react-transform`, and use `Redux`. You can hot reload by editing related files of Popup & Window page.

#### Using Redux DevTools Extension

You can use [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) on development mode.

## Build

```bash
# build files to './build'
$ npm run build
```

## Compress

```bash
# generate crx and xml files
$ npm run build
$ npm run compress
```

#### Options

To build `crx` file (auto update), please set options in [compress.config.js](https://github.com/heutagogy/heutagogy-chrome-extension/blob/master/webpack/compress.config.js), and add `update.xml` file url in [manifest.json](https://developer.chrome.com/extensions/autoupdate#update_url manifest.json).

* keyFile: your private key path (default: '../key.pem')
  you can use `npm run compress-keygen` to generate private key `./key.pem`
* contentPath: (default: '../build')
* name: name of crx file (default: 'heutagogy')
* outputPath: path to desired crx and xml files (default: '../dist')
* updateFilename: name of update file (default: 'updates.xml')
* updateUrl: (default: 'http://localhost:8000/')

See [autoupdate guide](https://developer.chrome.com/extensions/autoupdate) for more information.

## Test

* `test/app`: React components, Redux actions & reducers tests

```bash
# lint
$ npm run lint
# test/app
$ npm test
$ npm test -- --watch  # watch files
```

## LICENSE

[AGPLv3](LICENSE)
