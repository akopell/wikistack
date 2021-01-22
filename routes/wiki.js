const router = require("express").Router();
const { db, Page } = require("../models");
const Sequelize = require("sequelize");
const addPage = require("../views/addPage");

router.get("/", async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    console.log(pages.page);
    res.send(pages);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const page = await Page.create(
      {
        title: body.title,
        slug: body.slug,
        content: body.content,
        status: body.status,
      },
      res.json(body)
    );
  } catch (error) {
    console.log(error);
  }
});

router.get("/add", (req, res, next) => {
  try {
    res.send(addPage());
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
