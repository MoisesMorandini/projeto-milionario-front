import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdShoppingCart } from 'react-icons/md';
import { ProductList,Container } from './styles';
import apiBack from '../../services/apiBack';
import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';
import { Carousel } from 'react-responsive-carousel';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {products: []};
  }

  async componentDidMount() {
    const search = this.props.res;
    let response;
    let data;
    //response = await apiBack.get(`productlist/${search}`);
    response = await apiBack.get(`products/search`);
    data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),

    }));
    const color = process.env.COLOR;
    console.log('asdasdasd', data);
    console.log(`color`, color)

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
          <Carousel showThumbs={false} showStatus={false} showArrows={true} useKeyboardArrows={true}
              interval={3000} autoPlay={true} stopOnHover ={true} infiniteLoop={true} width="100%"
              showIndicators={true}>
                <div className="color" >
                    <img src="https://www.eberspaecher.es/fileadmin/data/corporatesite/images/header_1700x400/fuel_operated_heaters/eberspaecher-header-easystart-web-1700x400.jpg"/>
                </div>
                <div className="color">
                    <img src="https://upload-projeto-milionario.s3.amazonaws.com/d181214557624f02bf90393303239af8.png"/>
                </div>
                <div className="color">
                    <img src="https://upload-projeto-milionario.s3.amazonaws.com/3c16d15dae810acf8c8b9c15117fde7a.jpg"/>
                </div>
                <div className="color">
                    <img src="https://www.unigestion.com/wp-content/uploads/2019/02/1700x400-bandeau_waterfall.jpg"/>
                </div>
            </Carousel>

        </div>
        <ProductList>
          {products.map(product => (
            <li key={product.id}>
              <img src={product.file.url} alt={product.name} />
              <strong>{product.name}</strong>
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
          <h1>sdfasdfasdvgifuasdzs</h1>
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
