var express = require ('express');
var app = express();

//ROUTING
app.get('/', function(req,res) {
  res.sendFile(__dirname+'/app/index.html')
});

//SERVE STATIC FILES
app.use(express.static('dist'));
app.use('/bower_components', express.static(__dirname+'/bower_components'))

//LAUNCH WEB SERVER AND LISTEN ON PORT
app.listen(3000, function (){
  console.log ("Server is running and listening on port 3000");
});
