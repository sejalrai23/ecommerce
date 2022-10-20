// import React, { useEffect } from 'react';
// import Layout from "../../components/Layout";
// import { useDispatch, useSelector } from "react-redux";
// import { getProductDetails } from "../../actions/product-action";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions";
import Layout from "../../components/Layout";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../../components/MaterialUI";
import "./style.css";
import { addToCart } from "../../actions";





const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    const { match } = props;
    console.log(props);
    // const payload = {
    //   params: {
    //     productId,
    //   },
    // };
    dispatch(getProductDetailsById(match.params.productId));
  }, []);

  // if (Object.keys(product.productDetails).length === 0) {
  //   return null;
  // }

  return (
    <Layout>
      <h1>hello</h1>
    </Layout>
  );
};

export default ProductDetailsPage;

// const ProductDeatilsPage=(props)=> {

//   const dispatch = useDispatch();


//   useEffect(() => {
//     console.log(props);
//     const { productSlug } = props.match.params;
//     // console.log("id",productId);
//     const payload = {
//       params: {
//         productSlug
//       }
//     }
//     dispatch(getProductDetails(payload));
//   }, [])


//   return (
//     <Layout>
//       productDetailsPage
//     </Layout>
//   )
// }

// export default ProductDeatilsPage
