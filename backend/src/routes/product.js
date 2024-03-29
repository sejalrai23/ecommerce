const express = require('express');
const { requireSignin, adminMiddleware,uploadS3 } = require('../common-middleware/index');
const router = express.Router();
const { createProducts, getProductsBySlug, getProductDetailsById} = require("../controller/product");
const multer = require("multer");
const shortid = require("Shortid");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    }
});

const upload = multer({ storage });



router.post("/product/create", requireSignin, adminMiddleware, uploadS3.array('productPic'), createProducts);
router.get("/product/:slug", getProductsBySlug);
router.get("/product/:productId", getProductDetailsById);

module.exports = router;