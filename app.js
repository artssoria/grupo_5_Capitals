var express = require('express');
var app = express();
var path = require('path');


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'home.html')); // 
});

// Ruta para la página de Login
app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'login.html')); // 
});

// Ruta para la página de registro
app.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Middleware para analizar el cuerpo de las solicitudes POST
app.use(express.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
    // Aquí puedes manejar los datos del formulario
    console.log(req.body);

    // Redirige al usuario a home.html después de enviar el formulario
    res.redirect('/'); // Redirige a la página de inicio
});
app.post('/login', (req, res) => {
    // Aquí puedes manejar los datos del formulario
    console.log(req.body);

    // Aquí debes verificar los datos del usuario en tu base de datos
    // Si los datos son correctos, puedes iniciar la sesión del usuario

    // Redirige al usuario a la página principal
    res.redirect('/');
});


app.listen(3000, function() {
    console.log('Arrancando Express desde el puerto 3000');
});
