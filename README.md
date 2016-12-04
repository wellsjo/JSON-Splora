# JSON-Splora

**JSON-Splora** is a GUI for editing, visualizing, and manipulating JSON data with [jq](https://stedolan.github.io/jq/) or JavaScript.

![Demo](https://github.com/wellsjo/json-splora/blob/master/app/assets/demo.gif)

## Design
- Built with [Electron](http://electron.atom.io/)
- Editor and output both use [CodeMirror](https://codemirror.net/)
- Input is parsed as [json5](http://json5.org/)
- Filter with [jq](https://stedolan.github.io/jq/) or JavaScript

The editor is a JavaScript editor, and the input is parsed as [json5](http://json5.org/). This allows for comments as well as a relaxed JSON input format. Once the editor has valid JSON, an input window will appear below, allowing you to manipulate the object with JavaScript or [jq](https://stedolan.github.io/jq/). A panel will appear to the right with the output, and updates live as the input or filter changes.

#### Input
- URLs resolve to any JSON they return
- Drag-and-drop or open any file
- Text editor

#### Filters
The filter is first evaluated as JavaScript with `output = x${filter}`, then it is parsed with [jq](https://stedolan.github.io/jq/). This allows you to use native powerful JavaScript methods like `.map()` alongside jq's powerful filtering library.

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

## Contributing
Contributions are welcome! Please read through and follow the style of the rest of the code. `eslint` is used as a code pre-commit hook, and will catch many simple errors. Explain the reason for the proposed change in your PR, and how to test it (if applicable). 

## License
[MIT](https://github.com/wellsjo/json-splora/blob/master/LICENSE)
