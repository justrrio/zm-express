/*
VIDEO => 55:20
*/

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'; // Middleware

// Session
import MySQLStore from 'express-mysql-session'; // Session
import session from 'express-session'; // Session from express

// Routes
import UserRoutes from './routes/UserRoute.js';
import AuthRoutes from './routes/AuthRoute.js';
import PengirimanRoutes from './routes/PengirimanRoute.js';
import AgenRoutes from './routes/AgenRoute.js'
import WarehouseRoutes from './routes/WarehouseRoute.js'

const app = express();

// Setting up session
const options = {
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 10
    // createDatabaseTable: true
};
const sessionStore = MySQLStore(options);

// Middleware
app.use(cors({
    credentials: true, // Front-end can send request with cookies and credentials
    origin: 'http://127.0.0.1:5500', // Domain that can use our API
}));
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false, // Just save the session when changes happen
    saveUninitialized: true, // Save new session even it is not have any data
    store: sessionStore,
    cookie: {
        secure: 'auto', // Automatically change the value to false or true if the request from HTTP or HTTPS
    }
}));
app.use(express.json()); // Send json data to the client
app.use(AuthRoutes);
app.use(UserRoutes);
app.use(PengirimanRoutes);
app.use(AgenRoutes);
app.use(WarehouseRoutes);

// Listen to specified port
app.listen(process.env.APP_PORT, () => {
    console.log("Server is running.");
    console.log("CPU Usage:", process.cpuUsage().user / 1000);
});