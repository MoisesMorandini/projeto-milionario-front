import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import apiBack from '~/services/apiBack';

function CheckoutSuccess() {
  const cart = useSelector((state) => state.cart);
  const location = useLocation();
  useEffect(() => {
    async function getSuccess() {
      try {
        console.log('cart', cart);
        let total = 0;
        cart.forEach((c) => {
          total += c.price;
        });
        console.log('total', total);
        const query = new URLSearchParams(location.search);
        const paymentId = query.get('paymentId');
        const token = query.get('token');
        const payerId = query.get('PayerID');

        const response = await apiBack.post(`users/success?PayerID=${payerId}&token=${token}&paymentId=${paymentId}`, {
          total,
        });
        // console.log('response', response.data);
        // toast.success('Endereço adicionado com sucesso!');
      } catch (error) {
        // toast.error('Falha ao cadastrar endereço!');
      }
    }
    getSuccess();
  }, []);
  return (
    <>
      <div>
        <h1>success</h1>
      </div>
    </>
  );
}

export default connect()(CheckoutSuccess);
