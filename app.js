const morgan = require('morgan');
const express = require('express');
const app = express();
const layout = require('./views/layout');
const { db, Page, User } = require('./models');
const userRouter = require('./routes/users');
const wikiRouter = require('./routes/wiki');

db.authenticate().then(() => {
  console.log('connected to the database');
});

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send(layout(''));
});

const init = async () => {
  await Page.sync();
  await User.sync();
  await db.sync({ force: true });

  app.listen('3000', () => console.log(`Listening on 3000!`));
};

init();
