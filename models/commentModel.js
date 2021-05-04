const pool = require('../database/db');
const promisePool = pool.promise();

const getCommentListByPetId = async (id) => {
  try {
    console.log(' get all comment Model by pet id');
    const [rows] = await promisePool.execute(`SELECT comment, comment_owner_firstname,comment_owner_lastname,comment_owner_email FROM USER_PET,PET_COMMENTS WHERE USER_PET.pet_id = PET_COMMENTS.pet_id and PET_COMMENTS.pet_id=?  `,[id]);
    return rows;
  } catch (e) {
    console.error('commentModel: ', e.message);
  }
};

const postComment = async (commentObj) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO PET_COMMENTS (  comment_owner_firstname, comment_owner_lastname, comment_owner_email, comment, pet_id) VALUES (?,?,?,?,?)',
        [ commentObj.body.comment_owner_firstname, commentObj.body.comment_owner_lastname, commentObj.body.comment_owner_email, commentObj.body.comment, commentObj.body.pet_id]);

    console.log('commentModel insert comment:', rows);
  } catch (e) {
    console.error('commentModel post Pet comment:', e);
    return 0;
  }
};

module.exports = {
  getCommentListByPetId,
  postComment,
};
