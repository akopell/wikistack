const router = require('express').Router();
const { db, Page, User } = require('../models');
const Sequelize = require('sequelize');
const addPage = require('../views/addPage');
const wikipage = require('../views/wikipage');
const main = require('../views/main');

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const page = await Page.create(body);
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: body.author,
        email: body.email,
      },
    });
    await page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  try {
    res.send(addPage());
  } catch (error) {
    console.log(error);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    const author = await User.findOne({
      where: {
        id: page.authorId,
      },
    });
    res.send(wikipage(page, author));
  } catch (error) {
    next(error);
  }

  // res.send(`hit dynamic route at ${req.params.slug}`);
});

module.exports = router;
