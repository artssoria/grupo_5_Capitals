var express = require('express');
var app = express();
var path = require('path');
const rutaHome = require('./routes/home')
const rutaUsers = require('./routes/users')


app.use(express.static('public'));

const port = process.env.PORT || 3000; 

app.use('/', rutaHome);

app.use('/users', rutaUsers);



// Ruta para la páginas descubri (4 html)
app.get('/puna', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'puna.html')); // 
});
app.get('/quebrada', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'quebrada.html')); // 
});
app.get('/valle', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'valles.html')); // 
});

app.get('/yungas', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'yungas.html')); // 
});
// Ruta para la página de Login

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


app.listen(port, function() {
    console.log('Arrancando Express desde el puerto 3000');
});
