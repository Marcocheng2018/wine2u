const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hb = require('express-handlebars');
const fs = require('fs');
const https = require('https')
const passportSetup = require('./utils/strategies/LocalStrategy.js');
const passportFacebookSetup = require('./utils/strategies/FacebookStrategy.js')
const expressSession = require('express-session');


// Database
const NODE_ENV = process.env.NODE_ENV || 'development';
const knexFile = require('./knexfile')[NODE_ENV];
const knex = require('knex')(knexFile);

// Check for Logged in User
const isLoggedIn = require('./utils/guard').isLoggedIn;

// Body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));

// JSON-parser
app.use(bodyParser.json());


// static file
app.use(express.static("public"));

// View engine
app.set('view engine', 'handlebars');
app.engine('handlebars', hb({
    defaultLayout: 'main'
}));

// Express session
app.use(expressSession({
    secret: 'its-a-very-big-secret',
    resave: false,
    saveUninitialized: false
}));

// Passport
// passportSetup(app, knex);
passportFacebookSetup(app, knex);

// Routes
const ViewRouter = require('./ViewRouter.js');
// const SettingsRouter = require('./routes/settingsRouter');
// const EventRouter = require('./routes/eventRouter');
// const PlaceRouter = require('./routes/placeServiceRouter');

// Services
const UserService = require('./services/userService');
// const PlaceService = require('./services/placeService');
// const EventService = require('./services/eventService');

let userService = new UserService(knex);
// let placeService = new PlaceService(knex);
// let eventService = new EventService(knex);


app.use('/', new ViewRouter().router(knex));
// app.use('/settings', (new SettingsRouter(userService)).router());
// app.use('/api/places',new PlaceRouter(placeService).router());
// app.use('/api', isLoggedIn, (new EventRouter(eventService)).router());
// app.use('/event', isLoggedIn, (new EventRouter(eventService)).router());


const httpsOptions = {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt')
}

https.createServer(httpsOptions, app).listen(3000, () => {
    console.log('Application started at port ' + 3000)
})