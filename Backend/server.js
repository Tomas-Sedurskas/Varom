const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session')

require('dotenv').config();

const app = express();
require('./config/passport')(passport);

const port = process.env.PORT || 5500

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!")
});
app.use(express.static(path.join(__dirname, '../Frontend')));
const hbs = exphbs.create({
    defaultLayout: 'base',
    layoutsDir: path.join(__dirname, '../Frontend/views/pages'),
    partialsDir: path.join(__dirname, '../Frontend/views/partials'),
    helpers: {
        renderFullDate: function(date) {
            var monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let day = date.getDate();
            let month = monthsArr[date.getMonth()] + " ";
            let year = date.getFullYear();
            let ordinal = "th ";
            if (day.toString().split('').pop() === "1"){ ordinal = "st "}
            if (day.toString().split('').pop() === "2"){ ordinal = "nd "}
            if (day.toString().split('').pop() === "3"){ ordinal = "rd "}
            return day + ordinal + month + year;
        } 
    }
});
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, '../Frontend/views/pages'));
app.set('view engine', 'handlebars');
app.use(express.urlencoded({
    extended: false
}));

app.use(session({
    secret: 's3cr3t',
    saveUninitialized: true,
    resave: true,
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

const exploreRouter = require('./routes/explore')
const myEventsRouter = require('./routes/myEvents')
const profileRouter = require('./routes/profile')
const activitiesRouter = require('./routes/activities');
const usersRouter = require('./routes/users');

//Pages
app.use('/explore', exploreRouter);
app.use('/myEvents', myEventsRouter);
app.use('/profile', profileRouter);
app.use('/activities', activitiesRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Server is running on: ${port}`);
})  