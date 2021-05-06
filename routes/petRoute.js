// Router
'use strict';
const multer  = require('multer');
const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

const fileFilter = (req,file,cb) => {

  console.log("rqe.file", file);

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
router.get('/:id', petController.pet_get_by_id);
router.get('/user/:id', petController.pet_get_by_user_id);
router.delete('/:id' , petController.pet_delete);
router.post('/',
    upload.single('pet'),
    testFile,
    petController.pet_create);
// router.put('/:id',petController.pet_update);

router.put("/:id", upload.single("pet"),   [

      //check('image').custom(diaryController.image_file_validator),
      //check('things').custom(catController.cat_file_validator), // cat_file_validator checks only req.file
    ],
    (req, res) => {
      console.log('tiedosto: ', req.file)
      petController.pet_update(req, res)
    }
)

module.exports = router;