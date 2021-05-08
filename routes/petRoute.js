// Router
'use strict';
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const multer  = require('multer');
const petController = require('../controllers/petController');
const passport = require('../utils/pass');

const fileFilter = (req,file,cb) => {
  if(file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/gif' ){
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const testFile= (req ,res ,next)=> {
  if(req.file){
    next();
  }else {
    res.status(400).json({errors: 'file is not image'});
  }
};
const upload = multer({ dest: 'uploads/', fileFilter });



router.get('/' , petController.pet_list_get);

router.get('/user/:id', petController.pet_get_by_user_id);

router.post('/',passport.authenticate('jwt', {session: false}),
    upload.single('pet'),
    testFile,
    body('title').isLength({min: 1}).escape().blacklist('?,=,;'),
    body('birthdate').isLength({min: 1}).isDate(),
    body('breed').isLength({min: 1}),
    body('price').isLength({min: 1}),
    body('description').isLength({min:10}),
   // body('user_id').isNumeric,
   // body('pet_category_id').isNumeric,
    petController.pet_create);
router.route('/:id')
    .delete(  petController.pet_delete)
    .put(petController.pet_update)
    .get( petController.pet_get_by_id);

module.exports = router;