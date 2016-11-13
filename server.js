var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

//DB config
var config = {
  user = '',
  database = '',
  host = 'db.imad.hasura-app.io',
  port = '5432',
  password = process.env.DB_PASSWORD
};


var pool = new Pool(config);





var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


function hash(input,salt){
  
 var hashed = crypto.pbkdf2Sync(input,salt,15000,256,'sha512');
  return ["pbkdf2","15000",salt,hashed.toString('hex')].join('$');
  
}








app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/images/dp.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'dp.jpg'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
