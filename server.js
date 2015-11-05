var app = require('./server-config.js');

//this will have to change for azure's mongo syntax
var port = process.env.PORT || 4568;

app.listen(port);

console.log('Server now listening on port '+ port);
