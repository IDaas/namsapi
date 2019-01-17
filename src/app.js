/**
 * NodeGard
 * @author Yann SEGET <dev@leafgard.fr>
 */

// Loading .ENV variables into application
require('dotenv').config()

// Load the config into application
const config = require('../config')

// Setting up application
const Application = require('./Framework')

// Uses clusters (Each CPU core hosts a worker)
if (config.useMultipleCores) {
  Application.useCluster()
}

// Load the modules in application
Application.use(config.Modules)

// Running application
Application.run()