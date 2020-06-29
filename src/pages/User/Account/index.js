/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  Container, Paper, Grid, Button,
} from '@material-ui/core';
import { MdNavigateBefore, MdSave } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import qs from 'qs';
import { useSelector } from 'react-redux';
import {
  TitleTable,
  ContainerTable,
  TableContain,
  InputDefault,
} from './styles';
import apiBack from '../../../services/apiBack';

// const schema = Yup.object().shape({
//   name: Yup.string(),
//   email: Yup.string(),
//   cpf: Yup.string(),
//   rg: Yup.string(),
//   first_phone: Yup.string(),
//   second_phone: Yup.string(),
// });

export default function UserAccount() {
  const id = useSelector((state) => state.user.profile.id);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [cpf, setCpf] = useState();
  const [rg, setRg] = useState();
  const [first_phone, setFirst_phone] = useState();
  const [second_phone, setSecond_phone] = useState();

  useEffect(() => {
    async function getAccountData() {
      const response = await (await apiBack.get(`/users/${id}/account`)).data;
      setName(response.name);
      setEmail(response.email);
      setCpf(response.cpf);
      setRg(response.rg);
      setFirst_phone(response.first_phone);
      setSecond_phone(response.second_phone);
    }
    getAccountData();
  }, []);

  function handleName(event) {
    setName(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handleCpf(event) {
    setCpf(event.target.value);
  }

  function handleRg(event) {
    setRg(event.target.value);
  }

  function handleFirst_phone(event) {
    setFirst_phone(event.target.value);
  }

  function handleSecond_phone(event) {
    setSecond_phone(event.target.value);
  }

  async function updateAccountData() {
    setLoading(true);

    await apiBack.put(`/users/${id}/account`, {
      name, email, cpf, rg, first_phone, second_phone,
    }).then(() => {
      setLoading(false);
      toast.success('Seus dados foram atualizados!');
    }).catch(() => {
      setLoading(false);
      toast.error('Ocorreu algum erro ao atualizar seus dados!');
    });
  }

  return (
    <ContainerTable>
      <Container>
        <TableContain className="tableContainer" component={Paper}>
          <TitleTable>
            <Link to="/admin/department/">
              <Button color="default">
                <MdNavigateBefore size={28} />
              </Button>
            </Link>
            Dados pessoais
          </TitleTable>
          <Grid container direction="row" justify="center" alignItems="center">
            <Form>
              <div>
                {/* <h3>Nome: </h3> */}
                <InputDefault
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleName}
                  placeholder="Nome completo"
                />
                {/* <h3>E-mail: </h3> */}
                <InputDefault
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmail}
                  placeholder="E-mail"
                />
              </div>
              <div>
                {/* <h3>CPF: </h3> */}
                <InputDefault
                  name="cpf"
                  type="text"
                  value={cpf}
                  onChange={handleCpf}
                  placeholder="CPF"
                />
                {/* <h3>RG: </h3> */}
                <InputDefault
                  name="rg"
                  type="text"
                  value={rg}
                  onChange={handleRg}
                  placeholder="RG"
                />
              </div>
              <div>
                {/* <h3>Telefone/Celular: </h3> */}
                <InputDefault
                  name="first_phone"
                  type="phone"
                  value={first_phone}
                  onChange={handleFirst_phone}
                  placeholder="Telefone/Celular"
                />
                {/* <h3>Telefone/Celular: </h3> */}
                <InputDefault
                  name="second_phone"
                  type="phone"
                  value={second_phone}
                  onChange={handleSecond_phone}
                  placeholder="Telefone/Celular"
                />
              </div>
              <div>
                <Button
                  type="button"
                  onClick={updateAccountData}
                  variant="contained"
                  color="primary"
                  startIcon={<MdSave />}
                >
                  {loading ? 'Carregando...' : 'Salvar'}
                </Button>
              </div>
            </Form>
          </Grid>
        </TableContain>
      </Container>
    </ContainerTable>
  );
}
