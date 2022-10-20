import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout/index";
import "./style.css";
import ProductStore from "./ProductStore/index";
import ProductPage from './ProductPage/index';
import getParams from "../../utils/getParams";



function ProductListPage(props) {

  const renderProduct = (props) => {
    console.log(props);
    const params = getParams(props.location.search);
    console.log(params);
    let content = null;
    switch (params.type) {
      case 'Store':
        content = <ProductStore {...props} />;
        break;
      case 'Page':
        content = <ProductPage {...props} />;
        break;
      default:
        content = null;
    }
    return content;
  }
  return (
    <Layout>
      {renderProduct(props)}
    </Layout>
  )
}

export default ProductListPage;
