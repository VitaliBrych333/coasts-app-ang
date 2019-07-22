const express = require('express');
const coastsModel = require('./coasts-model');
const asyncHandler = require('./utils');

const router = new express.Router();

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const users = await coastsModel.find({}).exec();
        res.json(users);
        res.end();
    }),
);

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const content = req.body;
        await coastsModel.create(content);
        res.end();
    }),
);

module.exports = router;
