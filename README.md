# JSON-Splora <img src="https://raw.githubusercontent.com/wellsjo/JSON-Splora/master/app/assets/logos/logo.png" width="40" align="left">

**JSON-Splora** is a GUI for editing, visualizing, and manipulating JSON data with [jq](https://stedolan.github.io/jq/) or JavaScript.

![Demo](http://i.imgur.com/CiXIrrg.gif)

## Design
- Built with [Electron](http://electron.atom.io/)
- Editor and output both use [CodeMirror](https://codemirror.net/)
- Input is parsed as [json5](http://json5.org/)
- Filter with [jq](https://stedolan.github.io/jq/) or JavaScript

The editor is a JavaScript editor, and the input is parsed as [json5](http://json5.org/). This allows for comments as well as a relaxed JSON input format. Once the editor has valid JSON, an input window will appear below, allowing you to manipulate the object with JavaScript or [jq](https://stedolan.github.io/jq/). A panel will appear to the right with the output, and updates live as the input or filter changes.

#### Input
- URLs resolve to any JSON they return
- Drag-and-drop or open any file
- Plain text input

#### Filters
- First evaluated as JavaScript with `output = x${filter}`
- If JS fails, it attempts to use [jq](https://stedolan.github.io/jq/)

## Command Line
```bash
jsplora [file]
```

## Install
Requires at least Node version `6`.
#### Globally (cli)
This will create the application as well as the alias `jsplora`.
```bash
npm i -g json-splora
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

### Name Change
**JSON-Splora** is becoming **json-splora** in npm. This is because of a bug in npm's backend confusing the two packages. I am forced to release 1.0.0, deprecate "JSON-Splora", and move to "json-splora". I apologize for any inconvenience.

## Contributing
Contributions are welcome! Please read through and follow the style of the rest of the code. `eslint` is used as a code pre-commit hook, and will catch many simple errors. Please squash your commits and leave concise commit messages.

## License
[MIT](https://github.com/wellsjo/json-splora/blob/master/LICENSE)
