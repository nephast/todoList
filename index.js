const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todos')

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + 'public'));
    
    app.get('/', function(req, res) {
        res.sendFile('index.html');
    })
    
    app.use('/api/todos', todoRoutes);
   
    
    
    
    app.listen(port, function() {
        console.log('APP is running on port ' + port);
    })