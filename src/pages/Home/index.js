/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import { Container } from './styles';
import ProductList from '../../components/ProductList';
import apiBack from '../../services/apiBack';

import SideCart from '../../components/SideCart';

function Home() {
  const [banners, setBanner] = useState([]);

  useEffect(() => {
    async function getBanner() {
      const response = await apiBack.get('banner');
      setBanner(response.data);
    }
    getBanner();
  }, []);

  return (
    <Container>
      <div className="container-carousel">
        <Carousel
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          useKeyboardArrows
          interval={3000}
          autoPlay
          stopOnHover
          infiniteLoop
          width="100%"
          showIndicators
        >
          {banners.map((banner) => (
            <div className="color">
              <img src={banner.file.url} alt={banner.name} />
            </div>
          ))}
        </Carousel>
      </div>
      <SideCart />
      <ProductList />
    </Container>
  );
}

export default connect()(Home);
