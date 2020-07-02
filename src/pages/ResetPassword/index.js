import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { AiOutlineLock } from 'react-icons/ai';
import qs from 'qs';
import { toast } from 'react-toastify';
import apiBack from '../../services/apiBack';

export default function SignIn() {
  const [token, setToken] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [logo, setLogo] = useState({});

  const queryParams = qs.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    setToken(queryParams.token);
    setEmail(queryParams.email);
  }, []);

  function comparePasswords() {
    return password === password2;
  }

  function validatePassword() {
    return password.length >= 6;
  }

  async function resetPassword() {
    if (!validatePassword()) {
      toast.error(
        'A senha deve conter no mínimo 6 caracteres, incluindo um número!',
      );
      return;
    }
    if (comparePasswords()) {
      await apiBack
        .post('/reset_password', { token, email, password })
        .then(() => {
          toast.success('Senha alterada com sucesso!');
        })
        .catch(() => {
          toast.error('Erro ao tentar alterar senha!');
        });
    } else {
      toast.error('As senhas não são iguais!');
    }
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
      <div className="resetPasswordContainer">
        <img src={logo.url} alt="Projeto Milionário" />
        <Form>
          <div className="inputDiv">
            <AiOutlineLock />
            <Input
              name="password"
              type="password"
              placeholder="Nova senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inputDiv">
            <AiOutlineLock />
            <Input
              name="password2"
              type="password"
              placeholder="Confirme a nova senha"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <button
            type="button"
            disabled={password === '' || password !== password2}
            onClick={() => {
              resetPassword();
            }}
          >
            Alterar senha
          </button>
        </Form>
      </div>
    </>
  );
}
