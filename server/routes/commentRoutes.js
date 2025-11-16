const router = require('express').Router();
const Joi = require('joi');
const validate = require('../middleware/validate');
const commentCtrl = require('../controllers/commentController');

const schema = Joi.object({
  postId: Joi.string().required(),
  authorName: Joi.string().required(),
  content: Joi.string().min(1).required()
});

router.post('/', validate(schema), commentCtrl.create);
router.get('/:postId', commentCtrl.getByPost);

module.exports = router;
