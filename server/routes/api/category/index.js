const router = require('express').Router();
const controller = require('./category.controller');
const authMiddleware = require('./../../../middlewares/auth');

router.use('/create', authMiddleware);
router.post('/create', controller.create);

module.exports = router;
