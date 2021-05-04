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
        'INSERT INTO pet_comments( pet_comment_id ,pet_comm_vst, pet_comm_vet, comment_owner_firstname, comment_owner_lastname, comment_owner_email, comment, pet_id) VALUES (?,?,?,?,?,?,?,?)',
        [commentObj.pet_comment_id, commentObj.pet_comm_vst,commentObj.pet_comm_vet, commentObj.comment_owner_firstname, commentObj.comment_owner_lastname, commentObj.comment_owner_email, commentObj.comment, commentObj.pet_id]);

    console.log('commentModel insert comment:', rows);
  } catch (e) {
    console.error('commentModel post Pet comment:', e);
    return 0;
  }
};

const getViewedTimesByPetId = async (id) =>{
  try {
    console.log(' get view times model by pet id');
    const [rows] = await promisePool.execute(`SELECT viewed FROM USER_PET,PET_VIEWING WHERE USER_PET.pet_id = PET_VIEWING.pet_id and PET_VIEWING.pet_id=? `,[id]);
    return rows;
  } catch (e) {
    console.error('commentModel: ', e.message);
  }
};
const postViewed =async (view) =>{
  try {
    const [rows] = await promisePool.execute('INSERT INTO PET_VIEWING ( viewed, pet_id) VALUES (?, ?);',
        [view.viewed,view.pet_id]);

    console.log('commentModel insert  count view 1:', rows);
    return rows.insertId;
  } catch (e) {
    console.error('commentModel insert view:', e);
    return 0;
  }
}
module.exports = {
  getCommentListByPetId,
  postComment,
  postViewed,
  getViewedTimesByPetId,
};