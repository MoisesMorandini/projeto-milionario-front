import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdShoppingCart } from 'react-icons/md';
import { ProductList, Container, Paginator } from './styles';
import apiBack from '../../services/apiBack';
import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';
import { Carousel } from 'react-responsive-carousel'
import SideCart from '../../components/SideCart'
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  async componentDidMount() {
    const search = this.props.res;
    let response;
    let data;
    response = await apiBack.get(`products/search?page=1`);
    data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));
    this.setState({ products: data });
  }

  handleAddProduct = id => {
    const { addToCartRequest, res } = this.props;

    addToCartRequest(id, res);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;
    return (
      <Container>
        <div className="container-carousel">
          <Carousel showThumbs={false} showStatus={false} showArrows={false} useKeyboardArrows={true}
            interval={3000} autoPlay={true} stopOnHover={true} infiniteLoop={true} width="100%"
            showIndicators={true}>
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
        <SideCart ></SideCart>
        <ProductList>
          {products.map(product => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img src="https://img.bgxcdn.com/thumb/large/oaupload/ser1/banggood/images/99/6C/44f193a0-eced-41e4-ba78-226d7b3b25f8.jpg" alt={product.name} />
                <strong>{product.name}</strong>
              </Link>
              <span>{product.priceFormatted}</span>
              <button
                type="button"
                onClick={() => this.handleAddProduct(product.id)}
              >
                <span>ADICIONAR</span>
                <div>
                  <MdShoppingCart size={16} color="#FFF" />
                  {amount[product.id] || 0}
                </div>
              </button>
            </li>
          ))}
        </ProductList>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
