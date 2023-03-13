const express=require('express')
const Route=express.Router()
const body_parser=require('body-parser');
const HomeController=require('../controller/homecontroller')

Route.use(body_parser.json());
Route.use(body_parser.urlencoded({extended:true}));

//use multer for file upload
const multer = require('multer');
const path = require('path');

//define the static folder 
Route.use(express.static('public'));

// use multer diskStorage for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/userimages'), function (error, success) {
            if (error) throw error;
        })
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '_' + path.extname(file.originalname) 
        cb(null, name, function (error1, success1) {
            if (error1) throw error1
        })
    }
});
//define uploaded storage path
const upload = multer({ storage: storage });

//const auth = require('../middleware/auth')

//define url route
Route.post('/register', upload.single('image'),HomeController.create);


module.exports=Route;