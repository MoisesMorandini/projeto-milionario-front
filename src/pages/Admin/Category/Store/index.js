import React, { useState, useEffect } from 'react';
import {
  Container, Paper, Grid, Button, TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MdNavigateBefore, MdSave } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';

import {
  TitleTable,
  ContainerTable,
  TableContain,
  InputDefault,
  InputDep,
} from './style';
import { insertCategoryRequest } from '~/store/modules/category/actions';
import apiBack from '../../../../services/apiBack';

export default function StoreCategory() {
  const [departments, setDepartment] = useState([]);
  const [idDepartment, setId] = useState(0);
  const dispatch = useDispatch();

  async function getDepartment() {
    const response = await apiBack.get(
      'department',
    );
    setDepartment(response.data);
  }

  function handleInsertCategory(data) {
    dispatch(insertCategoryRequest(data));
  }


  return (
    <ContainerTable>
      <Container>
        <TableContain className="tableContainer" component={Paper}>
          <TitleTable>
            <Link to="/admin/categories/">
              <Button color="default">
                <MdNavigateBefore size={28} />
              </Button>
            </Link>
            Adicionar Categoria
          </TitleTable>
          <Grid container direction="row" justify="center" alignItems="center">
            <Form onSubmit={handleInsertCategory}>
              <InputDep className="inputDep" readOnly name="department_id" value={idDepartment} />
              <br />
              <InputDefault type="input" name="name" placeholder="Nome da categoria" />
              <br />
              <Autocomplete
                onFocus={getDepartment}
                onChange={(event, value) => {
                  if (value != null) setId(value.id); else setId(0);
                }}
                getOptionLabel={(option) => `${option.name}`}
                options={departments}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Departamento" margin="normal" name="department_id" />}
              />
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
