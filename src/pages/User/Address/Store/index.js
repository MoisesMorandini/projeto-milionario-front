import React, { useEffect } from 'react';
import {
  Container, Paper, Grid, Button,
} from '@material-ui/core';
import { MdNavigateBefore, MdSave } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import {
  TitleTable,
  ContainerTable,
  TableContain,
  InputDefault,
} from './style';
import apiBack from '~/services/apiBack';


export default function StoreUserAddress() {
  const { checkout } = useParams();
  async function handleInsertUserAddress(data) {
    try {
      await apiBack.post('users/address', data);
      toast.success('Endereço adicionado com sucesso!');
      checkout ? window.location = '/users/payment/address' : window.location = '/user/address';
    } catch (error) {
      toast.error('Falha ao cadastrar endereço!');
    }
  }

  return (
    <ContainerTable>
      <Container>
        <TableContain className="tableContainer" component={Paper}>
          <TitleTable>
            <Link to="/user/address">
              <Button color="default">
                <MdNavigateBefore size={28} />
              </Button>
            </Link>
            Adicionar endereço
          </TitleTable>
          <Grid className="grid" container direction="row" justify="center" alignItems="center">
            <Form onSubmit={handleInsertUserAddress}>
              <InputDefault name="street" placeholder="Rua" />
              <InputDefault type="number" name="street_number" placeholder="Número" />
              <InputDefault name="complement" placeholder="Complemento" />
              <InputDefault name="zipcode" placeholder="CEP" />
              <InputDefault name="neighborhood" placeholder="Bairro" />
              <InputDefault name="city" placeholder="Cidade" />
              <InputDefault name="state" placeholder="Estado" />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<MdSave />}
              >
                Salvar
              </Button>
            </Form>
          </Grid>
        </TableContain>
      </Container>
    </ContainerTable>
  );
}
