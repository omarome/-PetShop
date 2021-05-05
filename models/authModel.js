const pool = require('../database/db');
const promisePool = pool.promise();

const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
        'SELECT * FROM REGISTER_USER WHERE email_address = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getUserLogin,
};