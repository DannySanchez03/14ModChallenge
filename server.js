// Require necessary dependencies
const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

// Create an Express application instance
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// Middleware for session management with Sequelize store
const sess = {
    secret: "Super secret secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

// Set up session middleware
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

console.log('Views directory:', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use(routes);

// Synchronize database schema and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
