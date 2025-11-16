const Comment = require('../models/Comment');

exports.create = async (req, res) => {
  const { postId, authorName, content } = req.body;
  const comment = await Comment.create({ post: postId, authorName, content });
  res.status(201).json(comment);
};

exports.getByPost = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).sort({ createdAt: -1 });
  res.json(comments);
};
