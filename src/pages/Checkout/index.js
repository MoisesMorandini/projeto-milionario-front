import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Route from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import {
  Container, Paper, Grid, Button,
} from '@material-ui/core';
import { MdSave } from 'react-icons/md';
import apiBack from '~/services/apiBack';

function Checkout() {
  const cartState = useSelector((state) => state.cart);
  // const [cart, setCart] = useState([]);
  async function handleCheckout(data) {
    try {
      // setCart([...cart, { id: c.id, amount: c.amount }]);
      const cartIdAmount = [];
      cartState.forEach((c) => {
        cartIdAmount.push({ id: c.id, amount: c.amount });
      });
      console.log('cart', cartIdAmount);
      const response = await apiBack.post('users/buy', {
        cart: cartIdAmount,
      });
      // console.log('response', response.data);
      window.location = response.data;
      // toast.success('Endereço adicionado com sucesso!');
    } catch (error) {
      console.log('error', error);
      // toast.error('Falha ao cadastrar endereço!');
    }
  }


  return (
    <>
      <div>
        <Form onSubmit={handleCheckout}>
          <Input name="street" placeholder="Rua" />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<MdSave />}
          >
            Salvar
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Checkout;
