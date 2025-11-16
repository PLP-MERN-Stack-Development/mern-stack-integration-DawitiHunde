const Category = require('../models/Category');
const slugify = require('slugify');

exports.getAll = async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
};

exports.create = async (req, res) => {
  const { name } = req.body;
  const slug = slugify(name, { lower: true, strict: true });
  const c = await Category.create({ name, slug });
  res.status(201).json(c);
};
