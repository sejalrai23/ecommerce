const Products = require("../models/product");
const slugify = require("slugify");
const shortid = require("shortid");
const Category = require("../models/category");
const aws=require("aws-sdk");



exports.createProducts = (req, res) => {

    const { name, price, description, category, quantity, createdBy } = req.body;

    // console.log("query", req.query);c
    let productPics = [];
    if (req.files.length > 0) {
       
        productPics = req.files.map(file => {
            // const params={
            //     Bucket:'ecom-clone-img',
            //     Key:file.key,
            //     Expires:60*60
            // };
            // const url=s3.getSignedUrl('getObject',params);
            return { img: file.location }
        })
    }

    const product = new Products({
        name: name,
        slug: slugify(name),
        price,
        description,
        productPics,
        category,
        quantity,
        createdBy: req.user._id

    });


    product.save((error, product) => {
        if (error) { return res.status(400).json(error) }
        if (product) {
            return res.status(200).json({ product, files: req.files })
        }
    })
    // res.status(200).json({ file: req.files, body: req.body });

}

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    // console.log(req);
    Category.findOne({ slug: slug }).exec((error, category) => {
        if (error) {
            return res.status(400).json({ error });
        }

        if (category) {
            Products.find({ category: category._id }).exec((error, products) => {

                if (error) {
                    return res.status(400).json({ error });
                }
                if (products.length > 0) {
                    res.status(200).json({
                        products,
                        productsByPrice: {
                            under5k: products.filter(product => product.price <= 5000),
                            under10k: products.filter(product => product.price > 5000 && product.price <= 10000),
                            under15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                            under20k: products.filter(product => product.price > 15000 && product.price <= 20000),
                            under30k: products.filter(product => product.price > 20000 && product.price <= 30000)
                        }
                    });
                }

            })
        }

        // res.status(200).json({ category });
    })

}

// exports.getProductDetails = (req, res) => {
//     res.status(200).json({req});
//     // const { productSlug } = req.params;
//     // console.log(productSlug);
//     // Products.find({ slug: productSlug }).exec((error, pro) => {
//     //     console.log("hello");
//     //     if (error) {
//     //         return res.status(400).json({ error: error })
//     //     };
//     //     if (pro) {
//     //         console.log(pro);
//     //         res.status(200).json({ pro });
//     //     }
//     // })

//     // if (productId) {
//     //     Products.findOne({ _id: productId }).exec((error, pro) => {
//     //         console.log("hello");
//     //         if (error) {
//     //             return res.status(400).json({ error: error })
//     //         };
//     //         if (pro) {
//     //             res.status(200).json({ pro });
//     //         }
//     //     })
//     // } 
    
// }

exports.getProductDetailsById = (req, res) => {
    console.log("hello");
    const { productId } = req;
    if (productId) {
        Products.findById(productId).exec((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
            res.status(200).json({ product });
        }
    });
    } else {
        return res.status(400).json({ error: "Params required" });
    }
};
