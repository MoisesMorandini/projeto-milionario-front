import React from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import { Container } from './styles';
import ProductList from '../../components/ProductList';

import SideCart from '../../components/SideCart';

function Home() {
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
          <div className="color">
            <img src="https://www.eberspaecher.es/fileadmin/data/corporatesite/images/header_1700x400/fuel_operated_heaters/eberspaecher-header-easystart-web-1700x400.jpg" />
          </div>
          <div className="color">
            <img src="https://upload-projeto-milionario.s3.amazonaws.com/d181214557624f02bf90393303239af8.png" />
          </div>

          <div className="color">
            <img src="https://www.unigestion.com/wp-content/uploads/2019/02/1700x400-bandeau_waterfall.jpg" />
          </div>
        </Carousel>
      </div>
      <SideCart />
      <ProductList />
    </Container>
  );
}

export default connect()(Home);
