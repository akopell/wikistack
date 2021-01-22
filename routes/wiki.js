const router = require('express').Router();
const { db, Page } = require('../models');
const Sequelize = require('sequelize');

router.get('/', async (req, res, next) => {
  const pages = await Page.findAll();
  res.send(pages);
});

router.post('/', async (req, res, next) => {
  const body = req.body;
  const page = await Page.create({
    title: body.title,
    slug: body.slug,
    content: body.content,
    status: body.status,
  });
});

module.exports = router;
