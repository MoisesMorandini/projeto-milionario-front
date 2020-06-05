import React, { useState, useEffect } from 'react';
import {
  Container, Paper, Grid, Button,
} from '@material-ui/core';
import { MdNavigateBefore, MdSave } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import {
  TitleTable,
  ContainerTable,
  TableContain,
  InputDefault,
  Id,
} from './style';
import apiBack from '../../../../services/apiBack';

export default function UpdateUserAddress() {
  const location = useLocation();
  const { userAddress } = location.state;

  async function handleUpdateAddress(data) {
    try {
      await apiBack.put(`users/address/${data.id}`, data);
      toast.success('Endereço adicionado com sucesso!');
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
            Editar endereço
          </TitleTable>
          <Grid className="grid" container direction="row" justify="center" alignItems="center">
            <Form
              initialData={userAddress}
              key={userAddress.id}
              onSubmit={handleUpdateAddress}
            >
              <Id name="id" />
              <InputDefault name="street" defaultValue={userAddress.street} placeholder="Rua" />
              <InputDefault name="street_number" defaultValue={userAddress.street_number} placeholder="Número" type="number" />
              <InputDefault name="complement" defaultValue={userAddress.complement} placeholder="Complemento" />
              <InputDefault name="zipcode" defaultValue={userAddress.zipcode} placeholder="CEP" />
              <InputDefault name="neighborhood" defaultValue={userAddress.neighborhood} placeholder="Bairro" />
              <InputDefault name="city" defaultValue={userAddress.city} placeholder="Cidade" />
              <InputDefault name="state" defaultValue={userAddress.state} placeholder="Estado" />
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
