const express = require('express');
const incomeModel = require('./income-model');
const asyncHandler = require('./utils');

const router = new express.Router();

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const items = await incomeModel.find({}).exec();
        res.json(items);
        res.end();
    }),
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
      const id = req.params.id;

      const items = await incomeModel.findById(id).exec();
      res.json(items);
      res.end();
  }),
);

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const content = req.body;

        await incomeModel.create(content, (err) => {
          if(err) return console.log(err);
          res.end();
        });

    }),
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    await incomeModel.findByIdAndDelete(id, (err, field) => {
      if(err) return console.log(err);
      res.send(field);
    });
  })
)

router.put(
  '/:id/update',
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    await incomeModel.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(err) return console.log(err);
      res.end();
    });
  })
)

module.exports = router;
