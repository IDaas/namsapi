/**
 * NodeGard configuration file
 * @author Yann SEGET <dev@leafgard.fr>
 */

/**
 * All the modules should be declared here.
 * NB: Application won't run if empty !
 * 
 * WebServer is here already declared.
 * It's the built-in webserver provided by the framework.
 * 
 * Global keyname to call: WebServer
 * Location: ./src/Modules/WebServer
 */
module.exports.Modules = {
  'Database': require('./src/Modules/Database'),
  'WebServer': require('./src/Modules/WebServer'),
  'User': require('./src/Modules/User')
}

/**
 * Ability to run on multiple cores or not:
 * true = Uses multiple cores
 * false = Uses only one core
 */
module.exports.useMultipleCores = false