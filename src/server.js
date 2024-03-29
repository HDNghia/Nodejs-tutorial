import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initApiroute from './route/api';
import cors from 'cors';
// import connection from './configs/connectDB';

require('dotenv').config();
var morgan = require('morgan')

const app = express();
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
    //check => return res.send()
    console.log('>>> run into my middleware')
    console.log(req.method)
    next();
})

app.use(morgan('combined'))
app.use(cors())
//dùng để lấy dữ liệu từ form 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup view engine
configViewEngine(app);

// init web route
initWebRoute(app);

//init api route
initApiroute(app);

//handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

