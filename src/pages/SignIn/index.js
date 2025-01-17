import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { signInRequest } from '~/store/modules/auth/actions';
import './styles.css';
import apiBack from '../../services/apiBack';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido.')
    .required('O campo e-mail é obrigatório'),
  password: Yup.string().required('O campo senha é obrigatório'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [logo, setLogo] = useState({});

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  useEffect(() => {
    async function getLogo() {
      const response = await apiBack.get('/logo/main');
      setLogo(response.data.file);
    }
    getLogo();
  }, []);

  return (
    <>
      <div className="loginContainer">
        <img src={logo.url} alt="Projeto Milionário" />
        <Form schema={schema} onSubmit={handleSubmit}>

          <div className="inputDiv">
            <AiOutlineMail />
            <Input name="email" placeholder="E-mail" />
          </div>

          <div className="inputDiv">
            <AiOutlineLock />
            <Input name="password" type="password" placeholder="Senha" />
          </div>

          <Link to="/forgot-password">Esqueceu sua senha?</Link><br />
          <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>

          <div className="linkSignIn">
            <label>Não tem uma conta?</label>
            <Link to="/register">Registre-se!</Link>
          </div>
        </Form>
      </div>
    </>
  );
}
