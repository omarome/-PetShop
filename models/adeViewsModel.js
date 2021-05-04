const pool = require('../database/db');
const promisePool = pool.promise();

const getViewedTimesByPetId = async (id) =>{
  try {
    console.log(' get view times model by pet id');
    const [rows] = await promisePool.execute(`SELECT viewed FROM USER_PET,PET_VIEWING WHERE USER_PET.pet_id = PET_VIEWING.pet_id and PET_VIEWING.pet_id=? `,[id]);
    return rows;
  } catch (e) {
    console.error('ade Views Model: ', e.message);
  }
};
const postView =async (viewObj) =>{
  try {

    const [rows] = await promisePool.execute('INSERT INTO PET_VIEWING (viewed, pet_id) VALUES (?, ?)',
        [viewObj.body.viewed, viewObj.body.pet_id]);

    console.log('ade views Model after insert  count view 1:', rows);
    return rows.insertId;
  } catch (e) {
    console.error('ade views Model insert view:', e);
    return 0;
  }
};
const updateView =async (viewObj) =>{
  try {

    const [rows] = await promisePool.execute('UPDATE PET_VIEWING SET viewed=? WHERE pet_id=?',
        [viewObj.body.viewed, viewObj.body.pet_id]);

    console.log(' view Model after update one view :', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('ade views Model update view:', e);
    return false;
  }
};
module.exports = {
  postView,
  getViewedTimesByPetId,
  updateView,
};