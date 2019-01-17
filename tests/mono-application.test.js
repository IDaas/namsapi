/**
 * NodeGard Tests
 * @author Yann SEGET <dev@leafgard.fr>
 */

// Loading .ENV variables into application 
require('dotenv').config()

//  /!\ JUST FOR TESTS
var cluster = require('cluster')

// Setting up application
const Application = require('../src/Framework')

// Load the modules in application
Application.use({
  'WebServer': require('../src/Modules/WebServer')
})

// Running application
Application.run()

/**
 * /!\ TESTS
 */

test('Detecting WebServer as global variable', () => {
  expect( WebServer ).toBe( require('../src/Modules/WebServer') )
})

test('Mono-thread application', () => {
  expect( Application.workers ).toBeUndefined()
})