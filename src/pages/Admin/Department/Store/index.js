import React from 'react';
import {
  Container, Paper, Grid, Button,
} from '@material-ui/core';
import { MdNavigateBefore, MdSave } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import {
  TitleTable,
  ContainerTable,
  TableContain,
  InputDefault,
} from './style';
import { insertDepartmentRequest } from '~/store/modules/department/actions';

export default function StoreDepartment() {
  const dispatch = useDispatch();

  function handleDepartmentProduct(data) {
    dispatch(insertDepartmentRequest(data));
  }

  return (
    <ContainerTable>
      <Container>
        <TableContain className="tableContainer" component={Paper}>
          <TitleTable>
            <Link to="/admin/department/">
              <Button color="default">
                <MdNavigateBefore />
              </Button>
            </Link>
            Adicionar departamento
          </TitleTable>
          <Grid container direction="row" justify="center" alignItems="center">
            <Form onSubmit={handleDepartmentProduct}>
              <InputDefault name="name" placeholder="Nome do departamento" />
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