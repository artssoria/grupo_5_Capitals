var express = require('express');
var app = express();
var path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const multer = require('multer');

//Metodo de override para procesar put y delete
app.use(methodOverride("_method"));

// Middleware para analizar el cuerpo de las solicitudes POST
app.use(express.urlencoded({ extended: false }));

// Haz que multer esté disponible en toda la aplicación


const rutaHome = require('./routes/home');
const rutaUsers = require('./routes/users');
const rutaDescubri = require('./routes/descubri');
const rutaProducto = require('./routes/producto');
const rutaAdmin = require('./routes/admin');

// static para establecer la ruta de public como estática
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './src/views');

const port = process.env.PORT || 3000; 
app.listen(port, function() {
    console.log('Arrancando Express desde el puerto 3000');
});

app.use('/', rutaHome);
app.use('/users', rutaUsers);
app.use('/descubri', rutaDescubri);
app.use('/producto', rutaProducto);
app.use('/admin', rutaAdmin);

app.use((req,res,next)=>{
    res.status(404).render('not-found')
});

// capturas del formulario de products.json
app.post('/carga-productos', (req, res) =>{
    console.log(req.body);
})

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
