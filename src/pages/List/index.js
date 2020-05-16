import React from 'react';
import { connect } from 'react-redux';
import { Container } from './styles';
import ProductList from '../../components/ProductList';
import SideCart from '../../components/SideCart';

function List() {
  return (
    <Container>
      <ProductList />
      <SideCart isHome={false} />
    </Container>
  );
}

export default connect()(List);
