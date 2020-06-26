import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { FaCheck } from 'react-icons/fa';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Container, ContainerText, TextHomePrimary, TextHomeSecondary, TextAlign,
} from './styles';
import apiBack from '~/services/apiBack';


function CheckoutSuccess() {
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state) => state.cart);
  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    async function getSuccess() {
      try {
        let total = 0;
        cart.forEach((c) => {
          total += c.price;
        });
        const query = new URLSearchParams(location.search);
        const paymentId = query.get('paymentId');
        const token = query.get('token');
        const payerId = query.get('PayerID');

        await apiBack.post(`users/success?PayerID=${payerId}&token=${token}&paymentId=${paymentId}`, {
          total,
        });
      } catch (error) {
        window.location = 'http://localhost:3000/users/checkout/cancel';
      } finally {
        setLoading(false);
      }
    }
    getSuccess();
  }, []);
  return (
    <Container>
      {!loading ? (
        <ContainerText>
          <TextAlign>
            <FaCheck size={120} color="#00b400" />
          </TextAlign>
          <TextHomePrimary>
            Sua compra foi efetuada com sucesso!
          </TextHomePrimary>
          <TextHomeSecondary>
            Em breve estaremos entregando no endereço da compra, qualquer dúvida entre em contato pelos nossos meios de comunicação.
          </TextHomeSecondary>
          <Link to="">
            <TextAlign>
              <Button
                variant="contained"
                color="primary"
              >
                Voltar para home
              </Button>
            </TextAlign>
          </Link>
        </ContainerText>
      ) : <CircularProgress size={150} className="loading" />}

    </Container>
  );
}

export default connect()(CheckoutSuccess);
