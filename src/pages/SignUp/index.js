import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdPersonOutline } from 'react-icons/md';
import {
  AiOutlinePhone, AiOutlineMail, AiOutlineLock, AiOutlineIdcard,
} from 'react-icons/ai';
import { signUpRequest } from '~/store/modules/auth/actions';
import apiBack from '../../services/apiBack';

const schema = Yup.object().shape({
  name: Yup.string().required('O campo nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O campo e-mail é obrigatório'),

  cpf: Yup.string()
    .min(11, 'Digite no mínimo 11 caracteres')
    .max(11, 'Digite no máximo 11 caracteres')
    .required('O campo CPF é obrigatório'),

  rg: Yup.string()
    .required('O campo RG é obrigatório'),

  password: Yup.string()
    .min(6, 'Digite no mínimo 6 caracteres')
    .required('O campo senha é obrigatório'),

  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas não correspondem')
    .required('O campo de confirmação é obrigatório'),

  first_phone: Yup.string()
    .min(8, 'Digite no mínimo 8 caracteres')
    .required('O campo telefone é obrigatório'),

  second_phone: Yup.string(),
});

export default function SignUn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [logo, setLogo] = useState({});

  useEffect(() => {
    async function getLogo() {
      const response = await apiBack.get('/logo/main');
      setLogo(response.data.file);
    }
    getLogo();
  }, []);

  function handleSubmit({
    name, email, password, cpf, rg, first_phone, second_phone,
  }) {
    dispatch(signUpRequest(name, email, password, cpf, rg, first_phone, second_phone));
  }

  return (
    <>
      <div className="createAccountContainer">
        <img src={logo.url} alt="Projeto Milionário" />
        <Form schema={schema} onSubmit={handleSubmit}>
          <div className="inputDiv">
            <MdPersonOutline />
            <Input name="name" placeholder="Nome completo" />
          </div>
          <div className="inputDiv">
            <AiOutlineMail />
            <Input name="email" type="email" placeholder="E-mail" />
          </div>
          <div className="conjunto">
            <div className="inputDiv">
              <AiOutlineIdcard />
              <Input name="cpf" type="text" placeholder="CPF" />
            </div>
            <div className="inputDiv">
              <AiOutlineIdcard />
              <Input name="rg" type="text" placeholder="RG" />
            </div>
          </div>

          <div className="conjunto">
            <div className="inputDiv">
              <AiOutlinePhone />
              <Input name="first_phone" type="phone" placeholder="Telefone/Celular" />
            </div>
            <div className="inputDiv">
              <AiOutlinePhone />
              <Input name="second_phone" type="phone" placeholder="Telefone/Celular (opcional)" />
            </div>
          </div>

          <div className="conjunto">
            <div className="inputDiv">
              <AiOutlineLock />
              <Input name="password" type="password" placeholder="Senha" />
            </div>

            <div className="inputDiv">
              <AiOutlineLock />
              <Input name="passwordConfirmation" type="password" placeholder="Confirme sua senha" />
            </div>
          </div>
          <button type="submit">{loading ? 'Carregando...' : 'Criar conta'}</button>
          {/* <button type="submit">Criar conta</button> */}
          <Link to="/login">Já sou usuário!</Link>
        </Form>
      </div>
    </>
  );
}
