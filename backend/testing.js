import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.listen(process.env.APP_PORT, () => {
    console.log("Server is up and running!")
})

// Handle request
app.get('/', (req, res) => {
    res.send("<h1>Home Page</h1>");
});

app.get('/user', auth, (req, res) => {
    if (req.admin === 'true') {
        res.send("<h1>Admin Page</h1>");
    }
});

function auth(req, res, next) {
    if (req.query.admin === 'true') {
        req.admin = 'true';
        next();
    } else {
        res.send("<h1>You are not an Admin!</h1>");
    }
}