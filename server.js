import path from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
import session from 'express-session';
import mongoose from 'mongoose';
import varMiddleware from './middleware/variables.js';
import userMiddleware from './middleware/user.js';
import authMiddleware from './middleware/auth-check.js';
import csurf from 'csurf';
import flash from 'connect-flash';
import mongoStore from 'connect-mongodb-session';
const MongoStore = mongoStore(session);

import mongodburl from './keys/index.js';

import User from './models/user.js';

import pillsRoutes from './routes/pills.js';
import authRoutes from './routes/auth.js';

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});
const store = new MongoStore({
  collection: 'sessions',
  uri: mongodburl
});


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.resolve('public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'pill',
  resave: false,
  saveUninitialized: false,
  store
}));
app.use(csurf());
app.use(flash());
app.use(varMiddleware);

app.use('/auth', authRoutes)
app.use('/', authMiddleware, userMiddleware, pillsRoutes);

async function start() {
  try {
    await mongoose.connect(mongodburl);
    if (!await User.findOne())
      await new User({
        email: 'test123321@yy.xx',
        password: '123312'
      }).save();
    app.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();