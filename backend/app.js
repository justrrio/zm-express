import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import UserRoutes from './routes/UserRoute.js';

const app = express();

// Middlewares
app.use(cors({
    credentials: true, // Front-end can send request with cookies and credentials
    origin: 'http://127.0.0.1:5500', // Domain that can use our API
}));
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false, // Just save the session when changes happen
    saveUninitialized: true, // Save new session even it is not have any data
    cookie: {
        secure: 'auto', // Automatically change the value to false or true if the request from HTTP or HTTPS
    }
}));
app.use(express.json()); // Send json data to the client
app.use(UserRoutes);

// Listen to specified port
app.listen(process.env.APP_PORT, () => {
    console.log("Server is running.");
    console.log("CPU Usage:", process.cpuUsage().user / 1000);
});