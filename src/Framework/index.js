/**
 * NodeGard
 * @author Yann SEGET <dev@leafgard.fr>
 */

module.exports = new(class Framework {

  /**
   * Load all the modules in the application
   * @param {Object} Modules Array of modules
   */
  use(Modules = {}) {
    this.Modules = Modules
    Object.keys(Modules).forEach((Module) => {
      global[Module] = Modules[Module]
    })
  }

  /**
   * Uses clusters to allow the application to run on all CPU cores
   */
  useCluster() {
    this.cluster = require('cluster')
  }

  /**
   * Runs application with/without clusters
   */
  run() {
    if (typeof this.cluster !== 'undefined') {
      // Uses multi-core
      if (this.cluster.isMaster) {
        // Spawns one worker per core
        for (let i = 0; i < require('os').cpus().length; i++) {
          this.cluster.fork()
        }
        this.cluster.on('exit', (worker, code, signal) => {
          // Restarts the worker when it crashes
          this.cluster.fork()
        })
      } else {
        this.runModules()
      }
    } else {
      this.runModules()
    }
  }

  /**
   * Runs all the modules one by one
   */
  runModules() {
    let Promises = []
    Object.keys(this.Modules).forEach((Module) => {
      Promises.push(global[Module].prepare())
    })
    Promise.all(Promises).then(() => {
      Object.keys(this.Modules).forEach((Module) => {
        global[Module].run()
      })
    }).catch((err) => {
      throw err
    })
  }

})