import React, { useState, useEffect } from 'react';
import {
  Container, Paper, Grid, Button, TextField,
} from '@material-ui/core';
import { MdNavigateBefore, MdSave } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  TitleTable,
  ContainerTable,
  TableContain,
  InputDefault,
  InputDep,
  Id,
} from './style';
import { updateCategoryRequest } from '../../../../store/modules/category/actions';
import apiBack from '../../../../services/apiBack';


export default function UpdateCategory() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState({});
  const { id } = useParams();
  const [departments, setDepartment] = useState([]);
  const [idDepartment, setId] = useState(0);

  useEffect(() => {
    async function getCategory() {
      const response = await apiBack.get(`/categories/${id}`);
      setCategory(response.data);
    }

    async function getDepartment() {
      const response = await apiBack.get(
        'department',
      );
      setDepartment(response.data);
    }

    getCategory();
    getDepartment();
  }, []);

  function handleUpdateCategory(data) {
    dispatch(updateCategoryRequest(data));
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
            Editar categoria
          </TitleTable>
          <Grid container direction="row" justify="center" alignItems="center">
            <Form
              initialData={category}
              key={category.id}
              onSubmit={handleUpdateCategory}
            >
              <Id name="id" />
              <InputDep className="inputDep" readOnly name="department_id" value={idDepartment} />
              <br />
              <InputDefault defaultValue={category.name} type="input" name="name" placeholder="Nome da categoria" />
              <br />

              <Autocomplete
                onChange={(event, value) => {
                  if (value != null) setId(value.id); else setId(0);
                }}
                getOptionLabel={(option) => `${option.name}`}
                options={departments}

                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Departamentos" margin="normal" name="department_id" />}
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
