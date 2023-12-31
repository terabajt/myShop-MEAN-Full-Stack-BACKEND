const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');

const api = process.env.API_URL;

//CORS INIT
app.use(cors());
app.options('*', cors());

const productsRoutes = require('./routers/products');
const categoriesRoutes = require('./routers/categories');
const ordersRoutes = require('./routers/orders');
// const orderItemRoutes = require('./routers/orderItem');
const usersRoutes = require('./routers/users');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

//Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

//Routers
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/users`, usersRoutes);

mongoose
	.connect(process.env.CONNECTION_STRING)
	.then(() => {
		console.log('Connected to database');
	})
	.catch(err => {
		console.log(err);
	});

app.listen(3000, () => {
	console.log('server is running on localhost:3000');
});
