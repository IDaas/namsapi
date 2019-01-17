module.exports = new class User {
  constructor() {}

  prepare() {
    this.router = WebServer.express.Router();
    this.router.get("/show", (req, res) => {
      Database.db.query(
        {
          sql: "SELECT * from users",
          values: []
        },
        (error, results, fields) => {
          if (error) throw error;
          console.log(results);
          res.end(JSON.stringify(results));
        }
      );
    });

    //create an user
    this.router.post("/", (req, res) => {
      //l'ensemble des cas invalides
      var invalids = [];
      //test pour l'username
      Database.db.query(
        {sql: "SELECT 1 FROM users where username = ? limit 1",values: [req.body.username]},(error, results, fields) => {
          if (results[0]) {
            invalids.push("Le nom d'utilisateur existe déja !");
          }
          //test pour le mail
          Database.db.query({sql: "SELECT 1 FROM users where email = ? limit 1",values: [req.body.email]},(error, results, fields) => {
              if (results[0]) {
                invalids.push("L'email existe déja!");
              }
              var errors;
              if (invalids.length != 0) {
                errors = { errors: invalids };
                res.status(418).json(errors);
                return
              } 
              else{
                Database.db.query({sql: "INSERT into users (username,first_name,last_name,email,mailtoken,validate,password,centre) values(?,?,?,?,?,?,?,?)",
                      values: [req.body.username,req.body.first_name,req.body.last_name,req.body.email,req.body.mailtoken,req.body.validate,req.body.password,req.body.centre]},
                  (error, results, fields) => {
                    if (error) {
                      errors = { errors: ["Une erreur est survenue"] };
                      res.status(418), res.json(errors);
                    }
                    else{
                      Database.db.query({sql: "SELECT id FROM users where username = ? limit 1",values:[req.body.username]},(error,results,fields)=>{
                        if (error) {
                          errors = { errors: ["Une erreur est survenue ici"] };
                          res.status(418), res.json(errors);
                        }else{
                          res.status(200).json(results[0]);
                        }

                      })
                    }
                  
                  }
                );
              }
            }
          );
        }
      );

      
    });

    //Validate email
    this.router.get("/validate/:token", (req, res) => {
      Database.db.query(
        {
          sql: "UPDATE  users SET validate = 1 where mailtoken = ?",
          values: [req.params.token]
        },
        (error, results, fields) => {
          if (error) throw error;
          res.end("Successfuly singed");
        }
      );
    });

    //get an user
    this.router.get("/:username", (req, res) => {
      Database.db.query(
        {
          sql:
            "SELECT  'id', username,first_name , last_name,email, mailtoken from users WHERE username = ? LIMIT 1",
          values: [req.params.username]
        },
        (error, results, fields) => {
          if (error) {
            res.status("404").send("Unne erreur s'est produite");
          }

          if (!results[0]) {
            res.status("404").send("L'utilisateur n'existe pas");
          }
          res.json(results[0]);
        }
      );
    });

    this.router.post("/login", (req, res) => {
      Database.db.query(
        {
          sql:
            "SELECT * from users where username = ? and password = ? limit 1",
          values: [req.body.username, req.body.password]
        },
        (error, results, fields) => {
          if (error) throw error;
          res.json(results[0]);
        }
      );
    });

    this.router.post("/", (req, res) => {
      res.end(JSON.stringify(req.body));
    });

    WebServer.app.use("/user", this.router);
  }

  run() {}
}();
