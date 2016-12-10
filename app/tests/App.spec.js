'use strict'

const proxyquire = require('proxyquire')

/*
 * Mocked Functionality
 */

const PageStub = class Page {
  setTheme(theme) {
    this.theme = theme
  }
}
const settings = { theme: 'neo' }

/*
 * Import App with mocked Page
 */

const App = proxyquire('../js/App', { '../js/Page': PageStub })

/**
 * Start tests.
 */

describe('App', () => {

  // it('should_init_without_global_variables', () => {
  //   const app = new App()
  //   expect(app).toBeDefined()
  // })

  // it('should_create_with_correct_settings', () => {
  //   const app = new App(settings)
  //   expect(app.settings).toBe(settings)
  // })

  // it('should_return_undefined_when_getting_current_page_before_creating_page', () => {
  //   const app = new App()
  //   expect(app.getCurrentPage()).toBeUndefined()
  // })

  // it('create_Page_should_create_page_with_current_theme', () => {
  //   const app = new App(settings)
  //   app.createPage()
  //   expect(app.pages[0].theme).toBe('neo')
  // })

  // it('createPage_should_create_multiple_pages_with_concurrent_calls', () => {
  //   const app = new App()
  //   app.createPage()
  //   app.createPage()
  //   expect(app.pages.length).toBe(2)
  // })

  // it('setTheme_should_change_theme_for_App', () => {
  //   const app = new App()
  //   app.setTheme('test-theme')
  //   expect(app.theme).toBe('test-theme')
  // })

  // it('setTheme_should_change_theme_for_each_page', () => {
  //   const app = new App()
  //   app.createPage()
  //   app.createPage()
  //   app.setTheme('test-theme')
  //   expect(app.pages[0].theme).toBe('test-theme')
  //   expect(app.pages[1].theme).toBe('test-theme')
  // })

})
