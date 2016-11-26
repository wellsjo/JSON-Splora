# JSON-Splora

**JSON-Splora** is a GUI for editing, visualizing, and manipulating JSON data.

![Demo](https://github.com/wellsjo/json-splora/blob/master/app/assets/demo.gif)

## Design
- Built with [Electron](http://electron.atom.io/)
- Editor and output both use [CodeMirror](https://codemirror.net/)
- Input is parsed as [json5](http://json5.org/)
- Filter with JavaScript or [jq](https://stedolan.github.io/jq/)

#### Input
The editor is actually a JavaScript editor, and the input is parsed as [json5](http://json5.org/). This allows for comments as well as a relaxed JSON input format.

#### Filters
Once the editor has valid JSON, an input window will appear below, allowing you to manipulate the object with JavaScript or [jq](https://stedolan.github.io/jq/).

#### Output
A panel will appear to the right with the output, and updates live as the input or filter changes.

## Build
Build for `darwin`, `linux`, `win32` or all three platforms with one of the following commands:
```
npm run-script build-darwin
npm run-script build-linux
npm run-script build-win32
npm run-script build
```
This will create a local directory `JSON-Splora-<system>`, which will contain the built application.

## License
[MIT](https://github.com/wellsjo/json-splora/blob/master/LICENSE)
