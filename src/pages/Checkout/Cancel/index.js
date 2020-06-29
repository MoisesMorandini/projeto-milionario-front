import React from 'react';
import { GiCancel } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import {
  Container, TextHomePrimary, TextHomeSecondary, TextAlign,
} from './styles';

function CheckoutCancel() {
  return (
    <Container>
      <TextAlign>
        <GiCancel size={100} color="#d9534f" />
      </TextAlign>
      <TextHomePrimary>
        Sua compra falhou!
      </TextHomePrimary>
      <TextHomeSecondary>
        Revise seus dados ou entre em contato com nossa equipe pelos nossos meios de comunicação.
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
    </Container>
  );
}

export default CheckoutCancel;
