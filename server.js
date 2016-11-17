var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

//DB config
var config = {
  user : 'pulkit604',
  database : 'pulkit604',
  host : 'db.imad.hasura-app.io',
  port : '5432',
  password : process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
  secret : '124421312' ,
  cookie : {maxAge: 1000*60*60*24*30}
}));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/ui/about.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'about.html'));
});
app.get('/ui/prof.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'prof.html'));
});


function hash(input,salt){
  
 var hashed = crypto.pbkdf2Sync(input,salt,15000,256,'sha512');
  return ["pbkdf2","15000",salt,hashed.toString('hex')].join('$');
  
}

app.get('/create-user', function (req,res){
  
    var username = req.body.username;
    var password = req.body.password;
  
    var salt = crypto.getRandomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('Insert into "user" (username, password) values ($1, $2)', [username, dbSting], function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else
      {
          res.send('Creation of User successful');
                   }
                   
    });
  
});


      
      app.post('/login', function(req,res){
        
    var username = req.body.username;
    var password = req.body.password;
  
   
    pool.query('Select * from "user" where username = $1', [username], function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else
      { if( result.rows.length === 0){
          res.send(403).send('The entered username or password seems invalid');
      }
        else{
          var dbString = result.rows[0].password;
         var salt =  dbString.split('$')[2];
          var hashedPassword = hash(password,salt);
            if(hashedPassword === dbString) {
              
              req.session.auth = {userId: result.rows[0].id};
              
              
              res.send('Creditentials match ');
              
                   }else {
                      res.send(403).send('The entered username or password seems invalid');
                   }
        }
      }
    });
      });
      
      
var pool = new Pool(config);


app.get('/check-login', function(req,res){
      if(req.session && req.session.auth && req.session.auth.userId) {
        res.send ('You have logged in' + req.session.auth.userId.toString());
      }
  else{
    res.send('you are not logged in');
  }
});
        
app.get('/logout', function(req,res) {
    delete req.session.auth;
    res.send('You are logged out');
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/images/dp.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'dp.jpg'));
});
app.get('/ui/images/apb.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'apb.jpg'));
});
app.get('/ui/images/coll.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'coll.jpg'));
});
app.get('/ui/fonts/SUNN.otf', function(req,res) {
   res.sendFile(path.join(__dirname, 'ui/fonts', 'SUNN.otf')); 
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

      
      
      
      
      
      
      
      
