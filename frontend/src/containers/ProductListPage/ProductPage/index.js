import React, { useEffect } from 'react';
import { getProductPage } from '../../../actions/product-action';
import { useDispatch, useSelector } from "react-redux";
import getParams from "../../../utils/getParams";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from "../../../components/UI/Card/Card";

function ProductPage(props) {
  const dispatch = useDispatch();
  const product = useSelector(state => state.products);
  console.log("pro", product);
  const { page } = product;

  useEffect(() => {
    const params = getParams(props.location.search);
    console.log(params);
    const payload = {
      params
    }
    dispatch(getProductPage(payload));
  }, [])
  return (
    <>
      <div style={{ margin: '0 10px' }}>
        <h3>{page.title}</h3>
        <Carousel renderThumbs={() => { }}>
          {
            page.banners && page.banners.map((banner, index) => (

              <a style={{ display: 'block' }} href={banner.navigateTo} key={index}>
                < img src={banner.img} alt="banner" />
              </a>
            ))
          }
        </Carousel>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', margin: '20px 0' }}>
          {page.products && page.products.map((pro, index) => (

            <Card key={index} style={{ width: '30%', height: '400px', margin: '0 1%' }} >
              <img style={{ width: '70%', height: '80%', margin: 'auto' }} alt="" src={pro.img} />
            </Card>
          ))}

        </div>
      </div>
    </>
  )
}

export default ProductPage;
