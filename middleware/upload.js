const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,'uploads/');
    },
    filename : (req,file,cb) => {
        cb(null,Date.now() + '-' + file.originalname);
    }
})

const fileFilter = (req,file,cb) => {
    const img = file.mimetype;
    if(img == 'image/jpg' || img == 'image/jpeg' || img == 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

module.exports = multer({storage : fileStorage,fileFilter:fileFilter}).single('image');