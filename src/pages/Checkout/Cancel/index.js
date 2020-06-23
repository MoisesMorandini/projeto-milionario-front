import React, { useEffect } from 'react';
import apiBack from '~/services/apiBack';

function CheckoutCancel() {
  async function handleInsertUserAddress(data) {
    try {
      const a = { productId: 1 };
      const response = await apiBack.post('users/buy', a);
      console.log('response', response.data);
      window.location = response.data;
      // toast.success('Endereço adicionado com sucesso!');
    } catch (error) {
      // toast.error('Falha ao cadastrar endereço!');
    }
  }


  return (
    <>
      <div>
        <h1>Cancel</h1>
      </div>
    </>
  );
}

export default CheckoutCancel;
