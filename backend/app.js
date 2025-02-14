//dotenv configuration to access process.env.PORT
const dotenv = require("dotenv");
dotenv.config();

const express = require("express")
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
//mongoose connection configure
const connectDb = require("./src/db/db");
//call the function to connect to database
connectDb();

//import routes 
const userRoutes = require('./src/routes/user.routes');
const captainRoutes = require('./src/routes/captain.routes');
const mapRoutes = require('./src/routes/map.routes');
const rideRoutes = require('./src/routes/ride.routes')
const PORT = process.env.PORT;

//for serving static files with '/static/filename' route from 'static files' folder
const path = require("path")
app.use('/static', express.static(path.join(__dirname, 'Static Files')))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapRoutes);
app.use('/rides', rideRoutes);

app.get("/", (req, res) => {
    res.set("Content-Type", "text/html")
    res.send("<a href='#'>hello</a>")
})

module.exports = app;