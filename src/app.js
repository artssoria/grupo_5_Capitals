var express = require('express');
var app = express();
var path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const multer = require('multer');
let session = require('express-session');
const cookies = require('cookie-parser')

const middleLog = require('./middlewares/middleLog');

//Metodo de session para sesiones de usuario
app.use(session({secret: "Shh, es un secreto!", resave: false, saveUninitialized: false}));
app.use(cookies());
app.use(middleLog);

//Metodo de override para procesar put y delete
app.use(methodOverride("_method"));

// Middleware para analizar el cuerpo de las solicitudes POST
app.use(express.urlencoded({ extended: false }));

const rutaHome = require('./routes/home');
const rutaUsers = require('./routes/users');
const rutaDescubri = require('./routes/descubri');
const rutaProducto = require('./routes/producto'); //JSON
const rutaAdmin = require('./routes/admin');
const rutaProduct = require('./routes/products');
const rutaCart = require('./routes/carts');

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
app.use('/admin', rutaAdmin);
app.use('/products', rutaProduct);
app.use('/carts/', rutaCart);

app.use((req,res,next)=>{
    res.status(404).render('not-found')
});

// // capturas del formulario de products.json
// app.post('/carga-productos', (req, res) =>{
//     console.log(req.body);
// })

// app.post('/register', (req, res) => {
//     // Aquí puedes manejar los datos del formulario
//     console.log(req.body);

//     // Redirige al usuario a home.html después de enviar el formulario
//     res.redirect('/'); // Redirige a la página de inicio
// });
// app.post('/login', (req, res) => {
//     // Aquí puedes manejar los datos del formulario
//     console.log(req.body);

//     // Aquí debes verificar los datos del usuario en tu base de datos
//     // Si los datos son correctos, puedes iniciar la sesión del usuario

//     // Redirige al usuario a la página principal
//     res.redirect('/');
// });
