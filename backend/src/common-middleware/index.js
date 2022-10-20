const jwt = require('jsonwebtoken');
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const multerS3 = require('multer-s3');
const aws= require("aws-sdk");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    }
});
const s3=new aws.S3({
    accessKeyId:'AKIAZZMZPJAYJGUHNVCQ',
    secretAccessKey:'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'

});

// const s3=new aws.S3({
//     accessKeyId:'AKIAZZMZPJAYAPN77RZO',
//     secretAccessKey:'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'

// });
exports.upload = multer({ storage });

exports.uploadS3 = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'ecom-clone-img',
    //   acl:'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname)
      }
    })
  })



exports.requireSignin = (req, res, next) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization;
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        console.log(user);


    } else {
        return res.status(400).json({ message: "Authorization required" });

    }
    next();


}

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(400).json({ message: ' userAccess Denied' });
    }
    next();

}

exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({ message: ' Admin Access Denied' });
    }
    next();
}