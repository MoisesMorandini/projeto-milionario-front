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

  function handleInsertDepartment(data) {
    dispatch(insertDepartmentRequest(data));
  }

  return (
    <div>
      <TitleTable>
        <Link to="/admin/department/">
          <Button color="default">
            <MdNavigateBefore size={28} />
          </Button>
        </Link>
        Adicionar departamento
      </TitleTable>
      <Grid container direction="row" justify="center" alignItems="center">
        <Form onSubmit={handleInsertDepartment}>
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
    </div>
  );
}
