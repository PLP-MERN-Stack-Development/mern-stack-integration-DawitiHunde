const Post = require('../models/Post');
const slugify = require('slugify');

exports.getAll = async (req, res) => {
  const { page = 1, limit = 10, q, category } = req.query;
  const filter = {};
  if (q) filter.$or = [
    { title: { $regex: q, $options: 'i' } },
    { content: { $regex: q, $options: 'i' } }
  ];
  if (category) filter.category = category;

  const skip = (page - 1) * limit;
  const [posts, total] = await Promise.all([
    Post.find(filter)
      .populate('author', 'name email')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Post.countDocuments(filter)
  ]);
  res.json({ data: posts, meta: { total, page: Number(page), limit: Number(limit) } });
};

exports.getOne = async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('author', 'name email')
    .populate('category', 'name slug');
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

exports.create = async (req, res) => {
  const { title, content, category } = req.body;
  const slug = slugify(title, { lower: true, strict: true });
  const post = new Post({
    title, content, category, author: req.user._id,
    slug,
    featuredImage: req.file ? `/uploads/${req.file.filename}` : undefined
  });
  await post.save();
  const p = await post.populate('author', 'name email').populate('category', 'name slug');
  res.status(201).json(p);
};

exports.update = async (req, res) => {
  const { title, content, category } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Not found' });
  if (String(post.author) !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

  if (title && title !== post.title) post.slug = slugify(title, { lower: true, strict: true });
  post.title = title ?? post.title;
  post.content = content ?? post.content;
  post.category = category ?? post.category;
  if (req.file) post.featuredImage = `/uploads/${req.file.filename}`;
  await post.save();
  res.json(post);
};

exports.remove = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Not found' });
  if (String(post.author) !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
  await post.remove();
  res.json({ message: 'Deleted' });
};
