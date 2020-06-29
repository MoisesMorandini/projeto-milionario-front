import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import { MdNavigateBefore, MdSave } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import { TitleTable, InputDefault, Id } from './style';
import { updateDepartmentRequest } from '~/store/modules/department/actions';
import apiBack from '../../../../services/apiBack';

export default function UpdateDepartment() {
  const dispatch = useDispatch();
  const [department, setDepartment] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function getDepartment() {
      const response = await apiBack.get(`/department/${id}`);
      setDepartment(response.data);
    }
    getDepartment();
  }, []);

  function handleUpdateDepartment(data) {
    dispatch(updateDepartmentRequest(data));
  }

  return (
    <div>
      <TitleTable>
        <Link to="/admin/department/">
          <Button color="default">
            <MdNavigateBefore size={28} />
          </Button>
        </Link>
        Editar departamento
      </TitleTable>
      <Grid container direction="row" justify="center" alignItems="center">
        <Form
          initialData={department}
          key={department.id}
          onSubmit={handleUpdateDepartment}
        >
          <Id name="id" />
          <InputDefault
            name="name"
            defaultValue={department.name}
            placeholder="Nome do departamento"
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
    </div>
  );
}
