import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdShoppingCart } from 'react-icons/md';
import { Carousel } from 'react-responsive-carousel';
import apiBack from '../../services/apiBack';
import './styles.css';
import SideCart from '../../components/SideCart';
import * as CartActions from '../../store/modules/cart/actions';

function ProductDetails({ addToCartRequest, amount }) {
  const [product, setProduct] = useState({});
  const [techSpecifications, setTechSpecifications] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getProduct() {
      const response = await apiBack.get(`/product/${id}`);
      setProduct(response.data);
      setTechSpecifications(response.data.technical_specifications);
      setImageUrl(response.data.file_products);
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
  const handleAddProduct = (productId) => {
    addToCartRequest(productId, amount);
  };


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
            {imageUrl.map((images) => (
              <div className="color">
                <img src={images.file.url} alt={images.file.name} />
              </div>
            ))}
          </Carousel>

        </div>
        <SideCart isHome={false} />
        <div className="rightDiv">
          <h1>{product.name}</h1>
          <h1 className="price">R$ {product.price},00</h1>
          <p>ou em até 8x de R$ 500,00</p>

          <Link className="addToCart" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdShoppingCart
                style={{ marginRight: '10px' }}
                size={20}
                color="#FFF"
              />
            </div>
            Adicionar ao carrinho
          </Link>
        </div>
      </div>
      <h1 className="descriptionTitle">Descrição</h1>
      <p>{product.description}</p>
      <ShowtTechSpecifications techSpecificationsArray={techSpecifications} />
    </div>
  );
}
const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});
const mapDispatchToProps = (dispatch) => bindActionCreators(CartActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
