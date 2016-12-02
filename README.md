# JSON-Splora

**JSON-Splora** is a GUI for editing, visualizing, and manipulating JSON data.

![Demo](https://github.com/wellsjo/json-splora/blob/master/app/assets/demo.gif)

## Design
- Built with [Electron](http://electron.atom.io/)
- Editor and output both use [CodeMirror](https://codemirror.net/)
- Input is parsed as [json5](http://json5.org/)
- Filter with [jq](https://stedolan.github.io/jq/) or JavaScript

The editor is a JavaScript editor, and the input is parsed as [json5](http://json5.org/). This allows for comments as well as a relaxed JSON input format. Once the editor has valid JSON, an input window will appear below, allowing you to manipulate the object with JavaScript or [jq](https://stedolan.github.io/jq/). A panel will appear to the right with the output, and updates live as the input or filter changes.

## Install
#### Globally
This will create the application as well as the alias `jsplora`.
```bash
npm i -g JSON-Splora
```
#### Locally
Building locally creates a directory `JSON-Splora-<system>` which contains the application.
```
npm install

# build for darwin, linux, win32
npm run-script build-darwin
npm run-script build-linux
npm run-script build-win32
```

## Build
First install dependencies

Build the application for `darwin`, `linux`, `win32` or all three platforms with one of the following commands:
```bash

```
This will create a local directory `JSON-Splora-<system>`, which contains the application.

## Contributing
Contributions are welcome! Progress will be slow otherwise.

## License
[MIT](https://github.com/wellsjo/json-splora/blob/master/LICENSE)
