const express = require('express');
const multer = require('multer');
const router = express.Router();
const { LinksController } = require('../controllers/links.js');

const upload = multer();


router.get("/", LinksController.index);


router.get("/consult",LinksController.consult);



router.post("/access", upload.none(), LinksController.access);

router.post("/checkValue", upload.none(), LinksController.checkValue);


router.post("/addValue", upload.none(), LinksController.addValue);


router.post("/restValue", upload.none(), LinksController.restValue);






module.exports = router;
