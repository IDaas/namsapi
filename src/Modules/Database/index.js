
module.exports = new ( class Database {

    constructor() {
      this.mysql = require('mysql')
      this.db = new this.mysql.createConnection({
          user: 'root',
          password: '',
          host: 'localhost',
          database: 'namsapi',
      })
    }
  
    prepare() {

    }
  
    run() {
      
    }
  
  } )