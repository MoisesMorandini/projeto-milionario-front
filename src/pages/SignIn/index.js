import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signInRequest } from '~/store/modules/auth/actions';

import bolaOito from '~/assets/images/eight-ball.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O campo e-mail é obrigatório'),

  password: Yup.string().required('O campo senha é obrigatório'),
});
export default function SignIn() {
  const dispatch = useDispatch();
  console.tron.log(state => state.auth);
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img className="icon" src={bolaOito} alt="VagnaoStore" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />
        <button type="submit">{loading ? 'Carregando ...' : 'Acessar'}</button>

        <Link to="/register">Criar Conta gratuita</Link>
      </Form>
    </>
  );
}
