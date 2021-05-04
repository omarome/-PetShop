'use strict';
const commentModel = require('../models/commentModel');

const get_comment_list_by_id = async (req, res) => {
  console.log('commentController: http get comment with path param', req.params);
  const comments = await commentModel.getCommentListByPetId(req.params.id);
  res.json(comments);
};

const postCommentByPetId = async (req, res) => {
  console.log('commentController: http post comment with path param', req.params);


  console.log('comment obg.',req);

  const comment = await commentModel.postComment( req);
  console.log('after await call in commentController')
  res.json(comment);
};


module.exports = {
  get_comment_list_by_id,
  postCommentByPetId,
};