var express = require('express');
var app = express();
var path = require('path');


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'home.html')); // 
});

// Ruta para la página de Login
app.get('/login2.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'login2.html')); // 
});

// Ruta para la página de registro
app.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});


app.listen(3000, function() {
    console.log('Arrancando Express desde el puerto 3000');
});
