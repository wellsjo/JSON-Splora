'use strict'

const proxyquire = require('proxyquire')

/*
 * Mocked Functionality
 */

const documentStub = {
  querySelector: function(selector) {
    // no-op
  }
}

const tabsStub = class Tabs {
  constructor(document) {
    // no-op
  }
  setTheme(theme) {
    // no-op
  }
}

// Stub for electron-config
const configStub = class Config {
  constructor(opts) {
    this.theme = 'default'
  }
  set(property, value) {
    this[property] = value
  }
  get(property) {
    return this[property]
  }
}

// TODO: get this working as stub for proxies
const codemirrorStub = {
  fromTextArea: function() {
    // no-op
  }
}

/*
 * Import App with mocked Page
 */

const Settings = proxyquire('../js/Settings', { 'electron-config': configStub })

// TODO: The following proxies should be implemented and tested as well. I ran into a
// problem with something trying to require Editor.js or Output.js, which fail when
// requiring 'codemirror' exlicitely. The only way I've gotten this to work is loading
// CodeMirror globally in index.html and not requiring it.
// Error message when uncommenting require('codemirror'):
// ReferenceError: navigator is not defined

// const Editor = proxyquire('../js/Editor.js', { 'codemirror': codemirrorStub })
// const Output = proxyquire('../js/Output', { 'codemirror': codemirrorStub })
// const Page = proxyquire('../js/Page', { './Editor': Editor, './Output': Output })
const App = proxyquire('../js/App', { './Tabs': tabsStub })

const settings = new Settings()

/**
 * Start tests.
 */

describe('App', () => {

  xit('should_init_without_global_variables', () => {
    const app = new App(documentStub, settings)
    expect(app).toBeDefined()
  })

  xit('should_create_with_correct_settings', () => {
    const app = new App(documentStub, settings)
    expect(app.settings).toBe(settings)
  })

  xit('should_return_undefined_when_getting_current_page_before_creating_page', () => {
    const app = new App(documentStub, settings)
    expect(app.getCurrentPage()).toBeUndefined()
  })

  xit('create_Page_should_create_page_with_current_theme', () => {
    const app = new App(documentStub, settings)
    app.createPage()
    expect(app.settings.get('theme')).toBe('default')
  })

  xit('createPage_should_create_multiple_pages_with_concurrent_calls', () => {
    const app = new App(documentStub, settings)
    app.createPage()
    app.createPage()
    expect(app.pages.length).toBe(2)
  })

  xit('setTheme_should_change_theme_for_App', () => {
    const testTheme = 'neo'
    const app = new App(documentStub, settings)
    app.createPage()
    app.createPage()
    app.setTheme(testTheme)
    expect(app.settings.get('theme')).toBe(testTheme)
    // TODO: Implement proxies and fix errors
    // expect(app.pages[0].editor.getSetting('theme')).toBe(testTheme)
    // expect(app.pages[0].output.getSetting('theme')).toBe(testTheme)
    // expect(app.pages[1].editor.getSetting('theme')).toBe(testTheme)
    // expect(app.pages[1].output.getSetting('theme')).toBe(testTheme)
  })

  // it('setTheme_should_change_theme_for_each_page', () => {
  //   const app = new App()
  //   app.createPage()
  //   app.createPage()
  //   app.setTheme('test-theme')
  //   expect(app.pages[0].theme).toBe('test-theme')
  //   expect(app.pages[1].theme).toBe('test-theme')
  // })

})
