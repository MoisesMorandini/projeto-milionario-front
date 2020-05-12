import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdShoppingCart } from 'react-icons/md';
import { Carousel } from 'react-responsive-carousel';
import apiBack from '../../services/apiBack';
import './styles.css';

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const [techSpecifications, setTechSpecifications] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function getProduct() {
      const response = await apiBack.get(`/product/${id}`);
      setProduct(response.data);
      setTechSpecifications(response.data.technical_specifications);
      setImageUrl(response.data.file.url);
    }
    getProduct();
  }, []);

  function TechSpecifications() {
    return (
      <>
        <h1 className="techSpecificationsTitle">Especificações técnicas</h1>
        {
          techSpecifications.map((techSpecification) => (
            <>
              <p>- {techSpecification.name}: {techSpecification.description}</p>
            </>
          ))
        }
      </>
    );
  }

  function ShowtTechSpecifications(props) {
    const { techSpecificationsArray } = props;
    return techSpecificationsArray.length !== 0 ? <TechSpecifications /> : null;
  }

  return (
    <div className="container">
      <div>
        <div className="leftDiv">
          <Carousel
            showThumbs={false}
            showStatus={false}
            showArrows
            useKeyboardArrows
            interval={false}
            stopOnHover
            infiniteLoop
            width="100%"
            showIndicators
          >
            <img src={imageUrl} alt={product.name} />
          </Carousel>
        </div>
        <div className="rightDiv">
          <h1>{product.name}</h1>
          <h1 className="price">R$ {product.price},00</h1>
          <p>ou em até 8x de R$ 500,00</p>
          <Link className="addToCart" to="/">
            <div>
              <MdShoppingCart
                style={{ marginRight: '10px' }}
                size={20}
                color="#FFF"
              />
            </div>
            Comprar
          </Link>
        </div>
      </div>
      <h1 className="descriptionTitle">Descrição</h1>
      <p>{product.description}</p>
      <ShowtTechSpecifications techSpecificationsArray={techSpecifications} />
    </div>
  );
}
