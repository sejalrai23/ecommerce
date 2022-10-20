import React, { useEffect, useState } from 'react';
import { getProductsBySlug } from "../../../actions/product-action";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { generateUrl } from "../../../url";
import { Link } from "react-router-dom"

function ProductStore(props) {
  const dispatch = useDispatch();
  const product = useSelector(state => state.products)
  const [priceRange, setPriceRange] = useState({
    under5k: '5000',
    under10k: '10,000',
    under15k: '15,000',
    under20k: '20,000',
    under30k: '30,000'
  });

  useEffect(() => {
    console.log(props);
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, [])
  return (
    <>
      {
        Object.keys(product.productsByPrice).map((key, index) => {
          {/* console.log("key", key); */ }
          return (
            <div className="card">
              <div className="card-header">
                <div className="card-title">{props.match.params.slug} mobiles under {priceRange[key]}</div>
                <Button>View All</Button>
              </div>
              <div style={{ display: 'flex' }}>
                {
                  product.productsByPrice[key].map(product =>
                    <Link to={`/${product.slug}/${product._id}/p`} style={{ display: 'block' }} className="product-container">
                      <div className="product-img-cont">
                        <img src={generateUrl(product.productPics[0].img)} alt="pro-img" />
                      </div>
                      <div className="product-info">
                        <div style={{ margin: '5px 0px' }}>{product.name}</div>
                        <div>
                          <span>4.3</span>&nbsp;
                          <span>3352</span>
                        </div>
                        <div className="product-price">{product.price}</div>
                      </div>
                    </Link>

                  )
                }

              </div>

            </div>

          );
        })
      }




    </>
  )
}

export default ProductStore
