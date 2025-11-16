const router = require('express').Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const Joi = require('joi');
const postController = require('../controllers/postController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

const createSchema = Joi.object({
  title: Joi.string().min(5).required(),
  content: Joi.string().min(10).required(),
  category: Joi.string().optional()
});

router.get('/', postController.getAll);
router.get('/:id', postController.getOne);
router.post('/', auth, upload.single('featuredImage'), validate(createSchema), postController.create);
router.put('/:id', auth, upload.single('featuredImage'), validate(createSchema), postController.update);
router.delete('/:id', auth, postController.remove);

module.exports = router;
