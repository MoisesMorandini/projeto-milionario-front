/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdShoppingCart } from 'react-icons/md';
import { FiMeh } from 'react-icons/fi';

import CircularProgress from '@material-ui/core/CircularProgress';
import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';
import apiBack from '../../services/apiBack';
import {
  Container, CustomPagination, List, NotFoundContainer, NotFoundText,
} from './styles';

function ProductList({ amount, addToCartRequest }) {
  const [products, setProducts] = useState([]);
  const [limitView, setLimiteView] = useState(20);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  const { id } = useParams();
  const [categoryId, setCategoryId] = useState(id);
  const [loading, setLoading] = useState(false);
  const [loadingSize, setLoadingSize] = useState(100);
  const [iconEmptySize, setIconEmptySize] = useState(150);
  const [installments, setInstallments] = useState(8);
  const handlePaginationChagne = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 700) {
      setLoadingSize(70);
    }
    if (width < 850) {
      setIconEmptySize(90);
    }
    if (width < 650) {
      setIconEmptySize(50);
    }
  }, []);

  useEffect(() => {
    setCategoryId(id);
  });

  useEffect(() => {
    if (productsCount) {
      setTotalPages(Math.trunc(productsCount / limitView) + 1);
    }
  }, [productsCount, limitView]);

  function formatResponse(data) {
    let productsData = [];
    if (data) {
      productsData = data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
        partialPriceFormatted: formatPrice(product.price / installments),
      }));
    }
    return productsData;
  }

  useEffect(() => {
    async function getProducts() {
      let response;
      let data = [];
      setLoading(true);
      if (categoryId) {
        response = await apiBack.get(
          `products/search?page=${page}&limit=${limitView}&category=${categoryId}`,
        );
      } else {
        response = await apiBack.get(
          `products/search?page=${page}&limit=${limitView}`,
        );
      }
      data = formatResponse(response.data);
      setProductsCount(response.headers.x_total_count);

      setProducts(data);
      setProductsCount(response.headers.x_total_count);

      setLoading(false);
    }
    getProducts();
  }, [categoryId, limitView, page]);

  // eslint-disable-next-line no-shadow

  const handleAddProduct = (id) => {
    addToCartRequest(id, amount);
  };

  return (
    <Container>
      {!loading ? (
        <>
          {products.length ? (
            <>
              <List>
                {products.map((product) => (
                  <li key={product.id}>
                    <Link to={`/product/${product.id}`} className="link">

                      <img src={product.file_products[0].file.url} alt={product.file_products[0].file.name} />
                      <strong>{product.name}</strong>
                      <span>{product.priceFormatted}</span>
                    </Link>
                    <div className="installments-cart">
                      <Link to={`/product/${product.id}`}>
                        <strong className="installments"> {installments}x de {product.partialPriceFormatted}</strong>

                      </Link>
                      <button
                        type="button"
                        onClick={() => handleAddProduct(product.id)}
                      >
                        <div>
                          <MdShoppingCart size={16} color="#FFF" />
                          {amount[product.id] || 0}
                        </div>
                      </button>
                    </div>
                  </li>
                ))}
              </List>
              <CustomPagination
                count={totalPages}
                color="primary"
                page={page}
                size="large"
                onChange={handlePaginationChagne}
                className="pagination"
              />
            </>
          ) : (
            <NotFoundContainer>
              <FiMeh size={iconEmptySize} stroke-width="1.1px" />
              <NotFoundText>
                <p>
                  Ops! Resultado não encontrado!
                </p>

              </NotFoundText>

            </NotFoundContainer>
          )}{' '}
        </>
      ) : (
        <CircularProgress size={loadingSize} className="loading" />
      )}
    </Container>
  );
}
const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
