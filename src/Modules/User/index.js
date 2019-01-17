
module.exports = new ( class User {

    constructor() {
      
    }
  
    prepare() {
      this.router = WebServer.express.Router()
      this.router.get('/show', (req, res) => {
        Database.db.query({
          sql: 'SELECT * from users',
          values: []
        }, (error, results, fields) => {
          if (error) throw error;
          console.log(results)
          res.end(JSON.stringify(results))

        })
      })


      this.router.post('/', (req, res) => {
          // res.json(req.body)
        
        console.log(req.body)
        
        
        Database.db.query({
          sql: 'INSERT into users (username,first_name,last_name,email,mailtoken,validate,password,centre) values(?,?,?,?,?,?,?,?)',
          values: [req.body.username,req.body.first_name,req.body.last_name,req.body.email,req.body.mailtoken,req.body.validate,req.body.password,req.body.centre]
        },(error, results, fields) => {
          if (error) throw error;
          res.end("Successfuly singed")

        })
      })



	  
	  this.router.post('/',(req,res)=>{  
		  res.end(JSON.stringify(req.body))
	  })

      WebServer.app.use('/user', this.router)
    }
  
    run() {
      
    }
  
  } )