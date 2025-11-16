const router = require('express').Router();
const validate = require('../middleware/validate');
const Joi = require('joi');
const auth = require('../middleware/auth');
const catCtrl = require('../controllers/categoryController');

const schema = Joi.object({ name: Joi.string().min(2).required() });

router.get('/', catCtrl.getAll);
router.post('/', auth, validate(schema), catCtrl.create);

module.exports = router;
